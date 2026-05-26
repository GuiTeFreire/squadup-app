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

- `src/components/__tests__/Avatar.test.tsx` — Iniciais esperadas `"CM"` / `"C"` não batiam com os nomes `"Guilherme Freire"` / `"Guilherme"`. Corrigido para `"GF"` / `"G"`.

#### Resultado dos testes

- **52 testes, 9 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅

### Estado ao final da sessão 4

- Branch `dev` com todas as mudanças visuais (sem branch separada — overhaul visual não é feature)
- Design system 100% refatorado; todos os componentes e telas de auth usam a nova paleta
- Próxima branch a criar: `feat/home-matches` (Fase 4 completa)

---

## Sessão 5 — 2026-05-25

### Fase 4 — Listagem e busca de partidas (tarefas 4.1 a 4.8 concluídas)

| # | Tarefa | Observação |
|---|--------|------------|
| 4.1 | Expandir `AppNavigator` com 4 Bottom Tabs | `RootStack` wrapping `AppTabs` (Home/Busca/Criar/Perfil) + `FiltersScreen` como modal nativo |
| 4.2 | Criar `HomeScreen` com lista de partidas | `FlatList` + campo de busca inline + botão filtros com badge de contagem ativa |
| 4.3 | Criar componente `MatchCard` | Badges sport/level/status, local + data com ícones vetoriais, barra de vagas, organizador |
| 4.4 | Criar `SearchScreen` | Campo de busca dedicado com autoFocus, contador de resultados, EmptyState contextual |
| 4.5 | Criar `FiltersScreen` (modal) | `presentation: 'modal'` · chips de esporte e nível + toggle de vagas · estado local antes de aplicar |
| 4.6 | Criar hook `useMatchFilters` | `applyFilters` (função pura testável) + `useMatchFilters` (hook que lê `MatchFiltersContext`) |
| 4.7 | Indicador visual de vagas | Barra colorida: verde (disponível) · laranja (≥80% ocupado) · vermelho (lotado) + texto pluralizado |
| 4.8 | Testes `MatchCard` e `useMatchFilters` | 12 testes de renderização + 11 testes de lógica de filtro (puro, sem mock de contexto) |

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `src/utils/date.ts` | `formatMatchDate("YYYY-MM-DD")` → `"Dom, 25 mai"` |
| `src/contexts/MatchFiltersContext.tsx` | Estado compartilhado de filtros (sport, level, onlyAvailable) · `MatchFiltersProvider` |
| `src/hooks/useMatchFilters.ts` | `applyFilters` puro + hook `useMatchFilters` |
| `src/components/MatchCard.tsx` | Card de partida completo (memo) |
| `src/screens/HomeScreen.tsx` | Substituiu placeholder — FlatList real |
| `src/screens/SearchScreen.tsx` | Tela de busca dedicada |
| `src/screens/FiltersScreen.tsx` | Modal de filtros |
| `src/screens/CreateMatchScreen.tsx` | Placeholder — Fase 6 |
| `src/screens/MyProfileScreen.tsx` | Placeholder — Fase 3 |
| `src/components/__tests__/MatchCard.test.tsx` | 12 testes |
| `src/hooks/__tests__/useMatchFilters.test.ts` | 11 testes |

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `src/navigation/AppNavigator.tsx` | `RootStack` com 4 tabs + modal Filters · ícones extraídos para módulo (S6478) |
| `src/navigation/types.ts` | `AppRootStackParamList` + 4 rotas em `AppTabParamList` |
| `App.tsx` | `MatchFiltersProvider` adicionado dentro de `AuthProvider` |

### Resultado dos testes

- **75 testes, 11 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅

### Estado ao final da sessão 5

- Branch `feat/home-matches` pronta para merge em `dev`
- Fase 4 **100% concluída** (8/8 tarefas)
- Próxima branch sugerida: `feat/match-detail` (Fase 5) — `MatchCard.onPress` já está preparado para navegar para `MatchDetailScreen`
- Ponto exato de retomada: `src/screens/HomeScreen.tsx` linha 73 — `renderItem` do `FlatList` recebe `onPress={() => navigation.navigate('MatchDetail', { matchId: item.id })}` quando `MatchDetailScreen` for criada em Fase 5

---

## Sessão 6 — 2026-05-26

### Fase 5 — Detalhes da partida (tarefas 5.1 a 5.6 concluídas)

