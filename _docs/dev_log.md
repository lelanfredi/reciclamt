# 🧠 Dev Log - ReciclaMT

## [2025-01-11]
### 🐛 Correção do Avatar
- **Problema**: Avatar não persistia após ser salvo - voltava ao valor anterior
- **Causa identificada**: Possível conflito com refresh automático da página após login
- **Solução implementada**:
  - Removido temporariamente o refresh automático do login
  - Adicionados logs detalhados para debug do avatar
  - Melhorada função `updateUserAvatar` com mais verificações
- **Arquivos modificados**: `src/hooks/useAuth.ts`, `src/components/AvatarSelector.tsx`, `src/components/Dashboard.tsx`
- **Status**: ✅ Resolvido

### 🐛 Problema do Painel de Admin
- **Problema**: Botão de admin no Dashboard não carrega o painel de admin
- **Investigação**:
  - Adicionados logs detalhados no botão de admin
  - Verificada lógica de verificação de admin por email e role
  - Simplificada verificação de admin na rota `/admin`
  - Incluído `leticialanfredi@gmail.com` na lista de emails admin
- **Arquivos modificados**: `src/App.tsx`, `src/components/Dashboard.tsx`, `src/components/AdminPanel.tsx`
- **Status**: 🔍 Em teste

### 📍 Atualização do Endereço do Ecoponto
- **Alteração**: Endereço do ecoponto piloto alterado de Assembleia Legislativa para Câmara Municipal
- **Novo endereço**: Praça Barão de Melgaço, s/n - Centro, Cuiabá - MT, 78020-400
- **Coordenadas atualizadas**: Latitude: -15.6014, Longitude: -56.0979
- **Arquivos modificados**: 
  - `src/scripts/seedDatabase.ts` - Dados do ecoponto
  - `src/components/EcoPointsMap.tsx` - Interface e mapa
  - `src/components/RecyclingForm.tsx` - Placeholder do formulário
- **Status**: ✅ Concluído

### 📱 Implementação de Máscara para Telefone
- **Funcionalidade**: Máscara automática para campos de telefone/WhatsApp
- **Formato**: (65) 99999-9999 para celular, (65) 9999-9999 para fixo
- **Implementação**:
  - Criado `src/lib/masks.ts` com funções de máscara
  - Aplicado em `AuthForms.tsx` (login/registro)
  - Aplicado em `PreLaunchLanding.tsx` (pré-cadastro)
  - Aplicado em `AdminPanel.tsx` (edição de usuários)
  - Validação atualizada para aceitar telefones com máscara
  - Máscara removida automaticamente antes de salvar no banco
- **Arquivos modificados**: 
  - `src/lib/masks.ts` - Novo arquivo com funções de máscara
  - `src/components/AuthForms.tsx` - Máscara no formulário de registro
  - `src/components/PreLaunchLanding.tsx` - Máscara no pré-cadastro
  - `src/components/AdminPanel.tsx` - Máscara na edição de usuários
- **Status**: ✅ Concluído

### 🐛 Correção do Registro - Navegação
- **Problema**: Após registro bem-sucedido, usuário não era redirecionado para o Dashboard
- **Causa**: Mesmo problema do login - App não re-renderizava após `setUser`
- **Solução**: Adicionado refresh automático após registro bem-sucedido
- **Implementação**:
  - Adicionado `setLoading(false)` antes do refresh
  - Adicionado `window.location.reload()` com timeout de 100ms
  - Mantida consistência com a solução do login
- **Arquivos modificados**: `src/hooks/useAuth.ts`
- **Status**: ✅ Concluído

### 🎨 Ajuste Visual - Botões de Ação
- **Alteração**: Invertido destaque visual dos botões "Desativar" e "Excluir"
- **Mudança**: 
  - Botão "Desativar" agora tem destaque vermelho (`variant="destructive"`)
  - Botão "Excluir" agora é discreto (`variant="ghost"`)
- **Localização**: Painel Admin - Seção de Recompensas
- **Arquivos modificados**: `src/components/AdminPanel.tsx`
- **Status**: ✅ Concluído

### 📚 Estrutura de Documentação
- **Criado**: Sistema completo de documentação na pasta `_docs/`
- **Arquivos criados**:
  - `context.md` - Contexto do projeto, objetivos e arquitetura
  - `dev_log.md` - Histórico de mudanças e correções
  - `issues.md` - Bugs e tarefas de manutenção
  - `todo.md` - Backlog e roadmap de features
  - `rules.md` - Convenções e boas práticas de desenvolvimento
