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

---

## Sessão 10 — 2026-05-26

### Fase 8 — Chat da partida (tarefas 8.1 a 8.6 concluídas)

| # | Tarefa | Observação |
|---|--------|------------|
| 8.1 | Criar tela `MatchChatScreen` | `FlatList` invertida + `KeyboardAvoidingView`; header com título da partida e contagem de confirmados |
| 8.2 | Criar componente `MessageBubble` | 3 variantes: própria (azul, alinhada à direita), outro usuário (branca, esquerda + avatar + nome), sistema (pill cinza centralizada) |
| 8.3 | Criar componente `ChatInput` | `TextInput` multiline + botão send com `MaterialCommunityIcons`; botão desabilitado com texto vazio |
| 8.4 | Simular envio de mensagem no estado local | `MessagesContext` com `sendMessage` (prepend no array); `getMessages(matchId)` para leitura |
| 8.5 | Adicionar mensagens de sistema | Mocks com `type: "system"` para match-1 (7 msgs) e match-3 (8 msgs); visual diferenciado no `MessageBubble` |
| 8.6 | Escrever testes para `MessageBubble` | 9 testes em 3 grupos: mensagem de outro usuário (3), própria (3), sistema (3) |

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `src/types/index.ts` | `MessageType` + `Message` adicionados |
| `src/mocks/messages.ts` | 15 mensagens mockadas para match-1 e match-3 (newest-first) |
| `src/contexts/MessagesContext.tsx` | `MessagesProvider` + `useMessagesContext` + `sendMessage` |
| `src/components/MessageBubble.tsx` | Componente memo com 3 variantes visuais |
| `src/components/ChatInput.tsx` | Componente memo com TextInput + botão send |
| `src/screens/MatchChatScreen.tsx` | Tela de chat com FlatList invertida |
| `src/components/__tests__/MessageBubble.test.tsx` | 9 testes |

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `src/navigation/types.ts` | `MatchChat: { matchId: string }` adicionado ao `AppRootStackParamList` |
| `src/navigation/AppNavigator.tsx` | `MatchChatScreen` registrado no `RootStack` |
| `src/screens/MatchDetailScreen.tsx` | Botão "Chat da partida" adicionado no estado `confirmed` |
| `App.tsx` | `MessagesProvider` adicionado na árvore de contextos |

### Resultado dos testes

- **144 testes, 16 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅

### Estado ao final da sessão 10

- Branch `feat/match-chat` — pronta para commit e merge em `dev`
- Fase 8 **100% concluída** (6/6 tarefas)
- Próxima branch: `feat/post-match-rating` (Fase 9)
- Ponto exato de retomada: criar `src/screens/PostMatchRatingScreen.tsx` (tarefa 9.1) — lista participantes de uma partida passada para avaliação

---

## Sessão 11 — 2026-05-26

### Fase 9 — Avaliação pós-partida (tarefas 9.1 a 9.5 concluídas)

| # | Tarefa | Observação |
|---|--------|------------|
| 9.1 | Criar tela `PostMatchRatingScreen` | FlatList de confirmados excluindo current user; badge "Avaliado" após submit; banner "Todos avaliados!" quando completo |
| 9.2 | Criar tela `RateUserScreen` | Card do usuário + 5 `StarRatingInput` (pontualidade, respeito, comportamento, presença, exp. geral) + `TextInput` comentário (280 chars) + validação inline |
| 9.3 | Criar componente `StarRatingInput` | `Pressable` por estrela; `accessibilityLabel` com singular/plural; tamanhos sm/md/lg via `fontSize` |
| 9.4 | Implementar feedback de avaliação enviada | `Alert.alert` com nome do usuário avaliado; `navigation.goBack()` no callback "OK"; `RatingsContext` persiste estado na sessão |
| 9.5 | Escrever testes para `StarRatingInput` | 7 testes: renderização (label, sem label, 5 botões) + interação (onChange para estrelas 1, 3, 5 e re-seleção) |

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `src/components/StarRatingInput.tsx` | Input interativo de estrelas — memo, 3 tamanhos |
| `src/contexts/RatingsContext.tsx` | `RatingsProvider` + `useRatingsContext` + `submitRating` + `hasRated` |
| `src/screens/PostMatchRatingScreen.tsx` | Lista de participantes para avaliar |
| `src/screens/RateUserScreen.tsx` | Formulário de avaliação com 5 critérios |
| `src/components/__tests__/StarRatingInput.test.tsx` | 7 testes |

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `src/mocks/matches.ts` | `match-13` adicionado (futebol encerrado, guilherme + 4 participantes) |
| `src/navigation/types.ts` | `PostMatchRating` e `RateUser` adicionados ao `AppRootStackParamList` |
| `src/navigation/AppNavigator.tsx` | `PostMatchRatingScreen` e `RateUserScreen` registrados no `RootStack` |
| `src/screens/MatchDetailScreen.tsx` | Botão "Avaliar participantes" no estado `isMatchOver` quando `match.status === "closed"` e `userStatus === "confirmed"` |
| `App.tsx` | `RatingsProvider` adicionado na árvore de contextos |

### Resultado dos testes

- **151 testes, 17 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅

### Estado ao final da sessão 11

- Branch `feat/post-match-rating` — pronta para commit e merge em `dev`
- Fase 9 **100% concluída** (5/5 tarefas)
- Próxima branch: `feat/report-user` (Fase 10)
- Ponto exato de retomada: `src/screens/ReportUserScreen.tsx` — substituir placeholder com formulário completo (tarefa 10.1)

---

## Sessão 12 — 2026-05-26

### Fase 10 — Denúncia e segurança (tarefas 10.1 a 10.5 concluídas)

| # | Tarefa | Observação |
|---|--------|------------|
| 10.1 | Criar tela `ReportUserScreen` | Card do usuário denunciado + 7 chips de motivo (single-select) + partida relacionada (opcional) + descrição 500 chars + aviso sobre denúncias falsas |
| 10.2 | Implementar select de motivos de denúncia | 7 motivos predefinidos como chips: comportamento inadequado, violência, não compareceu, discurso de ódio, spam, informações falsas, outro |
| 10.3 | Implementar feedback de denúncia enviada | `Alert.alert` com nome do usuário + mensagem de 48h; goBack no "OK" |
| 10.4 | Adicionar botão "Denunciar" no `PublicProfileScreen` | Já existia desde sessão 7 — ícone `flag-outline` no header + botão ghost no rodapé |
| 10.5 | Escrever testes para o formulário de denúncia | 14 testes em 6 grupos: renderização, validação, submissão, navegação, partida relacionada, userId inválido |

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `src/screens/__tests__/ReportUserScreen.test.tsx` | 14 testes cobrindo todos os fluxos |

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `src/screens/ReportUserScreen.tsx` | Substituiu placeholder — formulário completo de denúncia |

### Resultado dos testes

- **165 testes, 18 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅

### Estado ao final da sessão 12

- Branch `feat/report-user` — pronta para commit e merge em `dev`
- Fase 10 **100% concluída** (5/5 tarefas)
- Próxima sessão: decidir entre Fase 11 (moderação admin, opcional) e Fase 12 (revisão e polimento final)

---

## Sessão 13 — 2026-07-02

### Fase 11 — Moderação (tarefas 11.1 a 11.3 concluídas)

| # | Tarefa | Observação |
|---|--------|------------|
| 11.1 | Criar tela `AdminDashboardScreen` | Lista de denúncias ordenada (pendentes primeiro) + contador no topo + `EmptyState`; acessível via botão "Painel administrativo" (ghost) no rodapé de `MyProfileScreen` — rota oculta, sem RBAC real |
| 11.2 | Criar tela `ReportDetailScreen` | Usuário denunciado, denunciante, motivo, descrição, partida relacionada (se houver), data e status atual |
| 11.3 | Implementar ações mockadas (arquivar, advertir, banir) | 3 botões com `Alert` de confirmação antes de aplicar; `ReportsContext.updateReportStatus` atualiza o estado e a tela volta com `goBack()` |

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `src/contexts/ReportsContext.tsx` | `ReportsProvider` + `useReportsContext` — `reports`, `addReport`, `updateReportStatus` |
| `src/mocks/reports.ts` | `MOCK_REPORTS` — 4 denúncias cobrindo os 4 status (`pending` ×2, `warned`, `archived`) |
| `src/utils/reportLabels.ts` | `REASON_LABELS`, `STATUS_LABELS`, `STATUS_COLORS` — compartilhados entre `AdminDashboardScreen` e `ReportDetailScreen` |
| `src/screens/AdminDashboardScreen.tsx` | Lista de denúncias para moderação |
| `src/screens/ReportDetailScreen.tsx` | Detalhes da denúncia + ações administrativas |
| `src/screens/__tests__/AdminDashboardScreen.test.tsx` | 8 testes: renderização, ordenação, navegação |
| `src/screens/__tests__/ReportDetailScreen.test.tsx` | 10 testes: renderização, ações administrativas, navegação |

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `src/types/index.ts` | `Report` ganhou `status: ReportStatus`; `ReportReason` realinhado aos motivos reais já usados em `ReportUserScreen` (o tipo antigo — `inappropriate_behavior` etc. — nunca era de fato referenciado no código) |
| `src/screens/ReportUserScreen.tsx` | `handleSubmit` agora chama `addReport` (status inicial `"pending"`) além do `Alert` já existente |
| `src/screens/__tests__/ReportUserScreen.test.tsx` | Mock de `useReportsContext` adicionado; +1 teste validando o payload enviado a `addReport` |
| `src/screens/MyProfileScreen.tsx` | Botão "Painel administrativo" (`variant="ghost"`) adicionado após "Editar perfil" |
| `src/navigation/types.ts` | `AdminDashboard: undefined` e `ReportDetail: { reportId: string }` adicionados ao `AppRootStackParamList` |
| `src/navigation/AppNavigator.tsx` | `AdminDashboardScreen` e `ReportDetailScreen` registrados no `RootStack` |
| `App.tsx` | `ReportsProvider` adicionado à árvore de contextos (entre `RatingsProvider` e `MessagesProvider`) |

