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
- **expo-location** — geolocalização real do dispositivo (`useDeviceLocation`, Fase 14.1)
- **expo-notifications** / **expo-device** / **expo-constants** — push notifications reais (`useNotificationRegistration`, Fase 14.2)
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

### Screenshots do app para o TCC

`scripts/capture-tcc-screenshots.ts` (Playwright) navega o app real via `npm run web` e salva
capturas em `tcc/assets/app/`. Pré-requisitos: `npm run web` rodando, um usuário de teste já
cadastrado no backend (`EXPO_PUBLIC_API_URL` do `.env` apontando para o backend certo) e a senha
desse usuário na variável `TCC_SCREENSHOT_PASSWORD`:

```bash
TCC_SCREENSHOT_PASSWORD="sua-senha" npx playwright test --config=scripts/playwright.config.ts
```

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
├── hooks/        # Hooks customizados (useMatchFilters, useMatchDetail, useMatchParticipation, useMessages, useRatings, useReports, useDeviceLocation, useNotificationRegistration)
├── mocks/        # Dados mockados — mantidos como fixtures de teste (users, matches, messages, ratings, reports)
├── navigation/   # Navigators (AuthNavigator, AppNavigator, RootNavigator) + navigationRef (navegação por push fora da árvore React)
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
        ├── FiltersScreen (modal) ← esporte · nível · data · localização · vagas · proximidade
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

## Geolocalização (real desde a Fase 14.1)

`CreateMatchScreen` usa o hook `useDeviceLocation` (`expo-location`) para capturar
`latitude`/`longitude` reais do dispositivo (`Location.Accuracy.Balanced`) e enviá-las junto do
payload de `POST /matches`, sempre que a permissão é concedida. O campo `location` (texto) segue
obrigatório; as coordenadas são só um extra — se o usuário negar a permissão ou o GPS falhar, a
partida é criada normalmente, sem coordenadas.

Busca por proximidade: `FiltersScreen` tem um toggle "Usar minha localização" (+ chips de raio
5/10/20/50 km, default 20) que propaga `lat`/`lng`/`radius_km` para `GET /matches` via
`MatchesContext` só quando ativo; `MatchCard` exibe a distância pronta devolvida pelo backend
(`distance_km`, ex.: "3,2 km") sem recalcular no cliente. Permissão negada não bloqueia a busca —
mostra um aviso e aplica os demais filtros sem coordenadas (mesmo princípio de fallback gracioso
da criação de partida).

## Notificações push (reais desde a Fase 14.2)

O hook `useNotificationRegistration` pede permissão, obtém o `ExpoPushToken` do dispositivo
(via `expo-notifications`/`expo-constants`, usando o `projectId` do EAS) e registra via
`POST /users/me/push-token` — chamado automaticamente pelo `AuthContext` sempre que o usuário
autentica (login, cadastro ou restauração de sessão no boot). Em simulador/emulador
(`Device.isDevice` falso) ou sem permissão, não faz nada, sem bloquear a navegação (D-Push-3).

Ao tocar numa notificação, `RootNavigator` (via `navigationRef.ts`, registrado uma única vez no
root do app) navega automaticamente: mensagem nova → `MatchChatScreen`; participação aprovada ou
partida encerrada → `MatchDetailScreen`. **Push remoto não funciona no Expo Go desde o SDK 53** —
validação real exige um development/preview build (`eas build`) instalado num dispositivo físico.

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
| 12 | Revisão e polimento final | 🟡 **Em andamento** (6/8 — `projectId` do EAS gerado, várias builds de apresentação já geradas e testadas em dispositivo real; resta o teste formal em Expo Go) |
| 13 | Integração com o backend real | 🟢 **Concluída (16/16)** — fundação, Auth real, Matches reais, Mensagens reais, Avaliações reais, Denúncias reais e hardening/teste ponta a ponta; backend já deployado em `https://squadup-api.up.railway.app` |
| 14 | Geolocalização real e notificações push | 🟡 **Em andamento (7/8)** — backend concluído (PR #50); front concluído: geolocalização (`useDeviceLocation`, filtro por proximidade) e push (`useNotificationRegistration`, navegação por notificação) ✅; hardening em dispositivo físico em andamento (item 8) — várias rodadas de teste real já corrigiram bugs de boot, teclado e cadastro (D28–D34) |

302 testes passando · lint zerado · tsc zerado · 85/86 tarefas do protótipo+integração concluídas (99%) · Fase 14: 7/8

Ver [`.status/queue.md`](.status/queue.md) para a fila de tarefas e [`.status/progress.md`](.status/progress.md) para o histórico detalhado por sessão.
