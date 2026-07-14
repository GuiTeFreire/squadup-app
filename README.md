# SquadUp — Front-end

Aplicativo mobile para conectar pessoas a partidas de esportes coletivos.
Protótipo navegável com dados mockados para apresentação acadêmica.

## Stack

- **React Native** 0.81.5 + **Expo** SDK 54
- **TypeScript** 5.9
- **NativeWind** v4 (Tailwind CSS para React Native)
- **React Navigation** v6 (Stack + Bottom Tabs)
- **@expo/vector-icons** — MaterialCommunityIcons para ícones vetoriais
- **@tanstack/react-query** v5 — estado de servidor (auth, partidas, chat, avaliações e denúncias já consomem a API real; nenhum Context mockado restante)
- **expo-secure-store** — storage seguro de token (nativo; fallback `sessionStorage` no web)
- **Jest** + React Native Testing Library
- **ESLint** 9 (flat config) + **Prettier**

## Pré-requisitos

- Node.js >= 18
- npm >= 9
- Expo Go no dispositivo (iOS ou Android) **ou** emulador local

## Instalação

```bash
npm install
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor Expo |
| `npm run android` | Abre no emulador Android |
| `npm run ios` | Abre no simulador iOS (macOS) |
| `npm run test` | Executa a suíte de testes |
| `npm run lint` | Verifica erros de lint |
| `npm run lint:fix` | Corrige erros de lint automaticamente |

## Paleta de cores

| Token | Cor | Uso |
| --- | --- | --- |
| `primary` | `#2563EB` Electric Blue | CTAs, links, foco, elementos ativos |
| `secondary` | `#0F172A` Dark Slate | Header, tab bar, fundos escuros |
| `accent` | `#F97316` Orange | Badges de energia, destaques |

`src/theme/index.ts` é a fonte única de verdade para estilos consumidos fora do NativeWind (props `color` de ícones, sombras, estilos inline) — espelha `tailwind.config.js` e centraliza `colors`, `shadows` (4 presets de elevação), `SPORT_META` (ícone + cor por esporte) e `LEVEL_META` (labels de nível). Usar sempre esse módulo em vez de hex hardcoded.

## Estrutura de pastas

```
src/
├── components/   # Componentes reutilizáveis (Button, Input, Card, Avatar, MatchCard, ParticipantList,
│                 #   MessageBubble, StarRatingInput, SectionCard, Chip, SportTile, StatsRow, Skeleton…)
├── contexts/     # Context API (AuthContext, MatchesContext, MatchFiltersContext)
├── hooks/        # Hooks customizados (useMatchFilters, useMatchDetail, useMatchParticipation, useMessages, useRatings, useReports)
├── mocks/        # Dados mockados — mantidos como fixtures de teste (users, matches, messages, ratings, reports)
├── navigation/   # Navigators (AuthNavigator, AppNavigator, RootNavigator)
├── screens/      # Telas da aplicação
├── services/     # Infraestrutura de integração com o backend (Fase 13)
│                 #   api/client.ts — fetch tipado + ApiError + Bearer + interceptor de refresh em 401
│                 #   api/auth.ts, api/users.ts, api/matches.ts, api/messages.ts, api/ratings.ts,
│                 #   api/reports.ts — chamadas reais de /auth/*, /users/*, /matches/*,
│                 #   /matches/{id}/messages, /matches/{id}/ratings/{userId} · /users/{id}/ratings
│                 #   e /reports · /reports/{id}
│                 #   adapters/    — conversão snake_case↔camelCase por entidade
│                 #   storage/     — token seguro (expo-secure-store / sessionStorage no web)
│                 #   queryClient.ts, queryKeys.ts — React Query
├── test-utils/   # Helpers de teste (queryClientWrapper — QueryClientProvider de teste para hooks/telas com React Query)
├── theme/        # Fonte única de verdade para cores, sombras e metadados de esporte/nível fora do NativeWind
├── types/        # Tipos TypeScript globais — alinhados ao contrato do backend (PublicUser/MyProfile,
│                 #   MatchSummary/MatchDetail, MatchRef), ver .status/backend-contract.md
└── utils/        # Funções utilitárias (date, reportLabels)
__mocks__/        # Mocks Jest (expo-vector-icons)
__tests__/        # Testes do componente raiz (App.tsx)
```

## Fluxo de navegação atual

```
App
└── RootNavigator
    ├── BootScreen     (enquanto restaura sessão salva via GET /users/me)
    ├── AuthNavigator  (não autenticado)
    │   ├── WelcomeScreen
    │   ├── LoginScreen
    │   ├── RegisterScreen
    │   └── ProfileSetupScreen
    └── AppNavigator   (autenticado)
        ├── AppTabs (Bottom Tabs)
        │   ├── HomeScreen        ← lista de partidas + busca inline
        │   ├── SearchScreen      ← busca dedicada com filtros
        │   ├── CreateMatchScreen ← formulário completo de criação
        │   └── MyProfileScreen   ← perfil do usuário logado (+ acesso ao painel admin)
        ├── FiltersScreen (modal) ← esporte · nível · vagas disponíveis
        ├── MatchDetailScreen     ← detalhes + 5 estados de participação
        ├── MatchChatScreen       ← chat da partida
        ├── PublicProfileScreen   ← perfil público de outro usuário
        ├── EditProfileScreen     ← edição de perfil
        ├── ReportUserScreen      ← denúncia de usuário
        ├── PostMatchRatingScreen ← lista de participantes para avaliar
        ├── RateUserScreen        ← formulário de avaliação (5 critérios)
        ├── AdminDashboardScreen  ← painel de moderação (lista de denúncias)
        └── ReportDetailScreen    ← detalhes da denúncia + ações administrativas
```