| # | Tarefa | Observação |
|---|--------|------------|
| 5.1 | Criar tela `MatchDetailScreen` | Header dark + ScrollView + info block (local/data/hora) + badges + descrição + organizador |
| 5.2 | Seção de participantes confirmados | Contador "X de Y" + `ParticipantList` abaixo |
| 5.3 | Criar componente `ParticipantList` | Confirmados com avatar, nome, selo verificado, nota e nº de partidas; pendentes com badge laranja |
| 5.4 | Implementar os 5 estados da tela | `isMatchOver` (closed/cancelled) · `confirmed` · `pending` · `isMatchFull` (full + fora) · aberta (padrão) |
| 5.5 | Botão contextual de participação | Bottom bar absoluta; texto e estilo mudam por estado; `handleJoin` / `handleCancel` com Alert de confirmação |
| 5.6 | Escrever testes para estados da tela | 11 testes: 5 estados + join sem aprovação + renderização geral + goBack + matchId inválido |

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `src/components/ParticipantList.tsx` | Lista confirmados + pendentes com avatar e rating |
| `src/screens/MatchDetailScreen.tsx` | Tela de detalhes com `useRoute` + 5 estados de participação |
| `src/screens/__tests__/MatchDetailScreen.test.tsx` | 11 testes cobrindo todos os estados |

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `src/navigation/types.ts` | `MatchDetail: { matchId: string }` adicionado ao `AppRootStackParamList` |
| `src/navigation/AppNavigator.tsx` | `MatchDetailScreen` registrado no `RootStack` |
| `src/screens/HomeScreen.tsx` | `MatchCard.onPress` → `navigation.navigate("MatchDetail", { matchId: item.id })` |
| `src/screens/SearchScreen.tsx` | Mesmo wiring de `onPress` |
| `src/mocks/matches.ts` | `match-12` adicionado (basquete avançado · full · sem CURRENT_USER) para cobrir estado "lotada" nos testes |

### Resultado dos testes

- **87 testes, 12 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅

### Estado ao final da sessão 6

- Branch `feat/match-detail` pronta para merge em `dev`
- Fase 5 **100% concluída** (6/6 tarefas)
- Próxima branch sugerida: `feat/user-profile` (Fase 3)
- Ponto exato de retomada: criar `src/screens/MyProfileScreen.tsx` (substituir placeholder) — tarefa 3.1

---

## Sessão 7 — 2026-05-26

### Fase 3 — Perfil do usuário (tarefas 3.1 a 3.6 concluídas)

| # | Tarefa | Observação |
|---|--------|------------|
| 3.1 | Criar tela `MyProfileScreen` | Hero dark (avatar XL + nome + localização + rating) · stats row · bio · esportes · nível · reviews |
| 3.2 | Criar tela `EditProfileScreen` | Formulário: nome, bio, localização, esportes (chips), nível (radio) · Alert de sucesso + goBack |
| 3.3 | Criar tela `PublicProfileScreen` | Visão de outro usuário via `userId` · hero idêntico ao MyProfile · reviews recebidas · botão Denunciar |
| 3.4 | Criar componente `TrustBadges` | 3 selos: Verificado (primary), partidas (secondary), nota (amber) — memo |
| 3.5 | Criar componente `ReviewCard` | Avatar + nome + data + RatingStars overall + critério destaque + comentário — memo |
| 3.6 | Escrever testes para `PublicProfileScreen` | 13 testes: dados do usuário, verificação, bio, localização, esportes, nível, reviews, ausência de reviews, navegação, userId inválido |

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `src/components/TrustBadges.tsx` | Selos de confiança reutilizáveis |
| `src/components/ReviewCard.tsx` | Card de avaliação recebida |
| `src/screens/EditProfileScreen.tsx` | Formulário de edição de perfil |
| `src/screens/PublicProfileScreen.tsx` | Perfil público de outro usuário |
| `src/screens/ReportUserScreen.tsx` | Placeholder para Fase 10 (rota registrada) |
| `src/screens/__tests__/PublicProfileScreen.test.tsx` | 13 testes |

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `src/screens/MyProfileScreen.tsx` | Substituiu placeholder — tela completa com todos os dados do usuário logado |
| `src/navigation/types.ts` | `PublicProfile`, `EditProfile`, `ReportUser` adicionados ao `AppRootStackParamList` |
| `src/navigation/AppNavigator.tsx` | 3 novas rotas registradas no `RootStack` |

### Resultado dos testes

- **100 testes, 13 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅

### Estado ao final da sessão 7

- Branch `feat/user-profile` pronta para merge em `dev`
- Fase 3 **100% concluída** (6/6 tarefas)
- Próxima branch sugerida: `feat/create-match` (Fase 6)
- Ponto exato de retomada: `src/screens/CreateMatchScreen.tsx` — substituir placeholder (tarefa 6.1)

---

## Sessão 8 — 2026-05-26

