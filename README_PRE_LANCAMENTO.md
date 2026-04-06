# 🚀 Landing Page de Pré-lançamento - ReciclaMT

## 📋 Visão Geral

Esta é uma landing page de pré-lançamento focada em conversão máxima para o ReciclaMT, projetada para capturar leads qualificados de pessoas interessadas em reciclagem em Cuiabá.

## 🎯 Objetivos Estratégicos

- **Capturar leads qualificados** de pessoas interessadas em reciclagem
- **Criar senso de urgência e exclusividade**
- **Validar interesse** antes do lançamento oficial
- **Mapear distribuição geográfica** por bairro

## ✨ Características da Landing Page

### 🎨 Design e UX
- Design moderno e responsivo com tema verde sustentável
- Animações suaves usando Framer Motion
- Gradientes e elementos visuais que remetem à sustentabilidade
- Interface intuitiva e focada em conversão

### 📱 Elementos de Conversão
- **Headline impactante**: "Cuiabá recicla apenas 5%, Vamos mudar isso juntos?"
- **Formulário otimizado** com campos essenciais
- **CTA destacado**: "Quero participar"
- **Prova social** com contador de registros e bairros recentes
- **Senso de urgência** com indicadores de oportunidade limitada

### 🔧 Funcionalidades Técnicas
- Formulário funcional conectado ao Supabase
- Validação de campos obrigatórios
- Feedback visual durante submissão
- Toast notifications para sucesso/erro
- Contador de registros em tempo real (simulado)

## 🗄️ Banco de Dados

### Tabela: `pre_cadastro`

```sql
CREATE TABLE pre_cadastro (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active'
);
```

### 📊 Campos Capturados
- **Nome completo**: Para personalização
- **WhatsApp**: Canal de comunicação principal
- **Bairro**: Mapeamento geográfico em Cuiabá
- **Status**: Controle de leads ativos/inativos
- **Timestamp**: Data/hora do cadastro

## 🚀 Como Usar

### 1. Configuração do Banco
Execute o SQL em `sql_pre_cadastro.sql` no SQL Editor do Supabase:
```bash
# Acesse o SQL Editor no seu projeto Supabase
# Cole e execute o conteúdo do arquivo sql_pre_cadastro.sql
```

### 2. Acesso à Landing Page
A landing page está disponível em:
```
http://localhost:3000/pre-lancamento
```

### 3. Navegação
- **Home**: Link destacado "🚀 Pré-lançamento" no header
- **Rota direta**: `/pre-lancamento`

## 🎨 Personalização

### Cores e Tema
- **Primária**: Verde sustentável (`green-600`, `green-700`)
- **Secundária**: Tons de verde claro (`green-50`, `green-100`)
- **Acentos**: Verde esmeralda e teal para gradientes

### Conteúdo
- **Headline**: Focada no problema local (5% de reciclagem)
- **Copy**: Posicionamento como solução inovadora
- **CTA**: Direto e motivacional
- **Benefícios**: Sustentabilidade, comunidade, recompensas

## 📈 Métricas de Conversão

### KPIs Principais
- **Taxa de conversão** do formulário
- **Número de leads** capturados
- **Distribuição geográfica** por bairro
- **Engajamento** com elementos visuais

### Elementos de Otimização
- Formulário acima da dobra (above the fold)
- CTA destacado e visível
- Prova social em tempo real
- Design responsivo para mobile

## 🔒 Segurança e Privacidade

- **RLS habilitado** no Supabase
- **Políticas de acesso** configuradas
- **Validação de campos** no frontend
- **Tratamento de erros** robusto

## 🚀 Próximos Passos

### Implementações Futuras
- [ ] Dashboard de analytics para leads
- [ ] Integração com WhatsApp Business API
- [ ] Sistema de notificações automáticas
- [ ] Segmentação de leads por interesse
- [ ] A/B testing de diferentes versões

### Melhorias de Conversão
- [ ] Contador regressivo para lançamento
- [ ] Vídeo explicativo do projeto
- [ ] Depoimentos de beta testers
- [ ] Mapa interativo dos bairros
- [ ] Sistema de referência

## 📞 Suporte

Para dúvidas ou sugestões sobre a landing page:
- **Desenvolvedor**: [Seu Nome]
- **Projeto**: ReciclaMT
- **Data**: Janeiro 2025

---

**ReciclaMT** - Transformando a reciclagem em Cuiabá através da tecnologia e inovação! 🌱♻️
