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
| Fase 13.1–13.3 — Fundação da integração (tipos, cliente HTTP, adapters, storage, React Query) | 6/6 ✅ | `feat/api-contract-types` (sessões 20–21) |
| Fase 13.4 — Auth real | 2/2 ✅ | `feat/api-contract-types` + `feat/auth-real` (sessões 22–23) |
| Fase 13.5 — Matches reais | 4/4 ✅ | `feat/matches-real` (sessão 24 — 2026-07-13) |
| Fase 13.6 — Mensagens reais | 1/1 ✅ | `feat/messages-real` (sessão 25 — 2026-07-13) |
| Fase 13.7 — Avaliações reais | 1/1 ✅ | `feat/ratings-real` (sessão 26 — 2026-07-13) |

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
| D12 | Timestamp de mensagem do chat usa hora real | ~~Baixa~~ **Resolvida** | Sessão 25 (Fase 13.6): `useMessages.sendMessage` não gera mais `createdAt` no cliente — envia só `{ text }` via `POST /matches/{id}/messages` e invalida a query, deixando o próximo `GET` trazer o `created_at` real gerado pelo servidor. |
| D13 | Selo de verificado sem texto alternativo para leitor de tela | Baixa | O ícone `check-decagram` (usuário verificado) aparece sozinho, sem `accessibilityLabel`, em `ParticipantList.tsx`, `MatchDetailScreen.tsx`, `PublicProfileScreen.tsx`, `MyProfileScreen.tsx`, `RateUserScreen.tsx` e `PostMatchRatingScreen.tsx` — leitores de tela não anunciam essa informação. Nice-to-have, não bloqueante para a apresentação. Descoberto na auditoria de acessibilidade da sessão 17 (12.4). |
| D14 | `ReportsContext.updateReportStatus` manda status-alvo, backend espera ação | Média | Backend (`PATCH /reports/{id}`) espera `{ action: "archive"\|"warn"\|"ban" }`; front manda `ReportStatus` direto. Único ponto de **quebra de contrato real** (não é só nomenclatura) encontrado na comparação com `../back`. Ver `.status/backend-contract.md` §2.6. Corrigir antes de plugar a API real de denúncias. |
| D15 | Cadastro de usuário não coleta `age`, campo obrigatório no backend | ~~Média~~ **Resolvida** | Sessão 22: o campo "Data de nascimento" de `RegisterScreen` (existia na UI, mas era validado e depois **descartado** — nunca chegava a `register()`) passou a ser usado de verdade: `src/utils/date.ts` ganhou `parseBirthDate`/`calculateAge`, e `RegisterScreen` calcula a idade a partir da data informada e **exige 18+** (`MINIMUM_AGE`) — decisão de produto do usuário (não só satisfazer o schema do backend, é regra de segurança do app: partidas com desconhecidos). `register()` ganhou o 4º parâmetro `age: number` (computado, não digitado); `AuthContext` guarda em `pendingAge` e `completeProfile` usa esse valor em vez do `age: 25` hardcoded. 17 testes novos (`RegisterScreen.test.tsx`, `AuthContext.test.tsx`, `utils/__tests__/date.test.ts`). Ver `.status/backend-contract.md` §2.7. |
| D16 | `types.Match` único vs `MatchRead`/`MatchDetailRead` separados no backend | Média | Backend só expande `organizer`/`participants` no endpoint de detalhe; a listagem (`GET /matches`) devolve `organizer_id` e `confirmed_count`/`available_slots` prontos, sem array de participantes. Código que hoje lê `match.participants`/`match.organizer.name` a partir de uma lista vai quebrar silenciosamente ao trocar o mock pela API. Ver `.status/backend-contract.md` §2.2 para o plano de split em `MatchSummary`/`MatchDetail`. |
| D17 | Faltam ações de organizador: encerrar partida e aprovar participante pendente | Baixa | Backend já expõe `POST /matches/{id}/close` e `POST /matches/{id}/participants/{user_id}/approve`, mas não há UI para nenhuma das duas — `MatchDetailScreen`/`ParticipantList` só exibem, não moderam. Bloqueia o fluxo real de avaliação pós-partida (exige partida `closed`). Ver `.status/backend-contract.md` §2.2. |
| D18 | Filtros de partida não cobrem `date`/`location`, que o backend já suporta | Baixa | `GET /matches` aceita `date` e `location` como query params; `FiltersScreen`/`MatchFiltersContext` só implementam `sport`/`level`/`onlyAvailable`. Também é escopo original do `vision.md` (filtro por localização). Ver `.status/backend-contract.md` §4. |
| D19 | `MatchesContext`/`useMatchFilters`/`MatchCard` tipados sobre `MatchDetail`, não `MatchSummary` | ~~Média~~ **Resolvida** | Resolvida na sessão 24 (Fase 13.5): `MatchesContext`/`MatchFiltersContext`/`useMatchFilters`/`MatchCard`/`HomeScreen`/`SearchScreen` migrados para `MatchSummary` real (`GET /matches`); a busca por nome do organizador foi removida de `useMatchFilters.applyFilters` (opção escolhida, em vez de pedir um campo `organizer_name` novo ao backend). `MatchDetailScreen` (que precisa de `organizer`/`participants` completos) passou a buscar `MatchDetail` sob demanda via `GET /matches/{id}` através do novo hook `useMatchDetail`. |
| D20 | `toPublicUser` (`src/services/adapters/user.ts`) transforma `average_rating: null` em `0` | ~~Média~~ **Resolvida** | Sessão 26 (Fase 13.7): `PublicUser.averageRating` virou `number \| null`; `toPublicUser` não mascara mais o `null` com `0`; `RatingStars` mostra "Sem avaliações" (em vez de "0.0") quando `rating` é `null`; `TrustBadges` omite o badge de nota nesse caso; `MyProfileScreen`/`PublicProfileScreen` mostram "—" no `StatsRow` para usuário sem avaliações. |
| D21 | `Message.createdAt`/`Rating.createdAt`/`Report.createdAt` (adapters) recebem o ISO completo do backend sem reformatar | ~~Baixa~~ **Parcialmente resolvida** | Sessão 25 (Fase 13.6): `MessageBubble.tsx` agora formata `message.createdAt` via `formatMessageTime` (novo, `src/utils/date.ts`) — o gap do chat está fechado. `Rating`/`Report` seguem sem mudança (já tratados na tela via `formatDate`/`formatReportDate`, fora do escopo desta sessão). |
| D22 | `tokenStorage` usa `sessionStorage` no web, que não sobrevive a fechar a aba | Baixa | `expo-secure-store` é um no-op em `react-native-web` (`ExpoSecureStore.web.js` exporta objeto vazio) — sem alternativa nativa de "storage seguro" real no browser. `src/services/storage/tokenStorage.ts` cai para `sessionStorage` nesse caso, o que é aceitável para a demo acadêmica (`npm run web`) mas significa que o usuário é deslogado ao fechar/reabrir a aba (diferente do nativo, onde o keychain/keystore persiste entre sessões do app). Sem ação necessária a menos que a apresentação dependa de sessão persistente no browser — se depender, considerar `localStorage` (persiste mais, mas é menos seguro ainda) como troca consciente. Descoberto na sessão 21 (item 5, 13.2). |
| D23 | `ReportUserScreen` perdeu o picker de "partida relacionada" ao migrar a listagem para `MatchSummary` | Baixa | A Fase 13.5 (sessão 24) trocou `MatchesContext` para consumir `GET /matches` real, que devolve `MatchSummary` (sem `participants`). `ReportUserScreen` usava `matches.filter(m => m.participants.some(...))` para achar partidas em comum com o usuário denunciado — não há endpoint no backend para "partidas em comum com o usuário X", então esse filtro virou um array vazio hardcoded (`userMatches: MatchRef[] = []`) até a Fase 13.8 (`ReportsContext` real) resolver isso de verdade — possivelmente precisando de um novo endpoint no backend. Efeito visual: a seção "Partida relacionada" nunca aparece mais em `ReportUserScreen`, mesmo quando o usuário e o denunciado jogaram juntos. Descoberto na sessão 24. |

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
> atualizado). Sub-fases 13.1–13.7 **concluídas** (sessões 20–26) — detalhe tarefa-a-tarefa
> arquivado em [`progress.md`](progress.md). A fila abaixo é o que resta.