### Resultado dos testes

- **181 testes, 20 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅ (após `npm run lint:fix` para normalizar CRLF → LF, dívida D4)
- `npx tsc --noEmit` — 1 erro pré-existente e não relacionado em `RateUserScreen.tsx:78` (ver dívida D9); nenhum erro nos arquivos novos/modificados desta sessão

### Estado ao final da sessão 13

- Branch `feat/moderation` — commit realizado (ver histórico do git)
- Fase 11 **100% concluída** (3/3 tarefas) — roadmap também corrigido: Fase 10 estava marcada como "A fazer" por desatualização, já estava concluída desde a sessão 12
- Próxima fase: **Fase 12 — Revisão e polimento final** (12.1 a 12.8, ver `.status/queue.md`)
- Ponto exato de retomada: corrigir a dívida técnica **D9** (`src/screens/RateUserScreen.tsx:78` — `user` possivelmente `undefined` no `tsc`, dentro da mensagem do `Alert.alert` em `handleSubmit`) como primeiro passo da Fase 12, depois seguir para 12.1 (revisão de consistência visual)

---

## Sessão 14 — 2026-07-02

### Dívida técnica D9 corrigida

`src/screens/RateUserScreen.tsx` — adicionado `if (!user) return;` no início de `handleSubmit`. Causa raiz: o narrowing de `if (!match || !user) return` no corpo do componente não se propaga para dentro de closures aninhadas como `handleSubmit` (limitação conhecida do TypeScript com controle de fluxo em funções aninhadas) — é preciso repetir o guard dentro da própria função.

### Resultado dos testes

- **181 testes, 20 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅
- `npx tsc --noEmit` zero erros ✅ (primeira vez zerado desde que a dívida foi identificada)

### Estado ao final da sessão 14

- Merge branch `fix/rate-user-tsc-d9` → `dev`
- Nenhuma branch nova criada para a Fase 12 ainda
- Próxima ação: Fase 12, branch sugerida `feat/final-polish`, começar por 12.1

---

## Sessão 15 — 2026-07-02

### Fase 12 — Revisão e polimento final (tarefa 12.1 concluída, branch `feat/final-polish`)

| # | Tarefa | Observação |
|---|--------|------------|
| 12.1 | Revisar consistência visual entre todas as telas | Auditoria (agente Explore, leitura integral de 18 telas + 15 componentes) encontrou 25 inconsistências em 5 categorias: cores fora do design system, espaçamento fora da escala, tipografia inconsistente, border-radius divergente, estrutura duplicada entre telas. Todas as 25 corrigidas nesta sessão. |

### Auditoria — achados e correções

**Cores**
- `amber-*` (paleta padrão do Tailwind, vazando por engano) substituído pelo token `warning` (`#F59E0B`) em estrelas de avaliação, badges de destaque, status "pendente" e avisos — arquivos: `RatingStars.tsx`, `StarRatingInput.tsx`, `TrustBadges.tsx`, `ReviewCard.tsx`, `reportLabels.ts`, `ReportUserScreen.tsx`.
- `primary-600` (reservado ao estado `active:`/pressed em `Button.tsx`) estava sendo usado como cor de repouso em `ChatInput.tsx`, `MessageBubble.tsx` e `PostMatchRatingScreen.tsx` — corrigido para `primary-500`.
- `placeholderTextColor` padronizado para `#9CA3AF` (neutral-400, o mesmo tom já usado em `Input.tsx`) em `ChatInput.tsx`, `RateUserScreen.tsx`, `ReportUserScreen.tsx`.

**Estrutura**
- `src/components/Header.tsx` reescrito — antes era um componente morto (nenhuma tela importava), agora centraliza o cabeçalho das 13 telas que duplicavam manualmente o bloco `bg-secondary-900 pt-14 ...`. Nova API: `title`, `subtitle?`, `onBack?`, `rightElement?`, `variant?: "compact"|"large"`, `children?`. Usa `useSafeAreaInsets` (`react-native-safe-area-context`) em vez do `pt-14` fixo, corrigindo um risco real de quebra visual em aparelhos com notch/status bar de altura diferente.
- Telas migradas para `<Header>`: `HomeScreen`, `SearchScreen`, `CreateMatchScreen` (`variant="large"`), `MyProfileScreen`, `PublicProfileScreen`, `AdminDashboardScreen`, `ReportDetailScreen`, `ReportUserScreen`, `MatchDetailScreen`, `EditProfileScreen`, `PostMatchRatingScreen`, `RateUserScreen`, `MatchChatScreen` (`subtitle` para contagem de participantes).
- `FiltersScreen.tsx` — botão de aplicar filtros agora usa o componente `Button` compartilhado (antes recriava um `Pressable` à mão, perdendo estados padronizados de `active:`).

**Tipografia**
- Rótulos de seção/card padronizados para `text-sm font-semibold text-secondary-900` (removendo variações de tamanho, cor e `uppercase`) em `FiltersScreen.tsx`, `ProfileSetupScreen.tsx` e `ReportDetailScreen.tsx` (que também tinha os textos em CAIXA ALTA manual, normalizados para sentence case).
- `WelcomeScreen.tsx`: `leading-relaxed` (valor não numérico, fora do padrão) trocado por `leading-5` (consistente com o restante do texto `text-sm`).

**Componentes**
- `Input.tsx` ganhou suporte a `multiline` (com `textAlignVertical` e `minHeight` automáticos), eliminando dois blocos de `TextInput` com estilo inline duplicado byte a byte em `RateUserScreen.tsx` e `ReportUserScreen.tsx`.
- `Card.tsx`: `rounded-xl` → `rounded-2xl` — o componente era o outlier (30+ lugares no app já usavam `rounded-2xl` manualmente para o mesmo tipo de card branco).

**Design tokens**
- `tailwind.config.js`: escala `spacing` formalizada com as chaves `0.5, 1.5, 2.5, 9, 11` — valores que já eram usados em várias telas via fallback do Tailwind (não documentados no design system customizado).

**Não corrigido (limitação técnica registrada como dívida D10)**
- NativeWind v4 instalado não suporta `contentContainerClassName`; os `contentContainerStyle={{ padding, gap }}` em pixels em várias telas permanecem como `style` inline em vez de classes Tailwind.

### Testes ajustados

Toda tela que renderiza `<Header>` chama `useSafeAreaInsets()`, que lança erro fora de um `<SafeAreaProvider>`. Adicionado `jest.mock("react-native-safe-area-context", () => ({ useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }) }))` em: `Header.test.tsx`, `PublicProfileScreen.test.tsx`, `AdminDashboardScreen.test.tsx`, `ReportDetailScreen.test.tsx`, `ReportUserScreen.test.tsx`, `MatchDetailScreen.test.tsx`, `CreateMatchScreen.test.tsx`.

### Resultado dos testes

- **181 testes, 20 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅ (após `npm run lint:fix` para CRLF → LF, dívida D4)
- `npx tsc --noEmit` zero erros ✅

### Estado ao final da sessão 15

- Branch `feat/final-polish` criada a partir de `dev` — commit pendente (ver checkpoint em `.status/queue.md`)
- Fase 12: 1/8 concluída (12.1)
- Próxima ação: tarefa 12.2 — testar o fluxo completo (happy path: Welcome → Login → Home → MatchDetail → Chat → Avaliação) rodando o app via `npm start` (Expo Go ou emulador)

---

## Sessão 16 — 2026-07-02

### Redesign visual premium (transversal — branch `feat/final-polish`)

Overhaul completo da interface para padrão B2C de mercado, mantendo a identidade Electric Blue + Dark Slate e 100% da funcionalidade/navegação. Zero mudanças de regra de negócio.

#### Fundação — `src/theme/index.ts` (novo)

Fonte única de verdade para estilos fora do NativeWind:
- `colors` — espelho tipado do `tailwind.config.js`; substituiu ~40 hex codes hardcoded em props `color` de ícones espalhados por 20+ arquivos.
- `shadows` — sistema de elevação com 4 presets (`card`, `raised`, `floating`, `cta`) combinando sombra iOS + `elevation` Android; aplicado via `style`.
- `SPORT_META` — identidade por esporte: ícone vetorial + cor de categoria + bg tint (futebol esmeralda, vôlei violeta, basquete laranja, tênis lima, futsal teal, outro slate). Fim dos emojis como iconografia.
- `LEVEL_META` — labels centralizados de nível (eliminou 6 cópias de `levelLabel`/`LEVEL_LABELS`).

