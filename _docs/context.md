# 🧩 Contexto do Projeto ReciclaMT

## 📋 Visão Geral
O **ReciclaMT** é uma plataforma de gamificação para incentivar a reciclagem no estado de Mato Grosso. O projeto visa conectar cidadãos, empresas e cooperativas de reciclagem através de um sistema de pontos e recompensas.

## 🎯 Objetivos
- **Incentivar a reciclagem** através de gamificação
- **Conectar stakeholders** (cidadãos, empresas, cooperativas)
- **Mapear pontos de coleta** (EcoPoints) no estado
- **Gerar dados** sobre reciclagem para políticas públicas
- **Promover economia circular** e sustentabilidade

## 👥 Usuários
- **Cidadãos**: Cadastram-se, fazem reciclagem, ganham pontos e trocam por recompensas
- **Empresas**: Cadastram-se como pontos de coleta (EcoPoints) e oferecem recompensas
- **Cooperativas**: Gerenciam pontos de coleta e processam materiais recicláveis
- **Administradores**: Gerenciam a plataforma, usuários e conteúdo

## 🏗️ Arquitetura Técnica

### Frontend
- **React 18** com TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **Shadcn/ui** para componentes

### Backend & Database
- **Supabase** (PostgreSQL + Auth + Storage)
- **Tabelas principais**: users, ecopoints, rewards, recycling_records

### Integrações
- **Botpress** para chatbot
- **Mapas** para localização de EcoPoints
- **Sistema de pontos** e recompensas

## 📊 Funcionalidades Principais

### Para Cidadãos
- ✅ Cadastro e autenticação
- ✅ Seleção de avatar
- ✅ Visualização de pontos
- ✅ Catálogo de recompensas
- ✅ Mapa de EcoPoints
- ✅ Formulário de reciclagem
- ✅ Histórico de atividades

### Para Empresas/Cooperativas
- ✅ Cadastro como EcoPoint
- ✅ Gerenciamento de recompensas
- ✅ Dashboard de métricas

### Para Administradores
- ✅ Painel administrativo
- ✅ Gerenciamento de usuários
- ✅ Moderação de conteúdo

## 🎨 Design System
- **Cores**: Paleta verde (sustentabilidade) com acentos em azul
- **Tipografia**: Inter (moderna e legível)
- **Componentes**: Baseados em Shadcn/ui
- **Responsivo**: Mobile-first approach

## 🔐 Autenticação
- **Supabase Auth** para autenticação
- **Sistema híbrido**: Supabase Auth + banco local para usuários de teste
- **Roles**: user, admin
- **Recuperação de senha** via email

## 📱 Responsividade
- **Mobile-first**: Otimizado para smartphones
- **Tablet**: Layout adaptado
- **Desktop**: Interface completa

## 🌍 Sustentabilidade
- **ODS 11**: Cidades e comunidades sustentáveis
- **ODS 12**: Consumo e produção responsáveis
- **Impacto ambiental**: Redução de resíduos e promoção da reciclagem

## 📈 Métricas de Sucesso
- Número de usuários cadastrados
- Volume de materiais reciclados
- Pontos de coleta ativos
- Recompensas resgatadas
- Engajamento da comunidade

## 🚀 Status do Projeto
- **Fase**: MVP em desenvolvimento
- **Versão**: 1.0.0 (pré-lançamento)
- **Deploy**: Netlify + Supabase
- **Domínio**: reciclamt.com.br (planejado)

## 📞 Contato
- **Email**: reciclamt.projeto@gmail.com
- **Desenvolvedora**: Leticia Lanfredi
- **Instituição**: FAPEMAT/FINEP