| # | Tarefa | Sub-fase | Status |
|---|--------|----------|--------|
| 14 | `RatingsContext` → React Query; adapter de achatamento de critérios; UI trata `averageRating` nulo | 13.7 | 🟢 |
| 15 | `ReportsContext.updateReportStatus` migrado para ação (`archive`/`warn`/`ban`) em vez de status-alvo (D14) | 13.8 | ⚪ |
| 16 | Teste manual ponta a ponta contra backend local; apontar `.env` para URL de produção (`https://squadup-api.up.railway.app`); ajustar texto do TCC (decisão D-A) | 13.9 | ⚪ |

---

## Bloqueadores e observações

> Histórico detalhado por sessão (o "porquê" de cada decisão, trechos de código, achados de
> auditoria) vive em [`progress.md`](progress.md) — esta seção só guarda a observação mais
> recente, para servir de ponto de retomada rápido no início da próxima sessão.

- **Sessão 23 (2026-07-10):** Item 8 da fila concluído na branch `feat/auth-real` — `AuthContext` reescrito por dentro para consumir a API real (`login`/`register`/`completeProfile`/`logout` mantidos, assinatura pública intacta). **Fase 13.4 (Auth real) inteiramente concluída** (itens 7 e 8). Destaques: boot usa `GET /users/me` (não `/auth/me` — só o primeiro traz `average_rating`/`matches_played`); `POST /auth/register` só dispara dentro de `completeProfile` (backend exige `location`, coletado só na tela seguinte); interceptor de refresh em 401 via `setUnauthorizedHandler` em `client.ts`; um bug real foi encontrado e corrigido na própria sessão — `/auth/logout` não estava isento do retry, causando uma tentativa inútil de `/auth/refresh` num 401 de logout. Detalhe completo (decisões, arquivos, testes) em `progress.md`, sessão 23. Suíte 245/245, lint e `tsc --noEmit` zerados.
- **Sessão 24 (2026-07-13):** Itens 9–12 da fila concluídos juntos (interdependentes por causa da D19) — **Fase 13.5 (Matches reais) inteiramente concluída**. `MatchesContext`/`MatchFiltersContext` migrados para React Query contra `GET /matches`, com filtros de `date`/`location` novos em `FiltersScreen` (resolve D18); `MatchFilters`/`MatchCard`/`HomeScreen`/`SearchScreen` agora operam sobre `MatchSummary` (sem `organizer`/`participants`) — a busca por nome do organizador foi removida de `useMatchFilters` conforme a resolução já prevista pela D19; `MatchDetailScreen` passou a buscar `MatchDetail` sob demanda via novo hook `useMatchDetail`/`GET /matches/{id}` (também reaproveitado por `MatchChatScreen`, `PostMatchRatingScreen`, `RateUserScreen`, que liam `match.participants` da listagem antiga); `useMatchParticipation` migrado para `join`/`leave` reais; `CreateMatchScreen` envia só o payload de criação via `POST /matches`; novo botão "Encerrar partida" (organizador, `POST /matches/{id}/close`, D17) e UI de aprovar participante pendente em `ParticipantList` (`.../participants/{userId}/approve`, D17). Efeito colateral: `ReportUserScreen` perdeu o picker de "partida relacionada" por falta de endpoint "partidas em comum com usuário X" — registrado como D23, a resolver na Fase 13.8. Suíte 239/239, lint e `tsc --noEmit` zerados.
- **Sessão 25 (2026-07-13):** Item 13 da fila concluído na branch `feat/messages-real` — **Fase 13.6 (Mensagens reais) inteiramente concluída**. Novo hook `useMessages` (`src/hooks/useMessages.ts`) substitui `MessagesContext` por completo: `useInfiniteQuery` contra `GET /matches/{id}/messages` e `useMutation` para `POST` (resolve D12 — servidor gera o timestamp, front não gera mais nada no cliente). Achado que mudou o desenho: o backend ordena a listagem crescente e não expõe total, então a paginação usa `limit` crescente a partir de `skip=0` em vez do `skip` decrescente originalmente cogitado — documentado em comentário no próprio hook. `MessageBubble`/`formatMessageTime` (novo, `src/utils/date.ts`) resolvem D21 para mensagens. `MatchChatScreen` ganhou `onEndReached`/indicador de carregamento para a paginação. `MessagesContext` removido (arquivo deletado + provider tirado de `App.tsx`); `src/mocks/messages.ts` mantido como fixture (só será removido na 13.9, quando `RatingsContext`/`ReportsContext` também migrarem). Suíte 245/245, lint e `tsc --noEmit` zerados. **Próxima tarefa:** item 14 da fila — `RatingsContext` → React Query (Fase 13.7).
- **Sessão 26 (2026-07-13):** Item 14 da fila concluído na branch `feat/ratings-real` — **Fase 13.7 (Avaliações reais) inteiramente concluída**. Novo `src/hooks/useRatings.ts` (`useUserRatings`, `useSubmitRating`, `useHasRatedMap`) substitui `RatingsContext` por completo contra `GET /users/{id}/ratings` e `POST /matches/{id}/ratings/{userId}`; o adapter (`src/services/adapters/rating.ts`) já achatava `RatingCriteria` corretamente desde antes, não precisou de mudança. `useHasRatedMap` usa `useQueries` para checar "já avaliado" de vários participantes de `PostMatchRatingScreen` de uma vez, sem violar regras de hooks. **D20 resolvida**: `PublicUser.averageRating` virou `number | null`, `toPublicUser` para de mascarar `null` como `0`, e `RatingStars`/`TrustBadges`/telas de perfil tratam o caso "sem avaliações ainda" de verdade. `RatingsContext` removido (arquivo deletado + provider tirado de `App.tsx`); `src/mocks/ratings.ts` mantido (usado por `MyProfileScreen`/`PublicProfileScreen`, que exibem a lista de avaliações recebidas — fora do escopo desta sub-fase, que troca só enviar/checar avaliação). Suíte 252/252 (245 + 7 novos), lint e `tsc --noEmit` zerados. **Próxima tarefa:** item 15 da fila — `ReportsContext` → ação (Fase 13.8, resolve D14).

---

## Progresso geral

**Total de tarefas:** 86 (70 do protótipo + 16 da fila de integração, Fase 13)
**Concluídas:** 83 (69 do protótipo + refinamento visual transversal + itens 1–14 da Fase 13, sessões 20–26)
**Em andamento:** 0
**A fazer:** 3 (Fase 12: 12.3 requer dispositivo/emulador do usuário, 12.8 build de apresentação; Fase 13: itens 15–16)
