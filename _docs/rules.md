# ⚙️ Dev Rules - ReciclaMT

## 📁 Estrutura de Pastas

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── ui/             # Componentes base (Shadcn/ui)
│   └── [Component].tsx # Componentes específicos
├── hooks/              # Custom hooks
├── lib/                # Utilitários e configurações
├── types/              # Definições TypeScript
├── scripts/            # Scripts de build e seed
└── stories/            # Storybook stories
```

## 🏷️ Convenções de Nomenclatura

### Arquivos e Pastas
- **Componentes**: `PascalCase.tsx` (ex: `UserProfile.tsx`)
- **Hooks**: `camelCase.ts` (ex: `useAuth.ts`)
- **Utilitários**: `camelCase.ts` (ex: `formatDate.ts`)
- **Tipos**: `camelCase.ts` (ex: `supabase.ts`)
- **Pastas**: `kebab-case` (ex: `user-profile/`)

### Variáveis e Funções
- **Variáveis**: `camelCase` (ex: `userName`, `isLoading`)
- **Constantes**: `UPPER_SNAKE_CASE` (ex: `API_BASE_URL`)
- **Funções**: `camelCase` (ex: `handleLogin`, `validateEmail`)
- **Componentes**: `PascalCase` (ex: `UserProfile`, `LoginForm`)

### CSS Classes
- **Tailwind**: Classes utilitárias (ex: `bg-green-500`, `text-center`)
- **Custom**: `kebab-case` (ex: `user-profile`, `login-form`)

## 📝 Commits

### Padrão Conventional Commits
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Tipos Permitidos
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação, sem mudança de código
- `refactor:` - Refatoração de código
- `test:` - Adição de testes
- `chore:` - Tarefas de manutenção

### Exemplos
```bash
feat(auth): add password recovery functionality
fix(dashboard): resolve navigation issue after login
docs: update API documentation
refactor(components): simplify user profile component
```

## 🎨 Código e Formatação

### TypeScript
- **Strict mode**: Sempre habilitado
- **Interfaces**: Prefixo `I` para interfaces (ex: `IUser`)
- **Types**: Para unions e primitives
- **Enums**: `PascalCase` (ex: `UserRole`)

```typescript
// ✅ Bom
interface IUser {
  id: string;
  name: string;
  email: string;
}

type UserRole = 'admin' | 'user' | 'moderator';

// ❌ Evitar
interface user {
  id: string;
}
```

### React
- **Functional Components**: Sempre usar hooks
- **Props**: Interface separada para props
- **State**: `useState` para estado local, `useContext` para global
- **Effects**: Sempre incluir dependencies array

```typescript
// ✅ Bom
interface IUserProfileProps {
  user: IUser;
  onUpdate: (user: IUser) => void;
}

const UserProfile: React.FC<IUserProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    // effect logic
  }, [user]);
  
  return <div>...</div>;
};