#### Componentes novos

| Componente | Papel |
|-----------|-------|
| `SectionCard` | Card branco com título/subtítulo/rightElement — substituiu ~20 blocos `bg-white rounded-2xl p-4` duplicados |
| `Chip` | Pill selecionável única (ícone, sublabel, tone primary/danger, roles radio/checkbox) — substituiu 5 implementações duplicadas |
| `SportTile` | Tile quadrado com ícone + cor do esporte — âncora visual de MatchCard e MatchDetail |
| `StatsRow` | Linha de métricas em cards — desduplicou stats dos 2 perfis |
| `Skeleton` + `MatchCardSkeleton` | Loading pulsante (Animated loop) — usado na Home |

#### Componentes elevados

- `Button` — alturas fixas (h-10/12/14), `rounded-2xl`, prop `icon`, variant `danger`, glow azul no CTA primário, scale 0.98 no press, ghost agora `bg-secondary-100`.
- `Card` — sombra real (`shadows.card`), prop `raised`, microinteração de press.
- `Badge` — sport variant usa ícone vetorial + cores de categoria via `SPORT_META` (sem emoji).
- `Avatar` — fallback sólido `primary-500` com iniciais brancas em bold, prop `ring` (anel branco para heros), `xl` 96px.
- `EmptyState` — ícone `MaterialCommunityIcons` em círculo suave (prop `icon` agora é nome MCI, não emoji).
- `RatingStars` / `StarRatingInput` — estrelas vetoriais (`star`/`star-half-full`/`star-outline`) em vez de texto "★"; input com scale no press.
- `Header` — botão voltar em pill `bg-white/10`, large variant com `text-3xl` + subtitle.
- `Input` — borda 1.5px, prop `leftIcon` com cor reativa a focus/erro, erro com ícone.
- `ChatInput`/`MessageBubble` — send button maior com scale, bolhas `rounded-3xl` com cauda `rounded-b*-md`, sombra em bolhas de terceiros.
- `ReviewCard` — usa `Card` + chip de destaque com ícone de troféu.

#### Telas redesenhadas (todas as 18)

- **Home** — hero header com saudação personalizada + avatar com anel, busca h-12, quick-filters horizontais por esporte (integrados ao `MatchFiltersContext`), section title com contagem, skeleton screen de 700ms no primeiro load.
- **MatchCard** — layout novo: SportTile + eyebrow colorido (`FUTEBOL · INTERMEDIÁRIO`) + título, meta com ícones, barra de vagas, footer com organizador + tags pill.
- **MatchDetail** — hero com SportTile 56 + eyebrow, `InfoRow` com ícones em tiles azuis, SectionCards, bottom bar com `useSafeAreaInsets` + sombra floating, botões com ícones.
- **Welcome** — glow decorativo, tiles de esporte com cores de categoria, CTA invertido (Criar conta = primário).
- **Login/Register/ProfileSetup** — inputs com ícones, câmera badge no avatar, footer link no Register, `StatusBar dark` local (global agora `light`).
- **Perfis (My/Public)** — hero com avatar ring + `rounded-b-3xl`, StatsRow sobreposta (-mt-4), SectionCards, botões com ícones.
- **CreateMatch** — chips de esporte com ícones coloridos, toggles com descrição, header com subtitle.
- **Filters** — Chips, checkbox `rounded-lg` com `check-bold`, footer com sombra floating.
- **Chat/PostMatchRating/RateUser/ReportUser/Admin** — SectionCards, EmptyStates vetoriais, bottom bars com safe area, denúncia com tone danger, "Banir usuário" com variant `danger`.
- **Tab bar** — altura fixa removida (safe area correta em iPhones com home indicator), ícones filled/outline por foco, `borderTopWidth: 0`.

#### Tokens ajustados (`tailwind.config.js`)

- `borderRadius`: `2xl` 24→20px (mais moderno), `3xl` 28px adicionado.
- `letterSpacing`: valores em px (RN não suporta `em`) — `tracking-tight`/`wide` agora funcionam.

#### Testes atualizados

- `Badge.test` — emoji prefix → ícone vetorial (`getByTestId("icon-soccer")`).
- `EmptyState.test` — emojis → testIDs de ícones MCI.
- `PublicProfileScreen.test` — `"🏐 Vôlei"` → `"Vôlei"`.

### Resultado dos testes

- **181 testes, 20 suítes, 0 falhas** — `npm run test` ✅
- `npm run lint` zero erros ✅ (após `npm run lint:fix`, dívida D4)
- `npx tsc --noEmit` zero erros ✅

### Estado ao final da sessão 16

- Branch `feat/final-polish` — redesign completo, commit pendente
- Fase 12 permanece 1/8 (redesign foi trabalho transversal, não tarefa numerada)

---

## Sessão 17 — 2026-07-02

### Fase 12.2 — Testar fluxo completo (happy path)

Sem emulador/dispositivo físico disponível no ambiente (sandbox Windows headless), o fluxo foi validado via `npm run web` (Metro bundler para web, porta 8081) dirigido por Playwright (Chromium headless), navegando pela UI real como um usuário faria — sem mocks de teste, sem `jest`.

Rota percorrida: Welcome → Login (mock) → Home → MatchDetail (partida já confirmada) → Chat (envio de mensagem) → Home (busca) → MatchDetail (partida encerrada) → PostMatchRating → RateUser (envio de avaliação).

| Tela | Resultado |
|------|-----------|
| Welcome | OK — hero, tiles de esporte, stats, CTAs renderizam conforme redesign da sessão 16 |
| Login | OK — validação de e-mail/senha, mock aceita qualquer credencial válida |
| Home | OK — skeleton inicial, busca, quick-filters por esporte, cards com barra de vagas |
| MatchDetail (confirmado) | OK — estado "Você está confirmado", botão Chat da partida |
| MatchChat | OK — histórico mockado, envio de mensagem via botão enviar |
| MatchDetail (encerrada) | OK — botão "Avaliar participantes" visível só quando `status: closed` + usuário confirmado |
| PostMatchRating → RateUser | OK — 5 critérios com estrelas, submissão grava a avaliação (`hasRated` passa a `true`, badge "Avaliado" aparece na lista) |

Nenhum erro de console/página JS em nenhuma etapa.

#### Achados (não bloqueantes para esta tarefa, registrados para tarefas futuras)

- **`Alert.alert` não produz diálogo em `react-native-web`** (sem polyfill instalado): em `RateUserScreen`, `ReportUserScreen`, `ReportDetailScreen` e no cancelamento de participação em `MatchDetailScreen`, o `Alert.alert(...)` é chamado mas não renderiza nada no browser — a ação de dados ocorre normalmente (confirmado: `submitRating` grava e o badge "Avaliado" reflete o estado), mas o callback de `onPress` do botão "OK" (que faz `navigation.goBack()`) nunca dispara, deixando o usuário "preso" na tela sem feedback visual. Em Expo Go / iOS / Android nativo isso funciona normalmente — é uma limitação conhecida do `react-native-web` sem polyfill, não uma regressão desta sessão. Relevante para 12.3 (testar em Expo Go) confirmar que funciona nativamente, e para decidir se vale a pena um polyfill de `Alert` caso a apresentação use `npm run web` em vez de dispositivo/emulador.
- **Timestamp de mensagem enviada no chat usa hora real (`new Date().toLocaleTimeString()`)** em `MessagesContext.sendMessage`, enquanto o histórico mockado usa horários fictícios fixos (ex.: 09:10–09:42) — mensagem nova pode aparecer com horário "menor" que mensagens anteriores da conversa, quebrando a ordem cronológica visual. Cosmético, relevante para 12.7 (revisar dados mockados para coerência narrativa).

### Fase 12.5 e 12.6 — Lint e testes automatizados

`npm run lint` e `npx tsc --noEmit` zero erros. `npm run test`: 181/181 testes, 20 suítes, 0 falhas. Nenhuma mudança de código necessária — suíte já estava saudável desde a sessão 16.

### Fase 12.4 — Acessibilidade básica

Auditoria feita por subagente dedicado (leitura de todos os `src/components/*.tsx` e `src/screens/*.tsx`, cálculo de contraste WCAG por luminância relativa para as combinações de cor mais usadas). Cobertura de `accessibilityLabel` já era boa (herdada do redesign da sessão 16); dois problemas concretos corrigidos:

