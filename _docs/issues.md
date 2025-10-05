# 🐞 Issues Abertas - ReciclaMT

## 🔴 Críticas (Alta Prioridade)

| ID | Descrição | Status | Prioridade | Observações |
|----|------------|---------|-------------|--------------|
| #001 | Login não navega automaticamente para Dashboard | ✅ Resolvido | Alta | Implementado refresh automático após login |
| #002 | Avatar "Salvando..." persiste indefinidamente | ✅ Resolvido | Alta | Corrigido com useEffect no AvatarSelector |
| #003 | Erro PGRST116 ao atualizar avatar/pontos | ✅ Resolvido | Alta | Implementado fallback por email quando ID falha |

## 🟡 Médias (Prioridade Média)

| ID | Descrição | Status | Prioridade | Observações |
|----|------------|---------|-------------|--------------|
| #004 | Warnings do React Router v7 | Aberto | Média | Atualizar para v7 ou configurar future flags |
| #005 | Fragment warnings do GraphQL | Aberto | Média | Verificar dependências que causam conflitos |
| #006 | Botpress WebChat não carrega | Aberto | Média | Verificar configuração do chatbot |
| #007 | Layout quebra em telas muito pequenas | Aberto | Média | Testar em iPhone SE e dispositivos pequenos |

## 🟢 Baixas (Prioridade Baixa)

| ID | Descrição | Status | Prioridade | Observações |
|----|------------|---------|-------------|--------------|
| #008 | Performance de carregamento inicial | Aberto | Baixa | Implementar lazy loading e code splitting |
| #009 | Acessibilidade (ARIA labels) | Aberto | Baixa | Adicionar labels para screen readers |
| #010 | SEO e meta tags | Aberto | Baixa | Implementar meta tags dinâmicas |

## 🔧 Melhorias Técnicas

| ID | Descrição | Status | Prioridade | Observações |
|----|------------|---------|-------------|--------------|
| #011 | Implementar testes unitários | Aberto | Média | Jest + React Testing Library |
| #012 | Adicionar error boundaries | Aberto | Média | Capturar erros de renderização |
| #013 | Implementar logging estruturado | Aberto | Baixa | Winston ou similar |
| #014 | Otimizar bundle size | Aberto | Baixa | Analisar com webpack-bundle-analyzer |

## 🎨 UX/UI

| ID | Descrição | Status | Prioridade | Observações |
|----|------------|---------|-------------|--------------|
| #015 | Loading states inconsistentes | Aberto | Média | Padronizar spinners e skeletons |
| #016 | Feedback visual para ações | Aberto | Baixa | Toasts e notificações |
| #017 | Modo escuro | Aberto | Baixa | Implementar theme switcher |
| #018 | Animações e transições | Aberto | Baixa | Framer Motion ou CSS transitions |

## 🔐 Segurança

| ID | Descrição | Status | Prioridade | Observações |
|----|------------|---------|-------------|--------------|
| #019 | Rate limiting no login | Aberto | Média | Prevenir ataques de força bruta |
| #020 | Validação de inputs | Aberto | Média | Sanitização e validação client-side |
| #021 | HTTPS enforcement | Aberto | Baixa | Configurar headers de segurança |

## 📱 Mobile

| ID | Descrição | Status | Prioridade | Observações |
|----|------------|---------|-------------|--------------|
| #022 | PWA capabilities | Aberto | Média | Service worker e manifest |
| #023 | Offline support | Aberto | Baixa | Cache de dados essenciais |
| #024 | Push notifications | Aberto | Baixa | Notificações de recompensas |

## 🗄️ Database

| ID | Descrição | Status | Prioridade | Observações |
|----|------------|---------|-------------|--------------|
| #025 | Backup automático | Aberto | Alta | Configurar backup diário no Supabase |
| #026 | Índices de performance | Aberto | Média | Analisar queries lentas |
| #027 | Migrations versioning | Aberto | Baixa | Sistema de versionamento de schema |

## 📊 Analytics

| ID | Descrição | Status | Prioridade | Observações |
|----|------------|---------|-------------|--------------|
| #028 | Google Analytics | Aberto | Média | Tracking de eventos de usuário |
| #029 | Métricas de engajamento | Aberto | Média | Dashboard de analytics |
| #030 | A/B testing | Aberto | Baixa | Testes de conversão |

## 🚀 Deploy

| ID | Descrição | Status | Prioridade | Observações |
|----|------------|---------|-------------|--------------|
| #031 | CI/CD pipeline | Aberto | Média | GitHub Actions para deploy automático |
| #032 | Environment variables | Aberto | Média | Configurar variáveis por ambiente |
| #033 | Monitoring e alertas | Aberto | Baixa | Sentry ou similar para error tracking |

---

## 📋 Template para Novas Issues

```markdown
| ID | Descrição | Status | Prioridade | Observações |
|----|------------|---------|-------------|--------------|
| #XXX | [Descrição clara do problema] | Aberto | [Alta/Média/Baixa] | [Detalhes técnicos, passos para reproduzir, etc.] |
```

## 🏷️ Legenda de Status
- **Aberto**: Issue identificada, aguardando resolução
- **Em Análise**: Issue sendo investigada
- **Em Progresso**: Issue sendo trabalhada
- **Resolvido**: Issue corrigida e testada
- **Fechado**: Issue resolvida e validada