// ❌ Evitar
const UserProfile = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    // effect logic
  }); // sem dependencies
  
  return <div>...</div>;
};
```

### Async/Await
- **Sempre usar**: `async/await` em vez de `.then()`
- **Error handling**: `try/catch` obrigatório
- **Loading states**: Sempre gerenciar estados de loading

```typescript
// ✅ Bom
const handleLogin = async (credentials: ILoginCredentials) => {
  try {
    setLoading(true);
    const result = await authService.login(credentials);
    setUser(result.user);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

// ❌ Evitar
const handleLogin = (credentials) => {
  authService.login(credentials)
    .then(result => setUser(result.user))
    .catch(error => setError(error.message));
};
```

## 🐛 Tratamento de Erros

### Logs
- **Console.log**: Apenas para debug (remover em produção)
- **Console.error**: Para erros importantes
- **Prefixo**: `[ReciclaMT][DEBUG]` ou `[ReciclaMT][ERROR]`

```typescript
// ✅ Bom
console.log("[ReciclaMT][DEBUG] User login attempt:", email);
console.error("[ReciclaMT][ERROR] Login failed:", error);

// ❌ Evitar
console.log("User login attempt:", email);
console.log("Error:", error);
```

### Error Boundaries
- **Implementar**: Para capturar erros de renderização
- **Fallback**: UI de erro amigável
- **Logging**: Enviar erros para serviço de monitoramento

### Validação
- **Client-side**: Validação de inputs obrigatória
- **Server-side**: Validação no Supabase
- **Feedback**: Mensagens de erro claras para o usuário

## 🧪 Testes

### Estrutura
- **Unit tests**: Para funções utilitárias
- **Component tests**: Para componentes React
- **Integration tests**: Para fluxos completos
- **E2E tests**: Para cenários críticos

### Nomenclatura
```typescript
// ✅ Bom
describe('useAuth hook', () => {
  it('should login user with valid credentials', () => {
    // test
  });
  
  it('should show error with invalid credentials', () => {
    // test
  });
});

// ❌ Evitar
describe('auth', () => {
  it('works', () => {
    // test
  });
});
```

## 📚 Documentação

### Componentes
- **JSDoc**: Para funções complexas
- **Props**: Documentar todas as props
- **Examples**: Exemplos de uso quando necessário

```typescript
/**
 * Componente de perfil do usuário
 * @param user - Dados do usuário
 * @param onUpdate - Callback chamado quando usuário é atualizado
 * @param isEditable - Se o perfil pode ser editado
 */
interface IUserProfileProps {
  user: IUser;
  onUpdate: (user: IUser) => void;
  isEditable?: boolean;
}
```

### README
- **Atualizar**: Sempre que adicionar novas funcionalidades
- **Setup**: Instruções de instalação e execução
- **Deploy**: Processo de deploy
- **Contribuição**: Como contribuir com o projeto

## 🔄 Workflow

### Branches
- **main**: Branch principal (produção)
- **develop**: Branch de desenvolvimento
- **feature/**: Novas funcionalidades
- **fix/**: Correções de bugs
- **hotfix/**: Correções urgentes

### Pull Requests
- **Título**: Descritivo e claro
- **Descrição**: O que foi feito e por quê
- **Screenshots**: Para mudanças visuais
- **Testes**: Evidência de que funciona
- **Review**: Pelo menos 1 aprovação

### Deploy
- **Staging**: Deploy automático para `develop`
- **Production**: Deploy manual para `main`
- **Rollback**: Processo definido para rollback
- **Monitoring**: Verificar logs após deploy

## 🛡️ Segurança

### Dados Sensíveis
- **Nunca commitar**: Senhas, chaves de API, tokens
- **Environment variables**: Usar `.env` files
- **Supabase**: Configurar RLS (Row Level Security)

### Validação
- **Input sanitization**: Sempre validar inputs
- **XSS protection**: Escapar HTML
- **CSRF protection**: Tokens CSRF quando necessário

## 📊 Performance

### Bundle Size
- **Code splitting**: Lazy loading de rotas
- **Tree shaking**: Remover código não utilizado
- **Compression**: Gzip/Brotli habilitado

### Runtime
- **Memoization**: `useMemo` e `useCallback` quando necessário
- **Virtual scrolling**: Para listas grandes
- **Image optimization**: WebP, lazy loading

## 🔧 Ferramentas

### Desenvolvimento
- **VS Code**: Editor recomendado
- **Extensions**: ESLint, Prettier, TypeScript
- **Debugging**: React DevTools, Redux DevTools

### Build
- **Vite**: Bundler principal
- **TypeScript**: Compilação de tipos
- **Tailwind**: Compilação de CSS

### Qualidade
- **ESLint**: Linting de código
- **Prettier**: Formatação automática
- **Husky**: Git hooks
- **Lint-staged**: Lint apenas arquivos staged

---

## 📋 Checklist de PR

Antes de abrir um PR, verificar:

- [ ] Código segue as convenções definidas
- [ ] Testes passam
- [ ] Documentação atualizada
- [ ] `dev_log.md` atualizado
- [ ] Commits seguem padrão conventional
- [ ] Não há console.logs desnecessários
- [ ] Error handling implementado
- [ ] Loading states gerenciados
- [ ] Responsividade testada
- [ ] Acessibilidade verificada

## 🚨 Regras Críticas

1. **Nunca commitar** dados sensíveis
2. **Sempre testar** localmente antes do PR
3. **Sempre atualizar** `dev_log.md` após mudanças
4. **Sempre tratar** erros adequadamente
5. **Sempre validar** inputs do usuário
6. **Sempre usar** TypeScript strict mode
7. **Sempre seguir** padrões de nomenclatura
8. **Sempre documentar** funcionalidades complexas