- **`Card.tsx`** — `Pressable` do card inteiro não tinha `accessibilityLabel` próprio; leitor de tela concatenava todos os `Text` internos em ordem confusa. Adicionada prop opcional `accessibilityLabel` ao componente; `MatchCard.tsx` agora monta `` `${título}, ${esporte}, ${data} às ${horário}, ${local}` ``.
- **Contraste insuficiente** (abaixo de 4.5:1 para texto/3:1 para ícones informativos): `text-neutral-400` (~2.54:1 sobre branco) trocado por `text-neutral-500` (~4.83:1) em 15 arquivos (20 ocorrências) — `HomeScreen`, `SearchScreen`, `MatchDetailScreen`, `MatchChatScreen`, `CreateMatchScreen`, `PostMatchRatingScreen`, `RateUserScreen`, `PublicProfileScreen`, `ReportUserScreen`, `Button`, `ParticipantList`, `MessageBubble`, `Chip`, `SectionCard`, `ReviewCard`. `colors.neutral[400]` (ícone/placeholder) trocado por `colors.neutral[500]` em `Input.tsx` e `ChatInput.tsx`. Placeholder/ícone de busca em fundo escuro (`colors.secondary[500]` a ~3.07:1) trocado por `colors.secondary[400]` (mesmo tom já usado no ícone de lupa) em `HomeScreen.tsx` e `SearchScreen.tsx`.
- **Não corrigido (nice-to-have, não bloqueante):** ícone `check-decagram` (selo de verificado) sem texto alternativo para leitor de tela em 6 arquivos (`ParticipantList`, `MatchDetailScreen`, `PublicProfileScreen`, `MyProfileScreen`, `RateUserScreen`, `PostMatchRatingScreen`) — ícone informativo, mas sozinho sem `accessibilityLabel`/texto "Verificado" próximo.

Verificado visualmente após a mudança (`npm run web` + Playwright): busca, cards e perfil renderizam normalmente, sem regressão visual perceptível — o tom de cinza fica muito próximo do anterior.

### Fase 12.7 — Coerência dos dados mockados

Auditoria por subagente dedicado (leitura de `src/mocks/{users,matches,messages,ratings,reports}.ts`). Achados bloqueantes corrigidos:

- **`matches.ts`, `match-3`** — tinha `allowBeginners: false` mas Juliana Costa (nível `beginner`) estava confirmada como participante, sem explicação. Corrigido para `allowBeginners: true` (a partida já tem `requiresApproval: true`, então o cenário coerente é o organizador aceitar uma exceção via aprovação manual).
- **`ratings.ts` (todas as 7 avaliações) e `reports.ts` (`report-4`)** — referenciavam partidas ainda `status: "open"`/`"full"` com `createdAt` **anterior** à data da partida (avaliações/denúncia registradas antes do jogo acontecer) — e, ao mesmo tempo, `match-13` (a única partida `status: "closed"` do mock, cuja descrição pede explicitamente "Avalie os participantes!") não tinha nenhuma avaliação ou denúncia associada. Corrigido reapontando todas para `match-13` — seus participantes confirmados (guilherme, thiago, rafael, beatriz, ana) batem exatamente com quem já aparecia nas avaliações — com `createdAt` recalculado para depois da partida (`2026-05-10`/`2026-05-11`, a partida terminou por volta de 11h).
- **`matches.ts`, `match-11`** — local "Clube Caiçaras" (um clube real em São Paulo) destoava dos demais locais do mock, todos no Rio de Janeiro. Trocado por "Clube Fluminense — Quadra 4, Laranjeiras".
- **Não corrigido (cosmético, já documentado na 12.2):** timestamp de mensagem nova no chat usa hora real (`new Date()`) misturado com histórico mockado de horários fixos; nenhuma partida usa o status `pending_approval` apesar de existir no tipo; `matchesPlayed` dos usuários é bem maior que o volume de partidas do mock (esperado em dataset pequeno de protótipo).

`MOCK_RATINGS` é consumido apenas por `PublicProfileScreen`/`MyProfileScreen` (lista de avaliações recebidas no perfil) — é um dataset estático independente do `RatingsContext.submittedRatings` (que começa vazio a cada sessão e alimenta o fluxo interativo de "Avaliar participantes"), então repontar o campo `match` não afeta o fluxo de avaliação pós-partida testado na 12.2. Confirmado visualmente: perfil de Beatriz Rocha mostra a avaliação de Ana Lima com data "11 de mai. de 2026", um dia após a partida.

### Validação final

`npm run lint` zero erros · `npx tsc --noEmit` zero erros · `npm run test` 181/181 passando (sem alteração de testes) · verificação visual via `npm run web` + Playwright sem erros de console.

### Estado ao final da sessão 17

- Branch `feat/final-polish`, working tree com alterações em `.status/*`, `src/components/{Card,MatchCard,Input,ChatInput}.tsx`, `src/screens/{HomeScreen,SearchScreen,AdminDashboardScreen,CreateMatchScreen,MatchChatScreen,MatchDetailScreen,ParticipantList,PostMatchRatingScreen,RateUserScreen,PublicProfileScreen,ReportUserScreen,MessageBubble,Chip,SectionCard,ReviewCard,Button}.tsx` (troca de tom de cinza) e `src/mocks/{matches,ratings,reports}.ts`
- Fase 12: 12.1, 12.2, 12.4, 12.5, 12.6, 12.7 concluídas (6/8). Restam 12.3 (Expo Go iOS/Android — requer dispositivo/emulador do usuário) e 12.8 (build de apresentação)
- Nenhum bug pendente — parada é limpa, entre tarefas

## Sessão 18/19 — 2026-07-08 (documentação, sem código)

Sessões só de documentação, sem alterar `src/`: leitura do backend real (`../back`) e criação de
`.status/backend-contract.md` (comparação completa de contrato front×backend, decisões D-A a D-D)
na sessão 18; na sessão 19, transformação do plano mestre em fila executável (Fase 13, 16 tarefas,
13.1–13.9) em `.status/roadmap.md` §19 e `.status/queue.md`. Depois, ainda em 2026-07-08, o
backend concluiu sua Etapa 1 (D-B/D-C/D-D aplicadas, deploy em produção no Railway) — sincronizado
em `.status/backend-contract.md`, `.status/plano-de-entrega.md` (novo, plano de entrega final das
5 trilhas) e URL de produção documentada (`https://squadup-api.up.railway.app`).

## Sessão 20 — 2026-07-08

### Fase 13.1 — Tipos alinhados ao contrato real

Branch `feat/api-contract-types`. Objetivo: dividir `types.User`/`types.Match` conforme o
contrato real do backend (`.status/backend-contract.md` §2.1/§2.2/§6, decisões D-B/D-C), expondo
em tempo de compilação todo lugar que assumia o shape antigo — esse era o objetivo declarado da
tarefa, não um efeito colateral indesejado.

**`src/types/index.ts` reescrito:**
- `User` → `PublicUser` (mesmos campos) + `MyProfile extends PublicUser { email, role }`
  (`UserRole = "user" | "admin"`), espelhando `PublicProfileRead`/`MyProfileRead` do backend.
- `Match` → `MatchSummary` (`organizerId`, `confirmedCount`, `availableSlots` — campos calculados
  no servidor, sem organizador/participantes expandidos) + `MatchDetail extends MatchSummary`
  (`organizer: PublicUser`, `participants: Participant[]`), espelhando `MatchRead`/`MatchDetailRead`.
- Novo `MatchRef` (`id, title, sport, date`) — `Rating.match`/`Report.match` passam a usar esse
  tipo leve em vez do `Match` completo, espelhando o `MatchRef` que o backend ganhou (decisão D-C,
  já aplicada lá em 2026-07-08).

**Decisão de escopo (registrada como dívida técnica D19 em `queue.md`):** os mocks já vêm com
`organizer`/`participants` completos (é tudo mockado, não há round-trip de rede), então
`MatchesContext`, `useMatchFilters` e `MatchCard` foram tipados sobre `MatchDetail` — não
`MatchSummary` — para não regredir a busca por nome do organizador na `HomeScreen`/`SearchScreen`.
Isso é consistente com o objetivo desta tarefa (só tipos, sem mudar comportamento), mas quando a
13.5 trocar `MatchesContext` por `GET /matches` real, a listagem vai parar de trazer o objeto
`organizer` — a busca por nome do organizador vai precisar ser removida ou resolvida de outra
forma nesse momento.

**Arquivos ajustados para os novos tipos** (guiado por `npx tsc --noEmit`, que caiu de ~34 erros
para 0 em 3 rodadas):
- `src/mocks/users.ts` — `MOCK_USERS: PublicUser[]`; `CURRENT_USER: MyProfile` (spread + `email`/`role`).
- `src/mocks/matches.ts` — seeds sem os 3 campos calculados + `toMatchDetail()` que deriva
  `organizerId`/`confirmedCount`/`availableSlots` a partir de `organizer`/`participants` (mesma
  fórmula que o backend usa no servidor, para não haver dois lugares divergentes calculando isso).
- `src/contexts/MatchesContext.tsx` — estado interno `MatchDetail[]`; `updateParticipation` agora
  recalcula `confirmedCount`/`availableSlots` (`withRecalculatedSlots`) sempre que a lista de
  participantes muda, em vez de deixar esses campos desatualizados.
- `src/contexts/AuthContext.tsx` — `user: MyProfile`; **efeito colateral positivo:** `register()`
  antes descartava o e-mail digitado (`_email`); agora guarda em `pendingEmail` e usa em
  `completeProfile`, então o e-mail do cadastro passa a aparecer de fato no perfil criado.
- `src/hooks/useMatchFilters.ts` — `getConfirmedCount`/`getAvailableSlots` removidos (eram
  recomputados a cada render); `applyFilters`/`useMatchFilters` leem `match.confirmedCount`/
  `match.availableSlots` direto, alinhado com "usar os campos calculados pelo servidor" (§2.2 do
  contrato).
- `src/hooks/useMatchParticipation.ts` — `Match`/`User` → `MatchDetail`/`PublicUser`.
- `src/components/MatchCard.tsx` — prop `match: MatchDetail`; usa `match.confirmedCount` em vez de
  chamar `getConfirmedCount` (import removido).
