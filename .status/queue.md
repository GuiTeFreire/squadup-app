# SquadUp — Fila de Tarefas Front-end

> **Plano de entrega final (app + backend + TCC):** ver [`plano-de-entrega.md`](plano-de-entrega.md) (2026-07-08) — cobre deploy do backend, Fase 13 de integração, build/demo do app, estrutura de assets do TCC e os gaps de conteúdo da monografia. Consultar antes de priorizar a próxima tarefa.

## Legenda
- ⚪ A fazer
- 🟡 Em andamento
- 🟢 Concluído
- 🔴 Bloqueado

---

## Fases concluídas (arquivadas em progress.md)

| Fase | Tarefas | Branch mergeada |
|------|---------|-----------------|
| Fase 1 — Estrutura inicial | 19/19 ✅ | `feat/project-setup` + `feat/design-system` → `dev` |
| Fase 2 — Fluxo de entrada | 8/8 ✅ | `feat/auth-flow` → `dev` |
| Refinamento visual | transversal ✅ | direto em `dev` (sessão 4 — 2026-05-25) |
| Fase 4 — Listagem e busca | 8/8 ✅ | `feat/home-matches` → `dev` (sessão 5 — 2026-05-25) |
| Fase 5 — Detalhes da partida | 6/6 ✅ | `feat/match-detail` → `dev` (sessão 6 — 2026-05-26) |
| Fase 3 — Perfil do usuário | 6/6 ✅ | `feat/user-profile` → `dev` (sessão 7 — 2026-05-26) |
| Fase 6 — Criação de partida | 5/5 ✅ | `feat/create-match` (sessão 8 — 2026-05-26) |
| Fase 7 — Participação em partida | 5/5 ✅ | `feat/match-participation` (sessão 9 — 2026-05-26) |
| Fase 8 — Chat da partida | 6/6 ✅ | `feat/match-chat` (sessão 10 — 2026-05-26) |
| Fase 9 — Avaliação pós-partida | 5/5 ✅ | `feat/post-match-rating` (sessão 11 — 2026-05-26) |
| Fase 10 — Denúncia e segurança | 5/5 ✅ | `feat/report-user` (sessão 12 — 2026-05-26) |
| Fase 11 — Moderação | 3/3 ✅ | `feat/moderation` (sessão 13 — 2026-07-02) |

---

Detalhes tarefa-a-tarefa das fases concluídas (Fases 1–11) foram movidos para [`progress.md`](progress.md), organizados por sessão.

---

## FASE 12 — Revisão e polimento final (6/8 concluídas — detalhes tarefa-a-tarefa em `progress.md`, sessões 15 e 17)

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 12.3 | Testar no Expo Go em iOS e Android | ⚪ | Dispositivo físico ou emulador — requer o usuário, não disponível no sandbox |
| 12.8 | Preparar build de apresentação (`expo build` ou EAS Build) | ⚪ | Verificar sem erros |

Concluídas: 12.1 (consistência visual, sessão 15) · 12.2 (fluxo completo, sessão 17) · 12.4 (acessibilidade, sessão 17) · 12.5 (lint/tsc, sessão 17) · 12.6 (testes, sessão 17) · 12.7 (coerência dos mocks, sessão 17).

---

## Dívidas técnicas

