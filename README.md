# SquadUp — Front-end

Aplicativo mobile para conectar pessoas a partidas de esportes coletivos.
Protótipo navegável com dados mockados para apresentação acadêmica.

## Stack

- **React Native** 0.81.5 + **Expo** SDK 54
- **TypeScript** 5.9
- **NativeWind** v4 (Tailwind CSS para React Native)
- **React Navigation** v6 (Stack + Bottom Tabs)
- **@expo/vector-icons** — MaterialCommunityIcons para ícones vetoriais
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
├── contexts/     # Context API (AuthContext, MatchesContext, MatchFiltersContext, MessagesContext, RatingsContext, ReportsContext)
├── hooks/        # Hooks customizados (useMatchFilters, useMatchParticipation)
├── mocks/        # Dados mockados (users, matches, messages, ratings, reports)
├── navigation/   # Navigators (AuthNavigator, AppNavigator, RootNavigator)
├── screens/      # Telas da aplicação
├── theme/        # Fonte única de verdade para cores, sombras e metadados de esporte/nível fora do NativeWind
├── types/        # Tipos TypeScript globais
└── utils/        # Funções utilitárias (date, reportLabels)
__mocks__/        # Mocks Jest (expo-vector-icons)
```

## Fluxo de navegação atual

```
App
└── RootNavigator
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

## Autenticação (mock)

Não há backend. O `AuthContext` simula:

- **Login** — qualquer e-mail válido + senha ≥ 6 chars autentica como `Guilherme Freire`
- **Cadastro** → `RegisterScreen` → `ProfileSetupScreen` → cria novo perfil em memória
- **Logout** — disponível na `HomeScreen`

## Cabeçalho das telas

Todas as telas internas usam o componente compartilhado `src/components/Header.tsx`, que padroniza o cabeçalho escuro (`secondary-900`), o botão de voltar, o respiro de safe-area (`useSafeAreaInsets`) e variantes `compact`/`large` (a segunda usada pelas abas Home/Busca/Criar, que têm título grande e podem receber conteúdo extra como a barra de busca).

## Moderação (mock)

O `ReportsContext` guarda as denúncias em memória (seed em `src/mocks/reports.ts`). Qualquer denúncia enviada via `ReportUserScreen` entra na lista com status `pending`. O painel administrativo (`AdminDashboardScreen`, acessível pelo botão "Painel administrativo" em `MyProfileScreen` — rota oculta, sem RBAC real) permite arquivar, advertir ou banir a partir de `ReportDetailScreen`.

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

181 testes passando · lint zerado · tsc zerado · 69/70 tarefas concluídas (99%)

Ver [`.status/queue.md`](.status/queue.md) para a fila de tarefas e [`.status/progress.md`](.status/progress.md) para o histórico detalhado por sessão.
