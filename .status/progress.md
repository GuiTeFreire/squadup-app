# SquadUp — Progresso do Front-end

## Sessão 1 — 2026-05-19

### Fase 1 — Estrutura inicial do projeto (tarefas 1.1 a 1.7 concluídas)

| # | Tarefa | Observação |
|---|--------|------------|
| 1.1 | Inicializar projeto com Expo + TypeScript | `expo@54`, `react-native@0.81.5`, `react@19.1.0` |
| 1.2 | Instalar e configurar NativeWind v4 | `tailwind.config.js`, `babel.config.js`, `metro.config.js`, `global.css` criados |
| 1.3 | Instalar React Navigation v6 (Stack + Bottom Tabs) | `@react-navigation/native`, `native-stack`, `bottom-tabs` + dependências nativas |
| 1.4 | Definir estrutura de pastas | `src/{screens,components,hooks,mocks,types,utils,contexts,navigation}` |
| 1.5 | Definir tokens de design | Paleta primary (verde), secondary (navy), accent (laranja), 4pt grid, escala tipográfica |
| 1.6 | Configurar Jest + React Native Testing Library | `jest-expo@54`, `@testing-library/react-native`, `npm run test` funcionando |
| 1.7 | Configurar ESLint + Prettier | ESLint 9 flat config, regras TS + React Native + Prettier, `npm run lint` zero erros |

### Estado do repositório ao final da sessão

- Branch `feat/project-setup` mergeada em `dev` (merge commit no-ff)
- Próxima branch a criar: `feat/design-system` (componentes base da Fase 1)
- Último arquivo editado: `package.json` (scripts lint/test) e `eslint.config.js`

### Dívidas técnicas identificadas

| Item | Descrição |
|------|-----------|
| Jest versão | `jest@30` instalado mas `jest-expo@54` foi projetado para `jest@29`. Testar se há incompatibilidade ao rodar suítes reais. |
| react-test-renderer | Fixado em `19.1.0` para coincidir com `react@19.1.0`; atualizar junto quando react for atualizado. |
| react-native-screens | Pinado em `~4.16.0` (SDK 54 compatível, requer RN ≥ 0.81). Verificar ao fazer upgrade de Expo. |

---

## Sessão 2 — 2026-05-20

### Fase 1 — Design system e mocks (tarefas 1.8 a 1.19 concluídas)

| # | Tarefa | Observação |
|---|--------|------------|
| 1.8 | Criar componente `Button` | Variantes primary/secondary/ghost, tamanhos sm/md/lg, estados loading/disabled, fullWidth |
| 1.9 | Criar componente `Input` | Label, erro, borda colorida por estado (focus/erro/default) |
| 1.10 | Criar componente `Card` | Container pressable ou estático; prop `padded` |
| 1.11 | Criar componente `Avatar` | Tamanhos xs–xl; fallback de iniciais quando sem foto ou erro de load |
| 1.12 | Criar componente `Badge` | Variantes: sport (com emoji), level, status, custom |
| 1.13 | Criar componente `Header` | Título centralizado; botão voltar; slot rightElement |
| 1.14 | Criar componente `EmptyState` | Ícone emoji + título + descrição + slot action |
| 1.15 | Criar componente `RatingStars` | Estrelas cheias/meia/vazia; valor numérico; tamanhos sm/md/lg |
| 1.16 | Criar dados mockados — Usuários | 6 usuários com todos os campos: foto, bio, nível, nota, esportes |
| 1.17 | Criar dados mockados — Partidas | 11 partidas cobrindo todos os sports, níveis e status |
| 1.18 | Criar dados mockados — Avaliações | 7 avaliações com critérios e comentários |
| 1.19 | Criar tipos TypeScript | `User`, `Match`, `Rating`, `Report`, `Sport`, `MatchStatus`, `Participant`, `RatingCriteria` |

### Correções de infraestrutura

- **D1 — Jest versão:** Downgrade `jest@30 → @29`; `babel-preset-expo` instalado como devDep direto.
- **jest.setup.js:** Removido import de `extend-expect` (não existe em RNTL v13; matchers são automáticos).

### Resultado dos testes

- **42 testes, 8 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅

### Estado ao final da sessão 2

- Branch `feat/design-system` em andamento (não mergeada ainda)
- Fase 1 **100% concluída** (19/19 tarefas)
- Próxima branch: `feat/auth-flow` (Fase 2 — WelcomeScreen, LoginScreen, RegisterScreen, ProfileSetupScreen, AuthContext, AuthNavigator)