| # | Item | Prioridade | Descrição |
|---|------|-----------|-----------|
| D1 | jest versão | ~~Média~~ **Resolvida** | Downgrade para `jest@29` + instalação direta de `babel-preset-expo`. 52 testes passando. |
| D2 | react-test-renderer | Baixa | Fixado em `19.1.0`; atualizar junto com `react` quando necessário. |
| D3 | react-native-screens | Baixa | Pinado em `~4.16.0` (SDK 54); verificar ao fazer upgrade de Expo SDK. |
| D4 | Line endings CRLF | Baixa | Windows gera CRLF; Prettier exige LF. Solução atual: `npm run lint:fix` ao final de cada sessão. Solução definitiva: adicionar `.editorconfig` com `end_of_line = lf`. |
| D5 | HomeScreen placeholder | ~~Média~~ **Resolvida** | Substituído na Fase 4 (sessão 5). |
| D6 | AppNavigator incompleto | ~~Média~~ **Resolvida** | 4 abas com ícones vetoriais criadas na Fase 4 (sessão 5). |
| D7 | expo-asset não instalado | Baixa | `@expo/vector-icons` depende de `expo-asset` em runtime, mas no Jest é mockado via `moduleNameMapper`. Se adicionar novos pacotes Expo que também dependam de `expo-asset`, instalar: `npx expo install expo-asset`. |
| D8 | Participação em partida local apenas | Média | `MatchDetailScreen.handleJoin` / `handleCancel` alteram só `useState` interno — mudança não persiste ao navegar. Fase 7 eleva para `MatchesContext` via `useMatchParticipation`. |
| D9 | `RateUserScreen.tsx:78` — `user` possivelmente `undefined` (tsc) | ~~Baixa~~ **Resolvida** | Causa: narrowing de `if (!match \|\| !user) return` no corpo do componente não se propaga para dentro do closure `handleSubmit` (limitação conhecida do TS com controle de fluxo em funções aninhadas). Corrigido repetindo o guard `if (!user) return;` no início de `handleSubmit`. `npx tsc --noEmit` limpo, lint zerado, 181/181 testes passando (sessão 14). |
| D10 | NativeWind v4 não suporta `contentContainerClassName` | Baixa | Vários `ScrollView`/`FlatList` usam `contentContainerStyle={{ padding, gap, ... }}` em pixels em vez de classes Tailwind, porque a versão instalada do NativeWind (`^4.2.4`) não expõe essa prop (verificado em `node_modules/nativewind` na sessão 15). Reavaliar ao atualizar o NativeWind — se a prop passar a existir, migrar esses blocos para `className`. |
| D11 | `Alert.alert` não renderiza em `react-native-web` | Baixa | Sem polyfill instalado, `Alert.alert(...)` em `RateUserScreen`, `ReportUserScreen`, `ReportDetailScreen` e no cancelamento de `MatchDetailScreen` não produz diálogo no browser — a ação de dados ocorre normalmente, mas o callback do botão "OK" (que costuma fazer `navigation.goBack()`) nunca dispara, deixando o usuário sem feedback visual. Funciona normalmente em Expo Go/iOS/Android nativo (a confirmar na 12.3). Só relevante se a apresentação acadêmica usar `npm run web` em vez de dispositivo/emulador — nesse caso, avaliar um polyfill de `Alert` (ex.: `react-native-web` community package) antes da entrega. Descoberto na sessão 17. |
| D12 | Timestamp de mensagem do chat usa hora real | Baixa | `MessagesContext.sendMessage` (`src/contexts/MessagesContext.tsx`) grava `createdAt: new Date().toLocaleTimeString(...)` para mensagens novas, enquanto o histórico mockado em `src/mocks/messages.ts` usa horários fictícios fixos — uma mensagem enviada durante a demo pode aparecer com horário "menor" que mensagens antigas da conversa, quebrando a ordem cronológica visual. Cosmético; considerar mockar um relógio fixo ou aceitar como comportamento esperado de protótipo. Descoberto na sessão 17. |
| D13 | Selo de verificado sem texto alternativo para leitor de tela | Baixa | O ícone `check-decagram` (usuário verificado) aparece sozinho, sem `accessibilityLabel`, em `ParticipantList.tsx`, `MatchDetailScreen.tsx`, `PublicProfileScreen.tsx`, `MyProfileScreen.tsx`, `RateUserScreen.tsx` e `PostMatchRatingScreen.tsx` — leitores de tela não anunciam essa informação. Nice-to-have, não bloqueante para a apresentação. Descoberto na auditoria de acessibilidade da sessão 17 (12.4). |
| D14 | `ReportsContext.updateReportStatus` manda status-alvo, backend espera ação | Média | Backend (`PATCH /reports/{id}`) espera `{ action: "archive"\|"warn"\|"ban" }`; front manda `ReportStatus` direto. Único ponto de **quebra de contrato real** (não é só nomenclatura) encontrado na comparação com `../back`. Ver `.status/backend-contract.md` §2.6. Corrigir antes de plugar a API real de denúncias. |
| D15 | Cadastro de usuário não coleta `age`, campo obrigatório no backend | Média | `POST /auth/register` exige `age: int` (`gt=0`); nem `RegisterScreen` nem `ProfileSetupScreen` coletam idade hoje — `AuthContext.completeProfile` hardcoda `age: 25`. Ver `.status/backend-contract.md` §2.7. |
| D16 | `types.Match` único vs `MatchRead`/`MatchDetailRead` separados no backend | Média | Backend só expande `organizer`/`participants` no endpoint de detalhe; a listagem (`GET /matches`) devolve `organizer_id` e `confirmed_count`/`available_slots` prontos, sem array de participantes. Código que hoje lê `match.participants`/`match.organizer.name` a partir de uma lista vai quebrar silenciosamente ao trocar o mock pela API. Ver `.status/backend-contract.md` §2.2 para o plano de split em `MatchSummary`/`MatchDetail`. |
| D17 | Faltam ações de organizador: encerrar partida e aprovar participante pendente | Baixa | Backend já expõe `POST /matches/{id}/close` e `POST /matches/{id}/participants/{user_id}/approve`, mas não há UI para nenhuma das duas — `MatchDetailScreen`/`ParticipantList` só exibem, não moderam. Bloqueia o fluxo real de avaliação pós-partida (exige partida `closed`). Ver `.status/backend-contract.md` §2.2. |
| D18 | Filtros de partida não cobrem `date`/`location`, que o backend já suporta | Baixa | `GET /matches` aceita `date` e `location` como query params; `FiltersScreen`/`MatchFiltersContext` só implementam `sport`/`level`/`onlyAvailable`. Também é escopo original do `vision.md` (filtro por localização). Ver `.status/backend-contract.md` §4. |

