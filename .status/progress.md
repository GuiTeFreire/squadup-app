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

- Branch `feat/design-system` mergeada em `dev` (merge commit)
- Fase 1 **100% concluída** (19/19 tarefas)

---

## Sessão 3 — 2026-05-20

### Fase 2 — Fluxo de entrada do usuário (tarefas 2.1 a 2.8 concluídas)

| # | Tarefa | Observação |
|---|--------|------------|
| 2.1 | Criar `AuthNavigator` | Stack nativa: Welcome (sem header) → Login / Register (header transparente) → ProfileSetup |
| 2.2 | Criar `WelcomeScreen` | Tela dividida: topo verde (logo + slogan), fundo branco (botões Entrar / Criar conta) |
| 2.3 | Criar `LoginScreen` | Email + senha com validação inline; login mockado com delay de 600ms |
| 2.4 | Criar `RegisterScreen` | Nome, email, senha, data de nascimento; navega para ProfileSetup após sucesso |
| 2.5 | Criar `ProfileSetupScreen` | Seleção multi-esporte (toggle chips), nível (radio), localização; foto visual com Alert |
| 2.6 | Criar `AuthContext` | `login`, `register`, `completeProfile`, `logout`; `AuthProvider` + `useAuth` hook |
| 2.7 | Navegação condicional | `RootNavigator` com `NavigationContainer`: autenticado → `AppNavigator`; não autenticado → `AuthNavigator` |
| 2.8 | Testes `LoginScreen` | 9 testes: renderização, validação (e-mail inválido, senha curta, campos vazios), chamada de `login`, navegação para Register |

### Arquivos criados

- `src/navigation/types.ts` — `AuthStackParamList`, `AppTabParamList`
- `src/contexts/AuthContext.tsx` — `AuthProvider` + `useAuth`
- `src/navigation/AuthNavigator.tsx`
- `src/navigation/AppNavigator.tsx` — placeholder com HomeScreen
- `src/navigation/RootNavigator.tsx`
- `src/screens/WelcomeScreen.tsx`
- `src/screens/LoginScreen.tsx`
- `src/screens/RegisterScreen.tsx`
- `src/screens/ProfileSetupScreen.tsx`
- `src/screens/HomeScreen.tsx` — placeholder para Fase 4
- `src/screens/__tests__/LoginScreen.test.tsx`
- `App.tsx` atualizado — `SafeAreaProvider` + `AuthProvider` + `RootNavigator`

### Resultado dos testes

- **52 testes, 9 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅

### Estado ao final da sessão 3

- Branch `feat/auth-flow` pronta para merge em `dev`
- Fase 2 **100% concluída** (8/8 tarefas)
- Próxima branch: `feat/main-navigator` (Fase 4 — AppNavigator completo, HomeScreen, SearchScreen, FiltersScreen, MatchCard, useMatchFilters)

---

## Sessão 4 — 2026-05-25

### Refinamento visual — Design System (tarefa transversal, fora das fases numeradas)

Esta sessão foi dedicada a um overhaul completo da identidade visual do app, substituindo a paleta verde genérica por um sistema Electric Blue + Dark Slate moderno e profissional.

#### Paleta de cores (novo sistema)

| Token | Valor principal | Uso |
|-------|----------------|-----|
| `primary` | `#2563EB` (Electric Blue) | CTAs, links, elementos ativos, foco |
| `secondary` | `#0F172A–#F8FAFC` (Dark Slate) | Header, tab bar, fundos estruturais |
| `accent` | `#F97316` (Orange) | Badges de energia, destaques (azul+laranja = clássico esportivo) |

Regra 60-30-10: 60% branco/slate claro · 30% dark slate · 10% electric blue.

#### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `tailwind.config.js` | primary → Electric Blue · secondary → Dark Slate · semantic colors atualizados |
| `src/components/Button.tsx` | Novo variant `outline` (borda branca/texto branco para fundos escuros) · `rounded-xl` |
| `src/components/Header.tsx` | Fundo `secondary-900` + texto branco (maior impacto visual) |
| `src/components/RatingStars.tsx` | Estrelas cheias `text-amber-400` · meia `amber-300` · vazias `neutral-300` |
| `src/components/Badge.tsx` | Nível Avançado → `bg-primary-900 text-white` (hierarquia: suave → laranja → azul profundo) |
| `src/navigation/AuthNavigator.tsx` | `headerTintColor` `#16a34a` → `#2563EB` |
| `src/navigation/AppNavigator.tsx` | Tab bar dark (`#0F172A`) · active `#2563EB` · ícone vetorial `home-variant` |
| `src/screens/WelcomeScreen.tsx` | Redesign completo: fundo dark slate · logo vetorial · chips com `MaterialCommunityIcons` · stats row |
| `src/screens/LoginScreen.tsx` | Marca `lightning-bolt` vetorial no topo · `paddingTop: 100` para header transparente |
| `src/screens/RegisterScreen.tsx` | Mesma marca vetorial do Login |
| `src/screens/ProfileSetupScreen.tsx` | Títulos de seção em `secondary-800/900` |

#### Infraestrutura adicionada

| Item | Detalhe |
|------|---------|
| `@expo/vector-icons@^15.1.1` | Instalado — `MaterialCommunityIcons` para soccer, basketball, volleyball, tennis, lightning-bolt, home-variant |
| `__mocks__/expo-vector-icons.js` | Mock Jest criado (expo-font → expo-asset não instalado em dev) |
| `package.json` `moduleNameMapper` | Aponta `@expo/vector-icons` para o mock no ambiente de teste |

#### Bug fix

- `src/components/__tests__/Avatar.test.tsx` — Iniciais esperadas `"CM"` / `"C"` não batiam com os nomes `"Guilherme Mendes"` / `"Guilherme"`. Corrigido para `"GM"` / `"G"`.

#### Resultado dos testes

- **52 testes, 9 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅

### Estado ao final da sessão 4

- Branch `dev` com todas as mudanças visuais (sem branch separada — overhaul visual não é feature)
- Design system 100% refatorado; todos os componentes e telas de auth usam a nova paleta
- Próxima branch a criar: `feat/home-matches` (Fase 4 completa)