### Fase 6 — Criação de partida (tarefas 6.1 a 6.5 concluídas)

| # | Tarefa | Observação |
|---|--------|------------|
| 6.1 | Criar tela `CreateMatchScreen` | Formulário completo: chips de esporte, título, local, data (DD/MM/AAAA), horário (HH:MM), vagas, nível (radio), descrição, toggles iniciantes/aprovação |
| 6.2 | Implementar validação do formulário | 6 campos validados com mensagens inline; regex para data e hora; `Number.parseInt`/`Number.isNaN` |
| 6.3 | Implementar feedback de sucesso | `Alert.alert` com título, esporte, data e hora; ação "Ver partidas" navega para aba `Home` |
| 6.4 | Adicionar partida criada ao estado mock local | `MatchesContext` criado com `matches` + `addMatch`; HomeScreen, SearchScreen e MatchDetailScreen migrados do import direto para o contexto |
| 6.5 | Escrever testes para o formulário de criação | 24 testes em 4 grupos: renderização (7), validação (8), submissão válida (4), interações (5) |

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `src/contexts/MatchesContext.tsx` | Contexto de partidas: `MatchesProvider` + `useMatchesContext` + `addMatch` |
| `src/screens/CreateMatchScreen.tsx` | Substituiu placeholder — formulário completo com `BottomTabNavigationProp` |
| `src/screens/__tests__/CreateMatchScreen.test.tsx` | 24 testes (contexto mockado via `jest.mock`) |

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `App.tsx` | `MatchesProvider` adicionado entre `AuthProvider` e `MatchFiltersProvider` |
| `src/screens/HomeScreen.tsx` | `MOCK_MATCHES` → `useMatchesContext().matches` |
| `src/screens/SearchScreen.tsx` | `MOCK_MATCHES` → `useMatchesContext().matches`; correção S7735 (condição negada) |
| `src/screens/MatchDetailScreen.tsx` | `MOCK_MATCHES` → `useMatchesContext().matches` (novas partidas ficam acessíveis via deep link) |
| `src/screens/__tests__/MatchDetailScreen.test.tsx` | Renders envolvidos com `<MatchesProvider>` (provider real, usa MOCK_MATCHES) |

### Resultado dos testes

- **124 testes, 14 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅
- `npx tsc --noEmit` zero erros ✅

### Estado ao final da sessão 8

- Branch `feat/create-match` — commit realizado, merge pendente em `dev`
- Fase 6 **100% concluída** (5/5 tarefas)
- Próxima branch: `feat/match-participation` (Fase 7)
- Ponto exato de retomada: `src/screens/MatchDetailScreen.tsx` — `handleJoin` e `handleCancel` hoje só alteram `useState` local; Fase 7 eleva esse estado para `MatchesContext` via hook `useMatchParticipation`

---

## Sessão 9 — 2026-05-26

### Fase 7 — Participação em partida (tarefas 7.1 a 7.5 concluídas)

| # | Tarefa | Observação |
|---|--------|------------|
| 7.1 | Implementar ação "Participar de partida" | `updateParticipation` adicionado ao `MatchesContext`; insere ou atualiza participante na lista |
| 7.2 | Implementar ação "Cancelar participação" | `cancel()` abre Alert de confirmação; define status "cancelled" no contexto |
| 7.3 | Implementar estado "Aguardando aprovação" | `join()` detecta `match.requiresApproval` e aplica "pending" ou "confirmed" |
| 7.4 | Criar hook `useMatchParticipation` | Retorna `{ match, userStatus, join, cancel }`; normaliza "cancelled" para `null` |
| 7.5 | Escrever testes para fluxo de participação | 11 testes: leitura de status (5), join (4), cancel (2) |

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `src/hooks/useMatchParticipation.ts` | Hook que encapsula toda a lógica de participação |
| `src/hooks/__tests__/useMatchParticipation.test.ts` | 11 testes com mock controlado de `MOCK_MATCHES` |

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `src/contexts/MatchesContext.tsx` | `updateParticipation` adicionado + `applyParticipationUpdate` como função pura externa |
| `src/screens/MatchDetailScreen.tsx` | `useState`/`handleJoin`/`handleCancel` removidos; substituídos por `useMatchParticipation` |

### Resultado dos testes

- **135 testes, 15 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅

### Estado ao final da sessão 9

- Branch `feat/match-participation` — pronta para commit e merge em `dev`
- Fase 7 **100% concluída** (5/5 tarefas)
- Próxima branch: `feat/match-chat` (Fase 8)
- Ponto exato de retomada: criar `src/screens/MatchChatScreen.tsx` (tarefa 8.1) e adicionar botão "Chat" em `MatchDetailScreen`
