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
- Próxima ação: tarefa 12.2 — testar fluxo completo no app real (`npm start`), validando visualmente o redesign em runtime (especialmente sombras Android, skeleton da Home e safe areas)