## Autenticação (real desde a Fase 13.4)

O `AuthContext` consome a API real do backend (`../back`, FastAPI + JWT):

- **Login** → `POST /auth/login` + `GET /users/me`; token salvo via `expo-secure-store` (nativo) ou `sessionStorage` (web)
- **Cadastro** → `RegisterScreen` (nome/e-mail/senha/data de nascimento) → `ProfileSetupScreen` (esportes/nível/localização) → só então `POST /auth/register` → `POST /auth/login` → `PATCH /users/me` (grava o nível escolhido)
- **Boot** — ao abrir o app, `GET /users/me` com o token salvo restaura a sessão antes de decidir entre `AuthNavigator`/`AppNavigator` (`BootScreen`)
- **Refresh automático** — um 401 em qualquer chamada autenticada tenta `POST /auth/refresh` e repete a chamada original uma vez
- **Logout** — disponível na `HomeScreen`; chama `POST /auth/logout` com o refresh token antes de limpar o estado local

## Partidas (reais desde a Fase 13.5)

`MatchesContext`/`MatchFiltersContext` consomem `GET /matches` via React Query, com filtros de
esporte, nível, data, localização e "só com vagas" (todos como query params reais do backend).
A listagem devolve `MatchSummary` (sem organizador/participantes expandidos); `MatchDetailScreen`
busca o `MatchDetail` completo sob demanda via `GET /matches/{id}` (hook `useMatchDetail`,
reaproveitado por `MatchChatScreen`, `PostMatchRatingScreen` e `RateUserScreen`). Participação
(`join`/`leave`), criação de partida (`POST /matches`) e as ações de organizador — encerrar
partida e aprovar participante pendente — chamam os endpoints reais correspondentes.

## Chat da partida (real desde a Fase 13.6)

`MatchChatScreen` consome o hook `useMessages` (React Query) contra
`GET`/`POST /matches/{id}/messages`. O histórico é paginado — "carregar mais" busca com um
`limit` crescente a partir do início (o backend não expõe contagem total, então não há como
paginar por `skip` decrescente); enviar mensagem não gera timestamp no cliente, usa o
`created_at` devolvido pelo backend no próximo fetch.

## Avaliações pós-partida (reais desde a Fase 13.7)

O hook `useRatings` (`useUserRatings`, `useSubmitRating`, `useHasRatedMap`) substitui o antigo
`RatingsContext` contra `GET /users/{id}/ratings` e `POST /matches/{id}/ratings/{userId}`.
`PostMatchRatingScreen` usa `useHasRatedMap` para checar, de uma vez, quais participantes o
usuário logado já avaliou naquela partida; `RateUserScreen` envia a avaliação e invalida o cache
da avaliação recebida pelo usuário-alvo. Usuários sem avaliações ainda mostram "Sem avaliações"
em vez de "0.0" (`averageRating: number | null`, `RatingStars`/`TrustBadges` tratam o caso nulo).

## Cabeçalho das telas

Todas as telas internas usam o componente compartilhado `src/components/Header.tsx`, que padroniza o cabeçalho escuro (`secondary-900`), o botão de voltar, o respiro de safe-area (`useSafeAreaInsets`) e variantes `compact`/`large` (a segunda usada pelas abas Home/Busca/Criar, que têm título grande e podem receber conteúdo extra como a barra de busca).

## Denúncias e moderação (reais desde a Fase 13.8)

O hook `useReports` (`useReports`, `useCreateReport`, `useUpdateReportAction`) substitui o antigo
`ReportsContext` contra `GET /reports`, `POST /reports` e `PATCH /reports/{id}`. Qualquer denúncia
enviada via `ReportUserScreen` entra na lista com status `pending` (reporter vem do JWT, não do
payload). O painel administrativo (`AdminDashboardScreen`, acessível pelo botão "Painel
administrativo" em `MyProfileScreen` — rota oculta, sem RBAC real) permite arquivar, advertir ou
banir a partir de `ReportDetailScreen`, enviando a ação real (`archive`/`warn`/`ban`) esperada pelo
backend.

## Status do projeto

| Fase | Descrição | Status |
| --- | --- | --- |
| 1 | Estrutura e design system | ✅ Concluída |
| 2 | Fluxo de autenticação | ✅ Concluída |
| — | Refinamento visual (Electric Blue + Dark Slate) | ✅ Concluído |
| 4 | Listagem e busca de partidas | ✅ Concluída |
| 5 | Detalhes da partida | ✅ Concluída |
| 3 | Perfil do usuário | ✅ Concluída |
| 6 | Criação de partida | ✅ Concluída |
| 7 | Participação em partida | ✅ Concluída |
| 8 | Chat da partida | ✅ Concluída |
| 9 | Avaliação pós-partida | ✅ Concluída |
| 10 | Denúncia e segurança | ✅ Concluída |
| 11 | Moderação (opcional) | ✅ Concluída |
| 12 | Revisão e polimento final | 🟡 **Em andamento** (6/8 — restam apenas testes em Expo Go e build de apresentação) |
| 13 | Integração com o backend real | 🟡 **Em andamento** (15/16 — fundação, Auth real (13.4), Matches reais (13.5), Mensagens reais (13.6), Avaliações reais (13.7) e Denúncias reais (13.8) concluídas; backend já deployado em `https://squadup-api.up.railway.app`) |

256 testes passando · lint zerado · tsc zerado · 84/86 tarefas concluídas (98%)

Ver [`.status/queue.md`](.status/queue.md) para a fila de tarefas e [`.status/progress.md`](.status/progress.md) para o histórico detalhado por sessão.