---

## Paridade de contrato com o backend (`../back`)

Comparação completa de models/schemas/routers do backend real (FastAPI + SQLModel, já com
auth JWT, matches, mensagens, ratings e reports persistidos) contra os tipos/mocks do front
está documentada em **`.status/backend-contract.md`** (sessão 18, 2026-07-08). Resumo:
enums têm paridade total dos dois lados; maior risco é `Match` único no front vs duas shapes
no backend (D16); único contrato genuinamente quebrado é a ação de moderação de denúncia
(D14). Consultar esse documento antes de iniciar qualquer integração real com a API.

---

## Fila de integração — Fase 13 (`.status/roadmap.md` §19, sessão 19 — 2026-07-08)

> Plano mestre completo, decisões de arquitetura (D-A a D-D) e por que cada item existe estão
> em `.status/backend-contract.md` §6. Esta fila só lista o "o quê"; o "por quê" fica lá para
> não duplicar manutenção. **Pré-requisito:** Etapa 1 do plano mestre no backend
> (`../back/.status/roadmap.md`, Fase 12) — **✅ concluída em 2026-07-08** (D-B/D-C/D-D
> aplicadas, CORS de produção, hospedagem decidida, purge de refresh tokens e
> `POST /auth/logout-all` implementados — ver `.status/backend-contract.md` para o detalhe
> atualizado). **A fila abaixo pode começar agora**, o contrato já está estável.

| # | Tarefa | Sub-fase | Status |
|---|--------|----------|--------|
| 1 | Dividir `types.User` em `PublicUser`/`MyProfile`; dividir `types.Match` em `MatchSummary`/`MatchDetail` | 13.1 | ⚪ |
| 2 | Ajustar `Rating`/`Report` aos shapes reais (`rater`, `match_id`) conforme decisão D-B/D-C do backend | 13.1 | ⚪ |
| 3 | Criar `src/services/api/client.ts` (fetch tipado + parse de erro `{code,message}` + Bearer) | 13.2 | ⚪ |
| 4 | Criar `src/services/adapters/` (conversão `snake_case↔camelCase`, achatamento de `RatingCriteria`) | 13.2 | ⚪ |
| 5 | Instalar `expo-secure-store` e criar módulo de storage seguro de token | 13.2 | ⚪ |
| 6 | Instalar e configurar `@tanstack/react-query` (`QueryClientProvider` em `App.tsx`) | 13.3 | ⚪ |
| 7 | Adicionar campo de **idade** ao fluxo de cadastro (D15 — obrigatório no backend, sem input hoje) | 13.4 | ⚪ |
| 8 | Reescrever `AuthContext` por dentro (register→login em sequência, token no storage seguro, refresh automático em 401, boot via `GET /auth/me`) | 13.4 | ⚪ |
| 9 | `MatchesContext`/`MatchFiltersContext` → React Query contra `GET /matches`; adicionar filtros de **data** e **localização** (D18) | 13.5 | ⚪ |
| 10 | `MatchDetailScreen` busca `MatchDetail` sob demanda; `CreateMatchScreen` envia só o payload de criação | 13.5 | ⚪ |
| 11 | Botão "Encerrar partida" (organizador) chamando `POST /matches/{id}/close` (D17) | 13.5 | ⚪ |
| 12 | UI de aprovar participante pendente (organizador) chamando `.../participants/{userId}/approve` (D17) | 13.5 | ⚪ |
| 13 | `MessagesContext` → React Query; parar de gerar `createdAt` no cliente (resolve D12); paginação no `MatchChatScreen` | 13.6 | ⚪ |
| 14 | `RatingsContext` → React Query; adapter de achatamento de critérios; UI trata `averageRating` nulo | 13.7 | ⚪ |
| 15 | `ReportsContext.updateReportStatus` migrado para ação (`archive`/`warn`/`ban`) em vez de status-alvo (D14) | 13.8 | ⚪ |
| 16 | Teste manual ponta a ponta contra backend local; apontar `.env` para URL de produção (`https://squadup-api.up.railway.app`); ajustar texto do TCC (decisão D-A) | 13.9 | ⚪ |