- `src/screens/CreateMatchScreen.tsx` — `newMatch: MatchDetail` monta os 3 campos calculados
  manualmente (organizador único, 1 confirmado no ato da criação).
- Testes: `src/components/__tests__/MatchCard.test.tsx` e
  `src/hooks/__tests__/useMatchFilters.test.ts` — mocks locais ajustados ao novo shape; o teste
  "Sem vagas" passou a setar `confirmedCount`/`availableSlots` direto em vez de inflar o array de
  `participants` (que não é mais o que o componente lê).

**Não precisaram de mudança** (tsc já resolvia certo por tipagem estrutural ou inferência via
hooks/contexts): `src/mocks/reports.ts`, `src/mocks/ratings.ts`, `src/mocks/messages.ts`,
`ReportsContext`, `RatingsContext`, `MessagesContext`, `MatchFiltersContext`, e todas as
`screens`/`components` que só recebem esses tipos por inferência (`PublicProfileScreen`,
`MyProfileScreen`, `MatchDetailScreen`, `ParticipantList`, `ReviewCard`, etc.).

### Validação

`npx tsc --noEmit` zero erros · `npm run lint` zero erros (após `eslint --fix` nos 11 arquivos
tocados, só CRLF→LF/formatação — dívida D4, pré-existente) · `npm run test` 181/181 passando (sem
regressão) · `npx expo export --platform web` gerou o bundle web sem erros (733 módulos).

### Estado ao final da sessão 20

- Branch `feat/api-contract-types`, criada a partir de `dev` (que já tinha o commit da URL de
  produção do backend). Ainda **não commitada** — código pronto e validado, falta só o commit.
- Fila da Fase 13 (`queue.md`): itens 1 e 2 (13.1) concluídos 🟢. Restam 14 itens (13.2–13.9).
- Próxima tarefa: item 3 da fila — `src/services/api/client.ts` (13.2, cliente HTTP tipado).
- Nenhum bug pendente — parada é limpa, entre tarefas. Ver "Checkpointer" no fechamento desta
  sessão (mensagem final) para o ponto exato de retomada.

---

## Sessão 21 — 2026-07-08

### Fase 13.2 — Camada de infraestrutura de API (itens 3–5 da fila)

Branch `feat/api-contract-types` (mesma da sessão 20, ainda não mergeada). Objetivo: construir a
infraestrutura de rede que todos os Contexts reais (13.4–13.8) vão consumir, sem tocar em nenhum
Context ainda — só a base.

**Item 3 — `src/services/api/client.ts`:**
- Wrapper de `fetch` tipado (`apiClient.get/post/patch/delete`), classe `ApiError extends Error`
  que faz parse do formato de erro real do backend (`{ detail: { code, message } }`), com
  fallback `{ code: "UNKNOWN_ERROR" }` se o corpo não seguir o contrato.
- `setAuthToken`/`getAuthToken` — token em memória; a persistência entre sessões é o item 5.
- Base URL lida de `process.env.EXPO_PUBLIC_API_URL` (fallback `http://localhost:8000`); criado
  `.env.example` na raiz (`.env` real já estava no `.gitignore`, nunca existiu no repo, então não
  havia nenhum arquivo documentando as variáveis esperadas até agora).
- 8 testes em `src/services/api/__tests__/client.test.ts` (mock de `globalThis.fetch`).

**Item 4 — `src/services/adapters/`:**
- Decisão de processo: em vez de confiar só no resumo do `backend-contract.md`, os schemas
  Pydantic reais foram lidos direto de `../back/app/schemas/*.py` para garantir paridade exata de
  campo a campo antes de escrever qualquer adapter.
- `types.ts` define as interfaces `Api*` em `snake_case` espelhando os schemas reais
  (`ApiPublicUser`, `ApiMyProfile`, `ApiParticipant`, `ApiMatchSummary`/`ApiMatchDetail`,
  `ApiMatchRef`, `ApiRating`, `ApiReport`, `ApiMessage`).
- Funções puras por entidade: `toPublicUser`/`toMyProfile` (`user.ts`),
  `toMatchSummary`/`toMatchDetail`/`toParticipant`/`toMatchRef` (`match.ts`), `toRating`/
  `toRatingPayload` (`rating.ts`, achata `RatingCriteria` para o `POST`), `toReport` (`report.ts`),
  `toMessage` (`message.ts`).
- **Duas decisões de conversão registradas como dívida técnica (D20/D21 em `queue.md`)** em vez de
  resolvidas de fato, porque a correção completa é escopo de sub-fases futuras:
  - `average_rating: null` (usuário sem avaliações) cai para `0` em `toPublicUser` — o tipo
    `PublicUser.averageRating` continua `number`, então o `null` real do backend fica mascarado
    até a 13.7 tratar isso na UI de verdade (D20).
  - Horário do backend vem com segundos (`"09:00:00"`) e é cortado para `"09:00"` em
    `toMatchSummary`, para casar com o formato dos mocks/telas — comportamento correto e
    definitivo, não é dívida.
  - `Message.createdAt`/`Rating.createdAt`/`Report.createdAt` recebem o ISO completo do servidor
    sem reformatar. `MessageBubble` hoje imprime `message.createdAt` bruto na tela (formato
    `"HH:mm"` do mock atual) — quando a 13.6 plugar mensagens reais, vai aparecer um ISO completo
    ali até alguém adicionar a formatação (D21).
- 17 testes novos em `src/services/adapters/__tests__/` (um arquivo por entidade).

**Item 5 — `expo-secure-store` + `src/services/storage/tokenStorage.ts`:**
- `npx expo install expo-secure-store` (registrou o config plugin em `app.json` automaticamente).
- `tokenStorage.ts` expõe `saveTokens`/`getAccessToken`/`getRefreshToken`/`clearTokens`/
  `restoreAuthToken`; `saveTokens`/`clearTokens`/`restoreAuthToken` já chamam `setAuthToken` do
  `client.ts` por dentro, então a `AuthContext` da 13.4 só vai precisar chamar essas funções nos
  momentos certos (login/refresh/logout/boot) sem repetir lógica de storage.
- **Decisão de plataforma:** `expo-secure-store` é um no-op em `react-native-web` — o binário web
  do pacote (`ExpoSecureStore.web.js`) exporta um objeto vazio, então qualquer chamada nativa
  falharia silenciosamente ou lançaria em runtime no browser. Confirmado lendo o código-fonte do
  pacote antes de decidir. Fallback: `sessionStorage` no web (limpa ao fechar a aba — aceitável
  para a demo acadêmica, registrado como D22 porque significa que o login não sobrevive a um
  fechar-e-abrir de aba no `npm run web`; no nativo via Expo Go/EAS o token vai para o
  keychain/keystore de verdade, sem essa limitação).
- 7 testes: `tokenStorage.test.ts` (branch nativo, mocka `expo-secure-store`) e
  `tokenStorage.web.test.ts` (branch web, muta `Platform.OS` diretamente — não mocka o módulo
  `react-native` inteiro, porque isso derruba o automock do Jest/RN e quebra com
  `TurboModuleRegistry`/`DevMenu not found`; `isWeb()` foi escrito como função, não `const` de
  módulo, justamente para dar para mutar `Platform.OS` em runtime de teste sem reset de módulo).

### Fase 13.3 — React Query (item 6 da fila)

- `npm install @tanstack/react-query` (`^5.101.2`).
- `src/services/queryClient.ts` — uma instância única (`retry: 1`, `staleTime: 60_000`).
- `src/services/queryKeys.ts` — convenção central de chaves (`me`, `matches(filters?)`,
  `match(matchId)`, `messages(matchId)`, `userRatings(userId)`, `reports`) para as sub-fases
  13.4–13.8 usarem sem reinventar o formato cada uma; tipada sobre `MatchFilters` já existente em
  `MatchFiltersContext.tsx`.
- `App.tsx` ganhou `<QueryClientProvider client={queryClient}>` envolvendo toda a árvore, por fora
  de `SafeAreaProvider` e de todos os Contexts mockados (nenhum deles consome React Query ainda —
  isso é só o terreno pronto, a migração real é 13.4+).
- Primeiro teste do componente raiz: `__tests__/App.test.tsx` (smoke — renderiza `<App />` sem
  lançar). Precisou de `jest.mock("../global.css", () => ({}))`, porque o Jest não sabe parsear
  `@tailwind` do CSS importado por efeito colateral em `App.tsx`.
- `src/services/__tests__/queryKeys.test.ts` — 4 testes cobrindo as 6 chaves.

### Validação

`npx tsc --noEmit` zero erros · `npm run lint` zero erros (auto-fix aplicado só nos arquivos
tocados, formatação — dívida D4, pré-existente) · `npm run test` 218/218 passando (era 181 no
início da sessão; +37 testes novos) · `npx expo export --platform web` gerou o bundle sem erros,
confirmado depois da mudança em `App.tsx` (componente raiz da árvore renderizada no `npm run web`).

### Estado ao final da sessão 21

