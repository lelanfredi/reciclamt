# 🌱 ReciclaMT

> Plataforma de gamificação para incentivar a reciclagem no estado de Mato Grosso

[![Deploy Status](https://img.shields.io/badge/deploy-netlify-00C7B7?style=flat-square&logo=netlify)](https://reciclamt.netlify.app)
[![Supabase](https://img.shields.io/badge/database-supabase-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![React](https://img.shields.io/badge/frontend-react-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/language-typescript-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)

## 🎯 Sobre o Projeto

O **ReciclaMT** é uma plataforma que conecta cidadãos, empresas e cooperativas de reciclagem através de um sistema de pontos e recompensas. O objetivo é incentivar a reciclagem no estado de Mato Grosso, promovendo sustentabilidade e economia circular.

### ✨ Funcionalidades Principais

- 🔐 **Sistema de autenticação** com Supabase
- 🎮 **Gamificação** com pontos e recompensas
- 🗺️ **Mapa de EcoPoints** para localizar pontos de coleta
- 👤 **Perfis de usuário** com avatares personalizáveis
- 🏢 **Painel administrativo** para gestão
- 📱 **Interface responsiva** mobile-first

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deploy**: Netlify
- **Roteamento**: React Router v6

## 📚 Documentação

Toda a documentação do projeto está na pasta `_docs/`:

- 📖 **[Contexto do Projeto](_docs/context.md)** - Visão geral, objetivos e arquitetura
- 🧠 **[Dev Log](_docs/dev_log.md)** - Histórico de mudanças e correções
- 🐞 **[Issues](_docs/issues.md)** - Bugs e tarefas de manutenção
- 🗓️ **[TODO/Roadmap](_docs/todo.md)** - Backlog e próximas features
- ⚙️ **[Regras de Desenvolvimento](_docs/rules.md)** - Convenções e boas práticas

## 🛠️ Setup Local

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Supabase

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/reciclamt.git
cd reciclamt

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais do Supabase

# Execute o projeto
npm run dev
```

### Variáveis de Ambiente

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## 🧪 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Linting do código
npm run type-check   # Verificação de tipos TypeScript
```

## 👥 Usuários de Teste

Para testar a aplicação, use estas credenciais:

- **Email**: `leticialanfredi@gmail.com`
- **Senha**: `123456`
- **Role**: Admin

- **Email**: `reciclamt.projeto@gmail.com`
- **Senha**: `defaultpassword`
- **Role**: Admin

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Convenções de Commit

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Manutenção

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- **Email**: reciclamt.projeto@gmail.com
- **Desenvolvedora**: Leticia Lanfredi
- **Instituição**: FAPEMAT/FINEP

---

## 🎨 Design System

O projeto utiliza uma paleta de cores focada em sustentabilidade:

- **Verde Principal**: `#22C55E` (sustentabilidade)
- **Azul Secundário**: `#3B82F6` (confiança)
- **Cinza Neutro**: `#6B7280` (texto)
- **Fundo**: `#F9FAFB` (claro)

## 📊 Status do Projeto

- ✅ **MVP Funcional** - Sistema básico implementado
- ✅ **Autenticação** - Login/registro funcionando
- ✅ **Dashboard** - Interface principal
- 🚧 **Gamificação** - Sistema de pontos em desenvolvimento
- 🚧 **EcoPoints** - Mapa de pontos de coleta
- 📋 **Recompensas** - Catálogo de recompensas

## 🌍 Impacto

O ReciclaMT contribui para os Objetivos de Desenvolvimento Sustentável (ODS):

- **ODS 11**: Cidades e comunidades sustentáveis
- **ODS 12**: Consumo e produção responsáveis
- **ODS 13**: Ação contra a mudança global do clima