---

## Bloqueadores e observações

- **Sessão 17 (2026-07-02):** Fase 12 avançou para 6/8 (12.2, 12.4, 12.5, 12.6 e 12.7 concluídas — 12.1 já vinha da sessão 15). Zero erros de console, `npm run lint`/`npx tsc --noEmit`/`npm run test` (181/181) zerados. Duas auditorias corrigiram problemas reais de acessibilidade (contraste de cor, label do card de partida) e de coerência dos dados mockados (avaliações datadas antes da partida acontecer). Três achados não bloqueantes viraram dívidas técnicas D11–D13 (ver tabela acima). Restam 12.3 (Expo Go — requer dispositivo/emulador do usuário) e 12.8 (build de apresentação). Detalhes tarefa-a-tarefa em `progress.md`, sessão 17.
- **Sessão 16 (2026-07-02):** redesign visual premium completo (transversal). Módulo `src/theme/index.ts` (`colors`, `shadows`, `SPORT_META`, `LEVEL_META`) é a fonte única de verdade para estilos fora do NativeWind — usar **sempre** em vez de hex hardcoded. Componentes novos: `SectionCard`, `Chip`, `SportTile`, `StatsRow`, `Skeleton`/`MatchCardSkeleton`. Emojis eliminados da UI (só permanecem em conteúdo de mensagens mockadas). Detalhes completos em `progress.md`, sessão 16.
- **Sessão 15 (2026-07-02):** `src/components/Header.tsx` foi reescrito e agora é usado por 13+ telas via `useSafeAreaInsets` — qualquer teste novo que renderize uma tela com `<Header>` precisa mockar `react-native-safe-area-context` (ver `Header.test.tsx`/`PublicProfileScreen.test.tsx` como referência). Detalhes completos em `progress.md`, sessão 15.
- `ReportsContext` (`src/contexts/ReportsContext.tsx`) expõe `reports`, `addReport`, `updateReportStatus`; seed em `src/mocks/reports.ts` (`MOCK_REPORTS`).
- `ReportUserScreen` agora chama `addReport` ao enviar a denúncia (status inicial `"pending"`), além do `Alert` existente.
- `Report` ganhou o campo `status: ReportStatus` (`"pending" | "archived" | "warned" | "banned"`); `ReportReason` foi realinhado aos motivos já usados na tela (`bad_behavior`, `hate_speech`, `fake_info` etc. — o tipo antigo nunca era usado de fato).
- `AdminDashboardScreen` é acessível via botão "Painel administrativo" (ghost) no fim do `MyProfileScreen` — rota oculta sem RBAC real, adequado ao escopo de protótipo.
- `ReportDetailScreen` tem 3 ações administrativas com `Alert` de confirmação antes de aplicar.
- `ReportUserScreen` recebe `{ userId: string }` via rota, filtra partidas do usuário via `useMatchesContext`, e envia Alert com goBack no OK.
- 7 motivos predefinidos como chips single-select; partida relacionada (opcional) com chips das partidas em que o usuário participou.

---

## Progresso geral

**Total de tarefas:** 70
**Concluídas:** 69 (fases numeradas + 12.1, 12.2, 12.4, 12.5, 12.6, 12.7) + refinamento visual transversal
**Em andamento:** 0
**A fazer:** 2 (Fase 12: 12.3 requer dispositivo/emulador do usuário; 12.8 build de apresentação)