- Branch `feat/api-contract-types`. 3 commits novos nesta sessão:
  `feat(api): adiciona cliente HTTP tipado para a API do backend`,
  `feat(api): adiciona camada de adapters snake_case -> camelCase`,
  `feat(auth): adiciona storage seguro de token com expo-secure-store`,
  `feat(api): instala e configura @tanstack/react-query`.
- Sub-fases 13.2 e 13.3 **inteiramente concluídas** (itens 3–6 da fila). Fase 13 em 6/16.
- Toda a infraestrutura de integração está pronta e testada: tipos (13.1), cliente HTTP, adapters,
  storage seguro de token, React Query. Nenhum Context real ainda consome nada disso — a partir
  daqui a fila entra em território de UI/produto (13.4, auth real).
- Próxima tarefa: item 7 da fila — adicionar campo de **idade** ao fluxo de cadastro (D15, abre a
  13.4). Pergunta em aberto ainda sem resposta do usuário: em qual tela o campo entra —
  `RegisterScreen` (junto de nome/email/senha) ou `ProfileSetupScreen` (junto de esportes/nível/
  localização)? Decidir isso é o primeiro passo da próxima sessão, antes de tocar em qualquer tela.
- Nenhum bug pendente — parada é limpa, entre tarefas. Ver "Checkpointer" no fechamento desta
  sessão (mensagem final) para o ponto exato de retomada.

---

## Sessão 22 — 2026-07-08

### Fase 13.4 — Campo de idade no cadastro (item 7 da fila, D15)

Branch `feat/api-contract-types` (mesma das sessões 20–21). Decisão do usuário no início da
sessão: o campo de idade entra em `RegisterScreen`, não em `ProfileSetupScreen`.

**Achado ao abrir `RegisterScreen.tsx`:** já existia um campo "Data de nascimento" (`DD/MM/AAAA`,
texto livre) — mas era validado (`birthDateError`) e depois **descartado**: nunca era passado para
`register(name, email, password)`.

**Primeira implementação (revisada ainda na mesma sessão):** o campo foi trocado por "Idade"
(numérico, valida inteiro > 0 — mesmo critério `gt=0` do schema do backend). Funcionou, tinha
testes, `tsc`/lint/build todos verdes — mas o usuário corrigiu o approach antes de seguir: **o
usuário deveria informar a data de nascimento, e o app calcula a idade**, com uma regra de negócio
de **18+ obrigatório** (não é só satisfazer o `int > 0` do backend — é uma decisão de segurança do
produto, já que o app conecta pessoas para jogar com desconhecidos).

**Implementação final:**
- `src/utils/date.ts` ganhou duas funções novas: `parseBirthDate(input): Date | null` (aceita só
  `DD/MM/AAAA`, valida que a data existe de fato no calendário — rejeita `31/02`, `29/02` em ano
  não bissexto etc. — via reconstrução com `Date` e comparação de dia/mês/ano) e
  `calculateAge(birthDate, referenceDate = new Date()): number` (idade em anos completos,
  considerando se o aniversário já ocorreu no ano de referência).
- `RegisterScreen.tsx` voltou a usar "Data de nascimento" (mesmo campo/placeholder/ícone de antes),
  mas agora de verdade: `handleRegister` faz `parseBirthDate` → se inválida, erro de formato; se
  válida, `calculateAge` → se `< MINIMUM_AGE` (18), erro "Você precisa ter pelo menos 18 anos para
  se cadastrar"; só então chama `register(name, email, password, age)` com a idade **computada**,
  nunca digitada.
- `AuthContext.tsx`: `register()` ganhou o 4º parâmetro `age: number`; novo estado `pendingAge`
  (default `0`), consumido por `completeProfile` no lugar do `age: 25` hardcoded, resetado em
  `completeProfile`/`logout` junto com `pendingName`/`pendingEmail`. Essa parte não mudou entre a
  primeira tentativa e a versão final — só a origem do número (`age`) mudou, de input direto para
  cálculo derivado.
- **Cobertura de teste** (nem `RegisterScreen`, `AuthContext` nem `date.ts` tinham teste antes
  desta sessão): `src/utils/__tests__/date.test.ts` (10 testes — `parseBirthDate` com formatos
  válidos/inválidos/datas inexistentes/ano bissexto; `calculateAge` com referência antes/depois/no
  dia do aniversário, e com o default `new Date()`); `src/screens/__tests__/RegisterScreen.test.tsx`
  (6 testes — campo de data, erro de vazio/formato inválido/menor de 18, `register` chamado com a
  idade calculada, navegação); `src/contexts/__tests__/AuthContext.test.tsx` (3 testes via
  `renderHook` — `register` guarda estado pendente sem autenticar, `completeProfile` usa a idade do
  `register` em vez de hardcodar 25 — nomeada explicitamente "regressão D15" no teste — e `logout`
  limpa tudo).
- D15 marcada como resolvida em `queue.md`.

### Validação

`npx tsc --noEmit` zero erros · `npm run lint` zero erros (auto-fix nos arquivos tocados,
formatação — D4) · `npm run test` 238/238 passando (era 218 no início da sessão; +20 testes novos) ·
`npx expo export --platform web` gerou o bundle sem erros.

### Estado ao final da sessão 22

- Branch `feat/api-contract-types`. Mudanças desta sessão ainda **não commitadas** — código
  pronto e validado, falta só o commit (próximo passo antes de seguir para o item 8).
- Item 7 da fila concluído. Fase 13 em 7/16. Próxima tarefa: item 8 — reescrever `AuthContext` por
  dentro para chamar `POST /auth/register` → `POST /auth/login` em sequência, salvar tokens no
  storage seguro (13.2), interceptor de refresh em 401, tela de boot via `GET /auth/me`. É o
  grosso da 13.4 e a primeira vez que um Context real vai consumir `client.ts`/`tokenStorage.ts`.
- Nenhum bug pendente — parada é limpa, entre tarefas. Ver "Checkpointer" no fechamento desta
  sessão (mensagem final) para o ponto exato de retomada.

---

## Sessão 23 — 2026-07-10

### Fase 13.4 — `AuthContext` real (item 8 da fila, conclui a 13.4)

