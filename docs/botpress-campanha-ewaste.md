# Fluxo Botpress - Campanha Lixo Eletrônico

## Visão geral

O fluxo de campanha de lixo eletrônico no Botpress recebe fotos de eletrônicos via WhatsApp, armazena no Supabase Storage, e cria uma submission para validação no painel admin.

## Fluxo do usuário (WhatsApp)

```
Usuário manda mensagem → Bot identifica intenção de campanha
→ Bot pergunta: "Qual material eletrônico você quer descartar?"
→ Usuário descreve (ex: "celular antigo Samsung")
→ Bot pede foto: "Mande uma foto do material"
→ Usuário envia foto
→ Bot confirma: "Recebemos! Sua foto está sendo analisada. Você será notificado quando for aprovada."
→ Foto é salva no Supabase Storage
→ Submission é criada na tabela campaign_submissions com status "pending"
```

## Nós do Botpress (a configurar no Botpress Studio)

### 1. Nó de Entrada: `campanha_trigger`
- **Tipo**: Intent
- **Intents**: "quero descartar eletrônico", "lixo eletrônico", "campanha eletrônico"
- **Mensagens de trigger**: "descarte eletrônico", "reciclar eletrônico", "campanha"

### 2. Nó: `pedir_descricao`
- **Tipo**: Text → Capture
- **Mensagem**: "Que tipo de material eletrônico você quer descartar? (Ex: celular, carregador, pilhas, notebook...)"
- **Capture**: `session.material_description` (tipo texto)

### 3. Nó: `pedir_foto`
- **Tipo**: Text → Capture
- **Mensagem**: "Agora mande uma foto do material. A foto será analisada pela nossa equipe."
- **Capture**: `session.photo` (tipo imagem/file)

### 4. Nó: `salvar_submission` (Execute Code)
- **Tipo**: Execute Code
- **Código**:
```javascript
// Este código roda dentro do Botpress Studio (Execute Code node)
// Necessita da integração Supabase configurada

const supabaseUrl = env.SUPABASE_URL
const supabaseKey = env.SUPABASE_SERVICE_KEY  // Service key para bypass de RLS

// 1. Upload da foto para Supabase Storage
const photoUrl = session.photo?.url || session.photo
const fileName = `ewaste/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`

// Fazer upload via API do Supabase Storage
const uploadResponse = await axios.post(
  `${supabaseUrl}/storage/v1/object/campaign-photos/${fileName}`,
  await axios.get(photoUrl, { responseType: 'arraybuffer' }).then(r => r.data),
  {
    headers: {
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'image/jpeg'
    }
  }
)

const publicPhotoUrl = `${supabaseUrl}/storage/v1/object/public/campaign-photos/${fileName}`

// 2. Buscar campanha ativa de lixo eletrônico
const campaignResponse = await axios.get(
  `${supabaseUrl}/rest/v1/campaigns?slug=eq.lixo-eletronico&status=eq.active&select=id`,
  { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
)

const campaignId = campaignResponse.data[0]?.id

// 3. Buscar user_id pelo telefone do WhatsApp
const userPhone = event.tags?.['whatsapp:userPhone'] || ''
const userResponse = await axios.get(
  `${supabaseUrl}/rest/v1/users?phone=eq.${userPhone}&select=id`,
  { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
)

const userId = userResponse.data[0]?.id

// 4. Criar submission
if (campaignId && userId) {
  await axios.post(
    `${supabaseUrl}/rest/v1/campaign_submissions`,
    {
      campaign_id: campaignId,
      user_id: userId,
      photo_url: publicPhotoUrl,
      description: session.material_description,
      status: 'pending'
    },
    { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}`, 'Content-Type': 'application/json' } }
  )
  session.submissionSuccess = true
} else {
  session.submissionSuccess = false
  session.errorMessage = !campaignId ? 'Campanha não encontrada' : 'Usuário não cadastrado'
}
```

### 5. Nó: `confirmacao`
- **Tipo**: Condition
- **Se `session.submissionSuccess === true`**:
  - Mensagem: "✅ Foto recebida com sucesso! Nossa equipe vai analisar e, se aprovada, os pontos serão creditados automaticamente na sua conta. Você receberá uma notificação!"
- **Se `session.submissionSuccess === false`**:
  - Mensagem: "😕 Não conseguimos processar sua solicitação. Verifique se você está cadastrado na plataforma em www.reciclamt.com.br e tente novamente."

## Configurações necessárias no Botpress

### Variáveis de ambiente
- `SUPABASE_URL`: URL do projeto Supabase
- `SUPABASE_SERVICE_KEY`: Service role key (não a anon key)

### Integrações necessárias
1. **WhatsApp** (via Botpress Cloud) - já configurado
2. **Axios** - já disponível no Execute Code
3. **Supabase Storage** - criar bucket `campaign-photos` com política pública de leitura

### Bucket do Supabase Storage

```sql
-- Criar bucket para fotos de campanhas
INSERT INTO storage.buckets (id, name, public)
VALUES ('campaign-photos', 'campaign-photos', true);

-- Política: qualquer um pode ler (fotos públicas)
CREATE POLICY "Fotos públicas" ON storage.objects
  FOR SELECT USING (bucket_id = 'campaign-photos');

-- Política: service key pode inserir
CREATE POLICY "Service key insere fotos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'campaign-photos');
```

## Notificação de resultado (futuro)

Quando o admin aprova ou rejeita no painel, podemos notificar o usuário via:
1. **Supabase Edge Function** que escuta mudanças na tabela `campaign_submissions`
2. **Webhook para Botpress** que envia mensagem proativa no WhatsApp

Isso pode ser implementado na próxima fase com um trigger:

```sql
-- Trigger para notificar quando status muda
CREATE OR REPLACE FUNCTION notify_submission_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status != OLD.status AND NEW.status IN ('approved', 'rejected') THEN
    -- Chamar Edge Function ou webhook
    PERFORM net.http_post(
      'https://your-botpress-webhook-url',
      json_build_object(
        'user_id', NEW.user_id,
        'status', NEW.status,
        'points', NEW.points_awarded,
        'reason', NEW.rejection_reason
      )::text,
      'application/json'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_submission_status_change
  AFTER UPDATE ON campaign_submissions
  FOR EACH ROW EXECUTE FUNCTION notify_submission_status();
```