- **README atualizado**: Documentação completa com badges e instruções
- **Objetivo**: Melhorar organização e facilitar desenvolvimento futuro
- **Status**: ✅ Implementado

### 🔧 Correções de Autenticação
- **Problema**: Login bem-sucedido mas App não navegava para Dashboard
- **Causa**: Race condition entre `setUser` e `setLoading`, loops infinitos no `onAuthStateChange`
- **Solução**: 
  - Simplificado `useAuth` removendo listeners complexos do Supabase
  - Implementado refresh automático da página após login bem-sucedido
  - Removido `setTimeout` que causava race conditions
- **Arquivos modificados**: `src/hooks/useAuth.ts`, `src/App.tsx`
- **Status**: ✅ Resolvido

### 🗑️ Limpeza de Dependências
- **Removido**: Todas as dependências não utilizadas do Tempolabs
- **Arquivos removidos**: `tempo.config.json`, `src/tempobook/`, referências no `package.json`
- **Motivo**: Erros de conexão e dependências desnecessárias
- **Status**: ✅ Concluído

### 🔐 Sistema de Recuperação de Senha
- **Implementado**: Rota `/reset-password` para recuperação de senha
- **Componentes criados**: `ResetPassword.tsx`
- **Funcionalidade**: `handleResetPassword` no `AuthForms.tsx`
- **Integração**: Supabase Auth `resetPasswordForEmail`
- **Status**: ✅ Implementado

### 🎨 Correções de UI
- **Avatar Selector**: Corrigido estado "Salvando..." que persistia
- **Dashboard**: Melhorado CSS do botão de logout
- **Admin Panel**: Ajustes de layout e responsividade
- **Status**: ✅ Concluído

### 🐛 Correções de Bugs
- **Avatar Update**: Corrigido erro `PGRST116` - implementado fallback por email quando ID falha
- **User Points**: Mesmo fallback implementado para atualização de pontos
- **Import/Export**: Corrigido import do `ResetPassword` (named vs default export)
- **Status**: ✅ Resolvido

## [2025-01-10]
### 👤 Usuários de Teste
- **Criado**: Script SQL para inserir usuários de teste
- **Arquivos**: `usuarios_teste.sql`, `verificar_usuario_leticia.sql`
- **Usuários disponíveis**:
  - `leticialanfredi@gmail.com` / `123456`
  - `reciclamt.projeto@gmail.com` / `defaultpassword`
- **Status**: ✅ Configurado

### 🗄️ Seed Database
- **Atualizado**: `src/scripts/seedDatabase.ts` com dados de usuários
- **Funcionalidade**: Popula banco com dados iniciais
- **Status**: ✅ Implementado

## [2025-01-09]
### 🏗️ Estrutura Inicial
- **Configurado**: Projeto React + TypeScript + Vite
- **Integrado**: Supabase para backend e autenticação
- **Implementado**: Sistema de roteamento com React Router
- **Configurado**: Tailwind CSS + Shadcn/ui
- **Status**: ✅ Base do projeto

### 📱 Componentes Principais
- **Home**: Landing page com formulários de login/registro
- **Dashboard**: Interface principal do usuário logado
- **AdminPanel**: Painel administrativo
- **EcoPointsMap**: Mapa de pontos de coleta
- **RewardsCatalog**: Catálogo de recompensas
- **Status**: ✅ Estrutura básica

## 🔍 Problemas Conhecidos
- **Login Navigation**: Resolvido com refresh automático
- **Avatar Loading State**: Resolvido com useEffect
- **Tempolabs Dependencies**: Removidas completamente

## 📝 Próximos Passos
- [ ] Implementar sistema de notificações
- [ ] Adicionar métricas de engajamento
- [ ] Melhorar responsividade mobile
- [ ] Implementar testes automatizados
- [ ] Otimizar performance de carregamento

## 🚨 Lições Aprendidas
1. **Race Conditions**: Evitar `setTimeout` em operações de estado
2. **Auth State**: Simplificar listeners de autenticação
3. **Dependencies**: Manter apenas dependências necessárias
4. **Error Handling**: Implementar fallbacks para operações de banco
5. **User Experience**: Refresh automático pode ser uma solução válida para problemas complexos de navegação