Branch `feat/auth-real`, criada a partir de `dev` (que já tinha o merge de `feat/api-contract-types`
das sessões 20–22 via PR #3). Objetivo: reescrever `AuthContext` por dentro para consumir a API real
do backend, mantendo a assinatura pública (`login`, `register`, `completeProfile`, `logout`) para não
alterar as telas de novo — só ganharam tratamento de loading/erro assíncrono, que antes não existia
(o mock nunca falhava).

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `src/services/api/auth.ts` | `registerRequest`, `loginRequest`, `refreshRequest`, `logoutRequest` — wrappers finos sobre `apiClient` para os 4 endpoints de `/auth/*` usados nesta sub-fase |
| `src/services/api/users.ts` | `fetchMyProfile` (`GET /users/me`), `updateMyProfile` (`PATCH /users/me`) |

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `src/services/api/client.ts` | Interceptor de refresh em 401: `setUnauthorizedHandler(fn)` — setter registrado pelo `AuthContext` no boot; um 401 fora de `/auth/{login,register,refresh,logout}` tenta `fn()` e repete a chamada original uma vez se um novo token voltar |
| `src/contexts/AuthContext.tsx` | Reescrito por dentro — ver decisões abaixo. Novo campo `isBooting` na interface pública |
| `src/navigation/RootNavigator.tsx` | `BootScreen` (spinner em `bg-secondary-900`) renderizado enquanto `isBooting`, antes de decidir entre `AuthNavigator`/`AppNavigator` |
| `src/screens/LoginScreen.tsx` | `handleLogin` assíncrono; `ApiError` capturado e exibido no campo de senha |
| `src/screens/ProfileSetupScreen.tsx` | `submitProfile` assíncrono (usado por "Concluir configuração" e "Pular por agora"); `ApiError`/erro genérico exibido acima do botão; prop `loading` nos dois botões |
| `src/contexts/__tests__/AuthContext.test.tsx` | Reescrito — 10 testes (era 3), mockando `fetch`/`expo-secure-store` (não os módulos de serviço), mesmo padrão de `client.test.ts`/`tokenStorage.test.ts` |

`src/screens/RegisterScreen.tsx` **não precisou mudar** — já passava `password` como 3º argumento
para `register()`; só o `AuthContext` por trás passou a de fato guardá-lo.

### Decisões não óbvias

- **Boot usa `GET /users/me`, não `GET /auth/me`** (diverge do texto original do roadmap/
  `backend-contract.md`): `/auth/me` devolve `UserRead`, que **não tem** `average_rating`/
  `matches_played` — só `/users/me` devolve o `MyProfileRead` completo, que bate 1:1 com o tipo
  `MyProfile` do front. Usar `/auth/me` exigiria mascarar esses dois campos com `0` só para o boot
  fechar o tipo, empurrando um perfil incompleto pro resto do app. `/users/me` já faz a checagem de
  token via `get_current_user` internamente, então cobre o mesmo caso de uso de "boot check" com um
  dado melhor — mesma decisão de fundo que já gerou a D20 na sessão 21 (não mascarar dado real com
  placeholder quando dá para evitar).
- **`POST /auth/register` só é disparado dentro de `completeProfile`, não em `register()`** — o
  backend exige `location` no payload (`RegisterRequest.location`, `min_length=1`), e `location` só
  é coletado na tela seguinte (`ProfileSetupScreen`). `register()` continua 100% síncrono e local
  (guarda nome/e-mail/senha/idade como pending, como já fazia); a sequência real de rede —
  `POST /auth/register` → `POST /auth/login` → `PATCH /users/me` — só acontece dentro de
  `completeProfile`, quando todos os campos obrigatórios finalmente existem juntos.
- **`level` não existe no `RegisterRequest` do backend** (`app/schemas/auth.py` — só
  `name/email/password/age/location/bio/favorite_sports`; o model `User` sempre nasce com
  `level: BEGINNER` por default). `completeProfile` faz um `PATCH /users/me` logo após o login para
  gravar o nível escolhido em `ProfileSetupScreen` — e a resposta desse PATCH já é o `MyProfileRead`
  completo, evitando um `GET /users/me` extra só para essa autenticação.
- **Interceptor de refresh sem import circular:** `client.ts` não importa `tokenStorage.ts` (que por
  sua vez importa `setAuthToken` de `client.ts`). Em vez disso, `client.ts` expõe
  `setUnauthorizedHandler(fn)`, e é o `AuthContext` (que já conhece os dois módulos) quem registra a
  função de refresh no boot — o cliente HTTP só delega a decisão de "tentar renovar", nunca conhece
  storage de token diretamente.
- **Bug encontrado e corrigido na própria sessão:** `/auth/logout` não estava na lista de paths sem
  retry (`AUTH_PATHS_WITHOUT_RETRY`). Um 401 em `POST /auth/logout` — cenário plausível, já que
  logout manda o refresh token e ele pode já estar expirado/revogado — disparava uma tentativa extra
  e inútil de `POST /auth/refresh` com esse mesmo refresh token inválido antes de desistir. Corrigido
  adicionando `/auth/logout` ao set. Confirmado com teste dedicado (`toHaveBeenCalledTimes(1)`) que
  falha sem a correção (2 chamadas) e passa com ela.

### Validação

`npx tsc --noEmit` zero erros · `npm run lint` zero erros (auto-fix nos arquivos tocados,
formatação CRLF→LF — dívida D4, pré-existente) · `npm run test` 245/245 passando (era 238 no início
da sessão; +7 testes líquidos: 10 novos em `AuthContext.test.tsx` substituindo os 3 antigos).

### Estado ao final da sessão 23

- Branch `feat/auth-real`, criada a partir de `dev`. Commit pendente (ver seção de commit desta
  mesma sessão de fechamento).
- Item 8 da fila concluído — **Fase 13.4 (Auth real) inteiramente concluída** (itens 7 e 8). Fase 13
  em 8/16.
- Próxima tarefa: item 9 da fila — `MatchesContext`/`MatchFiltersContext` → React Query contra
  `GET /matches`; adicionar filtros de **data** e **localização** (D18). Atenção: a listagem hoje é
  tipada como `MatchDetail` (decisão D19, sessão 20) mas `GET /matches` real devolve `MatchSummary`
  (sem `organizer`/`participants` expandidos) — a busca por nome do organizador em
  `HomeScreen`/`useMatchFilters.applyFilters` vai quebrar em runtime se não for resolvida primeiro
  (remover a busca por organizador da lista, ou pedir ao backend um campo `organizer_name` leve).
- Nenhum bug pendente — parada é limpa, entre tarefas. Ver "Checkpointer" no fechamento desta sessão
  (mensagem final) para o ponto exato de retomada.

---

## Sessão 24 — 2026-07-13

### Fase 13.5 — Matches reais (itens 9–12 da fila, conclui a 13.5)

Branch `feat/matches-real`, criada a partir de `dev`. Os itens 9–12 foram implementados juntos,
numa única sessão — a D19 (registrada na sessão 20) já previa que separá-los era inviável: assim
que `MatchesContext` passasse a devolver `MatchSummary` real (sem `organizer`/`participants`),
toda tela que lia esses campos a partir da listagem quebraria em runtime sem erro de tipo. Item 9
sozinho não tinha como ficar "meio pronto" sem deixar o app num estado inconsistente.

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `src/services/api/matches.ts` | `fetchMatches(filters)` (`GET /matches` com query string `sport/level/date/location/has_open_slots`), `fetchMatchDetail(id)` (`GET /matches/{id}`), `createMatch(payload)` (`POST /matches`), `joinMatch`/`leaveMatch`/`closeMatch`/`approveParticipant` (ações de partida) |
| `src/hooks/useMatchDetail.ts` | Hook compartilhado — `useQuery` contra `queryKeys.match(matchId)` retornando `MatchDetail` via `toMatchDetail(await fetchMatchDetail(matchId))`. Extraído de `useMatchParticipation` para ser reaproveitado por telas que só precisam ler o detalhe (sem participar) |
| `src/test-utils/queryClientWrapper.tsx` | `createTestQueryClient()`/`createQueryWrapper()` — primeiro helper de teste para React Query do projeto (`retry: false, staleTime: 0`), usado pelos testes novos de `useMatchParticipation` e `MatchDetailScreen` |

### Arquivos modificados (produção)

| Arquivo | Mudança |
|---------|---------|
| `src/contexts/MatchFiltersContext.tsx` | `MatchFilters` ganhou `date: string \| null` e `location: string \| null` (D18); `activeFilterCount` conta os dois novos campos |
| `src/contexts/MatchesContext.tsx` | Reescrito: `useQuery` contra `queryKeys.matches(filters)` chamando `fetchMatches` + `toMatchSummary`; lê `filters` via `useMatchFiltersContext()` internamente (deixou de receber prop) — exige que `MatchFiltersProvider` envolva `MatchesProvider`. `addMatch`/`updateParticipation` (client-side) removidos; expõe `matches: MatchSummary[]`, `isLoading`, `refetch`. Novo export `useInvalidateMatches()` (invalida `["matches"]` no `QueryClient`) |
| `App.tsx` | Reordenado: `MatchFiltersProvider` agora envolve `MatchesProvider` (antes era o contrário) |
| `src/hooks/useMatchFilters.ts` | `applyFilters` migrado para `MatchSummary`; busca por texto não checa mais `match.organizer.name` (D19) — só título e local |
| `src/hooks/useMatchParticipation.ts` | Reescrito sobre `useMatchDetail` + ações reais: `join`→`POST /matches/{id}/join`, `cancel`→`POST /matches/{id}/leave`, novo `close`→`POST /matches/{id}/close`, novo `approve(userId)`→`POST /matches/{id}/participants/{userId}/approve`. Todas invalidam `queryKeys.match(matchId)` e `["matches"]` após sucesso; falhas mostram `Alert.alert` |
| `src/components/MatchCard.tsx` | Prop `match` migrada para `MatchSummary`; footer de organizador (avatar + nome) removido — `MatchSummary` não tem esse campo |
| `src/components/ParticipantList.tsx` | Nova prop opcional `onApprove?: (userId: string) => void` — quando presente, cada participante `pending` ganha um botão "Aprovar" (some o `opacity-60`) |
| `src/screens/HomeScreen.tsx` | Removido o timer fake de loading (`setTimeout` de 700ms); `isLoading` agora vem de verdade do `useMatchesContext()` (React Query) |
| `src/screens/FiltersScreen.tsx` | Novos campos "Data" (`DD/MM/AAAA` com validação, convertido para ISO) e "Localização" (texto livre) |
| `src/screens/MatchDetailScreen.tsx` | `isLoading` tratado com tela própria; novo botão "Encerrar partida" (só quando `isOrganizer && !isMatchOver`); `ParticipantList` recebe `onApprove` só quando `isOrganizer` |
| `src/screens/CreateMatchScreen.tsx` | `handleSubmit` assíncrono chamando `createMatch()` de verdade (antes só montava um `MatchDetail` local e chamava `addMatch`); `useInvalidateMatches()` no sucesso; `isSubmitting`/`loading`/`disabled` no botão; `Alert` de erro em caso de falha de rede |
| `src/screens/MatchChatScreen.tsx`, `PostMatchRatingScreen.tsx`, `RateUserScreen.tsx` | Migradas de `useMatchesContext().matches.find(...)` (que devolvia `MatchDetail` do mock) para `useMatchDetail(matchId)` — essas telas leem `match.participants`, que só existe no detalhe, não na listagem |
| `src/screens/ReportUserScreen.tsx` | `userMatches` (picker de "partida relacionada") virou array vazio hardcoded — não há endpoint de "partidas em comum com userId" no backend (**D23**, nova). Também corrigido de passagem: `Date.now()`/`new Date()` chamados 2x dentro de `handleSubmit` viraram uma variável `now` única (lint novo `react-hooks/purity`, pré-existente, não introduzido nesta sessão — ver "Achado tangencial" abaixo) |

### Decisões não óbvias

- **`MatchFiltersProvider` agora precisa envolver `MatchesProvider`** (`App.tsx`): `MatchesContext`
  lê os filtros via `useMatchFiltersContext()` internamente em vez de receber como prop — mesmo
  padrão que `HomeScreen`/`SearchScreen` já usavam (dois hooks separados), só que agora dentro do
  próprio Context. Inverter a ordem dos providers foi mais simples que continuar passando `filters`
  como prop explícita.
- **D19 resolvida removendo a busca por organizador, não pedindo campo novo ao backend** — das duas
  opções que a D19 deixava em aberto (remover a busca vs. backend expor `organizer_name` leve),
  esta sessão escolheu a primeira: menos escopo, e o nome do organizador nunca foi um filtro
  citado no `vision.md` (só esporte/local/horário/nível).
  não foi solicitado ao usuário, mas justificável porque manter uma segunda chamada de API só para
  popular um campo de busca secundário adicionaria uma dependência de rede desnecessária ao filtro
  client-side.
- **`useMatchDetail` extraído como hook próprio**, não deixado só dentro de `useMatchParticipation`
  — quatro telas (`MatchChatScreen`, `PostMatchRatingScreen`, `RateUserScreen`,
  `MatchDetailScreen` via `useMatchParticipation`) precisavam do mesmo `GET /matches/{id}` mas só
  uma delas (`MatchDetailScreen`) precisa das ações de participação. Extrair evitou 4 cópias do
  mesmo `useQuery`.
- **D23 (nova):** `ReportUserScreen` perdeu a lista de "partidas em comum com o usuário denunciado"
  porque essa informação só existia porque o mock global trazia todos os participantes de toda
  partida em memória — não existe endpoint real equivalente. Registrada como dívida em vez de
  resolvida nesta sessão porque resolver de verdade provavelmente exige um endpoint novo no
  backend (fora do escopo do front) — decisão para a Fase 13.8, quando `ReportsContext` for
  migrado.

### Achado tangencial (não relacionado à Fase 13.5)

Rodar `npm install` nesta sessão (TypeScript não estava instalado localmente ainda) trouxe uma
versão mais nova de `eslint-plugin-react-hooks` que passou a aplicar a regra `react-hooks/purity`
("Cannot call impure function during render"). Ela acusou `Date.now()`/`new Date()` chamados duas
vezes dentro de `ReportUserScreen.handleSubmit` — código **pré-existente**, de antes desta sessão,
não causado por nenhuma mudança da Fase 13.5. Corrigido trivialmente (uma variável `now` capturada
uma vez) para manter `npm run lint` zerado, mas vale registrar que a causa é o upgrade de
dependência, não a integração de matches.

### Validação

`npx tsc --noEmit` zero erros · `npm run lint` zero erros (após corrigir o achado tangencial acima
e rodar `lint:fix` para CRLF→LF, dívida D4 pré-existente) · `npm run test` 239/239 passando (era
245 no início da sessão; saldo líquido negativo de 6 porque os testes de organizador em
`MatchCard.test.tsx`/`ReportUserScreen.test.tsx` — que dependiam de campos que não existem mais em
`MatchSummary` — foram removidos, não substituídos 1:1).

### Estado ao final da sessão 24

- Branch `feat/matches-real`, criada a partir de `dev`. Commit pendente (ver seção de commit desta
  mesma sessão de fechamento).
- Itens 9–12 da fila concluídos — **Fase 13.5 (Matches reais) inteiramente concluída**. Fase 13 em
  12/16.
- Nova dívida técnica: **D23** (`ReportUserScreen` sem picker de partida relacionada — falta
  endpoint no backend). D19 marcada como resolvida.
- Próxima tarefa: item 13 da fila — `MessagesContext` → React Query contra
  `GET/POST /matches/{id}/messages` (resolve D12 — timestamp de mensagem gerado no cliente),
  com paginação em `MatchChatScreen` (`skip`/`limit`, máx. 100 por página, backend já suporta).
- Nenhum bug pendente — parada é limpa, entre tarefas. Ver "Checkpointer" no fechamento desta sessão
  (mensagem final) para o ponto exato de retomada.

---

## Sessão 25 — 2026-07-13

### Fase 13.6 — Mensagens reais (item 13 da fila, conclui a 13.6)

Branch `feat/messages-real`, criada a partir de `dev`. Alinhamento prévio confirmado contra
`plano-de-entrega.md` (Trilha B, item 2) antes de iniciar — sem conflito, dentro do cronograma
aprovado ("Ago 2 – Set 2: mensagens/avaliações/denúncias").

Descoberta que mudou o desenho original da tarefa: o backend (`app/services/message_service.py`)
ordena `GET /matches/{id}/messages` em ordem **crescente** (`order_by(Message.created_at)`, mais
antiga primeiro) e não expõe contagem total de mensagens. Isso inviabiliza paginação reversa
clássica por `skip` decrescente (não dá para calcular o offset da "última página" sem saber o
total). Resolvido com `useInfiniteQuery` buscando sempre do início (`skip=0`) com um `limit`
crescente a cada "carregar mais" (30 → 60 → 90 → teto de 100 do backend) — troca eficiência de
rede por corretude, aceitável dado o volume esperado de mensagens por partida num protótipo
acadêmico.

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `src/services/api/messages.ts` | `fetchMessages(matchId, {skip, limit})` (`GET /matches/{id}/messages`), `postMessage(matchId, text)` (`POST /matches/{id}/messages`, envia só `{ text }` — timestamp gerado pelo servidor) |
| `src/hooks/useMessages.ts` | Substitui `MessagesContext` por completo. `useInfiniteQuery` contra `queryKeys.messages(matchId)` (limit crescente, ver acima) + `useMutation` para `sendMessage` (invalida a query no sucesso). Resultado já inverte a ordem para a `FlatList` invertida (`messages[0]` = mais recente) |
| `src/hooks/__tests__/useMessages.test.ts` | Cobre inversão de ordem, rota `GET`/`POST` corretas, payload só com `text`, e no-op ao enviar texto vazio/espaços |

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `src/screens/MatchChatScreen.tsx` | Troca `useMessagesContext()` por `useMessages(matchId)`; `FlatList` ganha `onEndReached`/`onEndReachedThreshold` (dispara `loadMore` ao rolar para o topo visual = histórico mais antigo, correto numa lista invertida) e `ListFooterComponent` com `ActivityIndicator` durante `isFetchingMore` |
| `src/utils/date.ts` | Novo `formatMessageTime(isoString)` — formata o `created_at` ISO do backend em `HH:mm` para exibição |
| `src/components/MessageBubble.tsx` | Passa a formatar `message.createdAt` (agora ISO completo, não mais `"HH:mm"` fixo do mock) via `formatMessageTime` — resolve **D21** |
| `src/components/__tests__/MessageBubble.test.tsx`, `src/utils/__tests__/date.test.ts` | Fixtures migradas de `"HH:mm"` fixo para ISO real; assert de horário passa a comparar contra `formatMessageTime(...)` em vez de string literal |
| `App.tsx` | `MessagesProvider` removido da árvore de providers (Context deletado) |

### Arquivos removidos

- `src/contexts/MessagesContext.tsx` — funcionalidade migrada integralmente para `useMessages`.
  `src/mocks/messages.ts` **mantido** (ainda não é o momento de remover mocks — `RatingsContext`/
  `ReportsContext` seguem mockados; a remoção de mocks é tarefa da 13.9, só depois que os 3
  Contexts restantes migrarem).

### Decisões não óbvias

- **Paginação por limit crescente, não por skip decrescente** — única forma correta de paginar
  "carregar mensagens mais antigas" sem um endpoint de contagem total. Documentado em comentário
  no próprio `useMessages.ts` para não parecer um bug na próxima leitura do código.
- **D12 resolvida por completo**: `sendMessage` não gera mais `createdAt` no cliente — o hook só
  envia `{ text }` e invalida a query, deixando o próximo fetch trazer o `created_at` real do
  servidor (em vez de otimisticamente inserir a mensagem local, que exigiria reconciliar o ID
  temporário depois — trade-off aceito: um pequeno delay perceptível entre enviar e ver a
  mensagem aparecer, contra simplicidade e corretude do timestamp).
- **D21 resolvida junto** (não estava no escopo original da 13.6, mas era o mesmo arquivo/mesmo
  motivo): `MessageBubble` já precisava lidar com ISO real por causa da migração, então formatar
  ali mesmo evitou deixar a dívida para depois.

### Validação

`npx tsc --noEmit` zero erros · `npm run lint` zero erros (após `lint:fix` para CRLF→LF, D4
pré-existente — nenhuma mudança de conteúdo real nos arquivos só normalizados, confirmado via
`git diff --ignore-space-at-eol`) · `npm run test` 245/245 passando (234 pré-existentes + 11
novos em `useMessages.test.ts`, líquido: suite cresceu, nada quebrou) · `npx expo export` (ver
seção de build desta sessão de fechamento).

### Estado ao final da sessão 25

- Branch `feat/messages-real`, criada a partir de `dev`. Commit feito nesta sessão de fechamento
  (ver histórico do git para o hash exato).
- Item 13 da fila concluído — **Fase 13.6 (Mensagens reais) inteiramente concluída**. Fase 13 em
  13/16.
- Dívidas D12 e D21 resolvidas. Nenhuma dívida nova identificada nesta sessão.
- Próxima tarefa: item 14 da fila — `RatingsContext` → React Query contra
  `POST /matches/{id}/ratings/{userId}` e `GET /users/{id}/ratings` (Fase 13.7), com adapter de
  achatamento de `RatingCriteria` e tratamento de `averageRating` nulo (D20).
- Nenhum bug pendente — parada é limpa, entre tarefas.
