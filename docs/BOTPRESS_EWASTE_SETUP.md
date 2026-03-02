# Configuração do Fluxo de E-waste no Botpress

## Visão Geral

Este documento explica como configurar o fluxo de campanha de lixo eletrônico no ReciBot (Botpress).

O fluxo permite que usuários enviem fotos de eletrônicos via WhatsApp, que são registradas no Supabase para validação pelo admin no site.

---

## Pré-requisitos

1. **Supabase**: Rodar o SQL de migração (`supabase/migrations/001_ewaste_submissions.sql`)
2. **Edge Function**: Deploy da função `ewaste-submit` no Supabase
3. **Variáveis**: Ter em mãos a `SUPABASE_URL` e `SUPABASE_ANON_KEY`

---

## Passo 1: Criar Variáveis no Botpress

No Botpress Studio, vá em **Variables** (ícone de engrenagem) e crie:

| Nome | Tipo | Escopo |
|------|------|--------|
| `photoUrl` | string | Workflow |
| `materialDescription` | string | Workflow |
| `userConfirmed` | boolean | Workflow |

---

## Passo 2: Criar o Nó "CampanhaEletronica"

### 2.1 Nó de Entrada (Autonomous)

Crie um novo nó **Autonomous** chamado `CampanhaEletronica` com as seguintes **Instructions**:

```
## Identidade
Você é o Agente Recicla, assistente do programa ReciclaMT.

## Objetivo
Quando o usuário mencionar lixo eletrônico, campanha de eletrônicos, descartar eletrônico, reciclar eletrônico, ou enviar uma foto de um eletrônico, inicie o fluxo de registro.

## Fluxo
1. Pergunte ao usuário se ele quer registrar a entrega de um eletrônico para a campanha.
2. Se sim, peça para enviar uma foto do eletrônico.
3. Após receber a foto, pergunte: "O que é esse eletrônico? (ex: TV, celular, notebook, impressora)"
4. Confirme os dados: "Vou registrar: [descrição]. Está correto?"
5. Se confirmado, salve as variáveis e prossiga para o registro.

## Tom
Amigável, motivador, use emojis de reciclagem (♻️📱💻).
```

### 2.2 Nó de Captura de Foto

Adicione um card **Capture Information** ou use o nó **Imagem** existente:

- Quando o usuário enviar uma imagem, capture a URL em `workflow.photoUrl`
- No Botpress, a URL da imagem fica disponível em `event.payload.imageUrl` ou através do `processImage`

### 2.3 Nó de Captura de Descrição

Use um **Capture Information** do tipo texto:
- Prompt: "O que é esse eletrônico? (ex: TV, celular, notebook)"
- Salvar em: `workflow.materialDescription`

### 2.4 Nó de Confirmação

Use um card de **Text** com botões:
- "Vou registrar: {{workflow.materialDescription}}. Confirma? ✅"
- Botões: "Sim, registrar!" / "Não, cancelar"

---

## Passo 3: Execute Code (Enviar para Supabase)

Após a confirmação, adicione um card **Execute Code** com este código:

```javascript
// === CONFIGURAÇÃO ===
// Substitua pelas suas credenciais do Supabase
const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';
const SUPABASE_ANON_KEY = 'SUA_ANON_KEY_AQUI';

// === DADOS ===
const phone = event.tags?.['whatsapp:userPhone']
  || event.tags?.['whatsapp:userId']
  || 'desconhecido';

const photoUrl = workflow.photoUrl || '';
const description = workflow.materialDescription || 'Eletrônico não especificado';

// === ENVIO ===
try {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/ewaste-submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({
      phone: phone,
      photo_url: photoUrl,
      description: description,
      bot_conversation_id: event.conversationId || ''
    })
  });

  const result = await response.json();

  if (result.success) {
    workflow.registroSucesso = true;
    workflow.mensagemRetorno = result.user_found
      ? `✅ Registro feito com sucesso, ${result.user_name}! Leve o eletrônico ao ecoponto. A validação será feita em até 3 dias úteis.`
      : '✅ Registro feito! Leve o eletrônico ao ecoponto. Como não encontramos seu cadastro no sistema, lembre-se de se cadastrar no site reciclamt.com.br para receber seus pontos!';
  } else {
    workflow.registroSucesso = false;
    workflow.mensagemRetorno = '❌ Houve um problema ao registrar. Tente novamente mais tarde ou entre em contato pelo site.';
  }
} catch (error) {
  workflow.registroSucesso = false;
  workflow.mensagemRetorno = '❌ Erro de conexão. Tente novamente em alguns minutos.';
}
```

### 3.1 Variáveis adicionais necessárias

Crie também:
| Nome | Tipo | Escopo |
|------|------|--------|
| `registroSucesso` | boolean | Workflow |
| `mensagemRetorno` | string | Workflow |

---

## Passo 4: Nó de Resposta Final

Adicione um card **Text** após o Execute Code:

```
{{workflow.mensagemRetorno}}

♻️ Obrigado por reciclar com o ReciclaMT!
```

---

## Passo 5: Conectar ao Fluxo Principal

No **AutonomousNode** principal, adicione uma transição para o nó `CampanhaEletronica` quando o usuário mencionar palavras-chave como:
- "eletrônico", "eletrônicos", "campanha", "descartar", "lixo eletrônico"
- "TV", "celular", "notebook", "computador", "impressora"

Ou configure o AutonomousNode para reconhecer a intenção e redirecionar automaticamente.

---

## Passo 6: Testar

1. Envie uma mensagem no WhatsApp: "Quero participar da campanha de eletrônicos"
2. O bot deve pedir uma foto
3. Envie uma foto qualquer
4. O bot deve perguntar o tipo de eletrônico
5. Confirme o registro
6. Verifique no AdminPanel se a submission apareceu na aba "Validações"

---

## Alternativa Simplificada (sem Edge Function)

Se o deploy da Edge Function for complexo, uma alternativa é usar o Supabase REST API diretamente:

```javascript
// No Execute Code do Botpress, em vez de chamar a Edge Function:
const response = await fetch(`${SUPABASE_URL}/rest/v1/ewaste_submissions`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Prefer': 'return=representation'
  },
  body: JSON.stringify({
    user_phone: phone,
    photo_url: photoUrl,
    material_description: description,
    status: 'pending',
    campaign: 'eletronicos-marco-2026',
    bot_conversation_id: event.conversationId || ''
  })
});
```

Nota: nesta alternativa, o `user_id` não será preenchido automaticamente (a Edge Function faz esse match). O admin pode vincular manualmente depois.

---

## Diagrama do Fluxo

```
[Usuário no WhatsApp]
       |
       v
[AutonomousNode] ---(detecta intenção e-waste)---> [CampanhaEletronica]
       |                                                    |
       v                                                    v
[Respostas normais]                              [Pede foto do eletrônico]
                                                           |
                                                           v
                                                  [Captura descrição]
                                                           |
                                                           v
                                                    [Confirmação]
                                                      /         \
                                                   Sim           Não
                                                    |             |
                                                    v             v
                                             [Execute Code]  [Mensagem de
                                             [POST → Supabase]  cancelamento]
                                                    |
                                                    v
                                           [Resposta de sucesso]
```
