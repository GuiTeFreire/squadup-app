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
| Fase 13.8 — Denúncias reais | 1/1 ✅ | `feat/reports-real` (sessão 27 — 2026-07-14) |
| Fase 13.9 — Hardening e fechamento | 1/1 ✅ | `feat/organizer-actions-and-filters` (sessão 28 — 2026-07-16, ainda não mergeada) |

---

Detalhes tarefa-a-tarefa das fases concluídas (Fases 1–11) foram movidos para [`progress.md`](progress.md), organizados por sessão.

---

## FASE 12 — Revisão e polimento final (6/8 concluídas — detalhes tarefa-a-tarefa em `progress.md`, sessões 15 e 17)

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 12.3 | Testar no Expo Go em iOS e Android | ⚪ | Dispositivo físico ou emulador — requer o usuário, não disponível no sandbox |
| 12.8 | Preparar build de apresentação (`expo build` ou EAS Build) | 🟡 | `eas.json` criado (sessão 28); `eas login` + `eas build:configure` rodados pelo usuário na sessão 33 — `projectId` gerado (`0032bb63-f809-42d2-baba-6d62bc2b61b0`, gravado em `app.json`). Falta só rodar o build de fato (`eas build --platform android --profile preview`) — ação do usuário |

**Trilha D (Assets do TCC) avançada na sessão 28** — ver `plano-de-entrega.md` §5.1 e
`progress.md` (sessão 28) para detalhe completo. Resumo: `scripts/capture-tcc-screenshots.ts`
(Playwright) automatiza a captura de 8 telas em `tcc/assets/app/`. Faltam só as telas que
dependem de `Alert.alert` (D11, sem polyfill no web) e os prints de concorrentes (manual).

Concluídas: 12.1 (consistência visual, sessão 15) · 12.2 (fluxo completo, sessão 17) · 12.4 (acessibilidade, sessão 17) · 12.5 (lint/tsc, sessão 17) · 12.6 (testes, sessão 17) · 12.7 (coerência dos mocks, sessão 17).

---

## FASE 14 — Geolocalização real e notificações push (7/8 — backend concluído em 2026-07-28)

> Plano mestre completo (arquitetura, contrato de API, decisões D-Geo-*/D-Push-*) em
> `.status/backend-contract.md` §6-A. Detalhe tarefa-a-tarefa do front em `roadmap.md` §20.
> Contraparte no backend: `../squadup-back/.status/roadmap.md` §19 — **tarefas 1–4 concluídas e
> mergeadas em `dev` via PR #50 (2026-07-28)**, contrato de API estável e pronto para consumo.
> Escopo: geolocalização com coordenadas reais via GPS (`expo-location`); push via Expo Push API
> nos 3 eventos essenciais (mensagem nova, participação aprovada, partida encerrada/cancelada).
> **Não estava no cronograma original do TCC** — ver `plano-de-entrega.md` §9 para o encaixe e o
> plano de contingência de prazo.
>
> **Migration em produção:** aplicada com sucesso em `https://squadup-api.up.railway.app`
> (confirmado sessão 30, `../squadup-back/.status/queue.md`) — `lat`/`lng`/`radius_km` e
> `POST /users/me/push-token` já funcionam contra produção, não só localmente.

| # | Tarefa | Sub-fase | Repositório | Status |
|---|--------|----------|---|--------|
| 1 | Migration `latitude`/`longitude` em `Match`; schemas atualizados | 14 (backend) | Backend | 🟢 |
| 2 | `GET /matches` ganha `lat`/`lng`/`radius_km`; Haversine; ordenação por distância; testes | 14 (backend) | Backend | 🟢 |
| 3 | Tabela `push_tokens`; `POST /users/me/push-token`; revogação em logout | 14 (backend) | Backend | 🟢 |
| 4 | `notification_service.py` (Expo Push API) + disparo nos 3 eventos via `BackgroundTasks` | 14 (backend) | Backend | 🟢 |
| 5 | `useDeviceLocation` + `CreateMatchScreen` envia coordenadas + tipos/adapters | 14.1 | Front | 🟢 |
| 6 | `FiltersScreen` (toggle + raio) + `useMatchFilters`/`MatchesContext` propagam geo + distância no `MatchCard` | 14.1 | Front | 🟢 |
| 7 | `useNotificationRegistration` (permissão + token + registro) + listener de navegação | 14.2 | Front | 🟢 |
| 8 | Hardening ponta a ponta em dispositivo físico + ajuste do texto do TCC (D-A) | 14.3 | Ambos | ⚪ |

**Desvios do backend em relação ao contrato original de `backend-contract.md` §6-A** — relevantes
para o front implementar 5–7 corretamente:
- `MatchRead`/`MatchDetailRead` ganharam um campo novo não previsto: `distance_km: number | null`,
  presente só quando a busca (`GET /matches`) informou `lat`/`lng` — usar esse valor pronto no
  `MatchCard` em vez de recalcular a distância no cliente (tarefa 6).
- `POST /auth/logout` (logout de um único dispositivo) **não** revoga o push token registrado
  nesse dispositivo — só `POST /auth/logout-all` revoga todos. Não depende de nada novo do
  front, é só uma limitação a ter em mente (o dispositivo pode continuar recebendo push depois
  de um logout simples, até o token expirar do lado da Expo).

**Dependência crítica:** a tarefa 8 (e a validação real de push) só é possível em dispositivo
físico — mesma limitação de sandbox já registrada para 12.3. Tarefas 1–4 (backend) podem ser
feitas em paralelo entre si; 5–6 (geo) e 7 (push) são trilhas independentes do lado do front,
cada uma só depende do respectivo contrato de backend estar mergeado.

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
| D14 | `ReportsContext.updateReportStatus` manda status-alvo, backend espera ação | ~~Média~~ **Resolvida** | Sessão 27 (Fase 13.8): `ReportsContext` removido; `useUpdateReportAction` (`src/hooks/useReports.ts`) chama `PATCH /reports/{id}` com `{ action: "archive"\|"warn"\|"ban" }`. `AdminDashboardScreen`/`ReportDetailScreen` migrados. |
| D15 | Cadastro de usuário não coleta `age`, campo obrigatório no backend | ~~Média~~ **Resolvida** | Sessão 22: o campo "Data de nascimento" de `RegisterScreen` (existia na UI, mas era validado e depois **descartado** — nunca chegava a `register()`) passou a ser usado de verdade: `src/utils/date.ts` ganhou `parseBirthDate`/`calculateAge`, e `RegisterScreen` calcula a idade a partir da data informada e **exige 18+** (`MINIMUM_AGE`) — decisão de produto do usuário (não só satisfazer o schema do backend, é regra de segurança do app: partidas com desconhecidos). `register()` ganhou o 4º parâmetro `age: number` (computado, não digitado); `AuthContext` guarda em `pendingAge` e `completeProfile` usa esse valor em vez do `age: 25` hardcoded. 17 testes novos (`RegisterScreen.test.tsx`, `AuthContext.test.tsx`, `utils/__tests__/date.test.ts`). Ver `.status/backend-contract.md` §2.7. |
| D16 | `types.Match` único vs `MatchRead`/`MatchDetailRead` separados no backend | Média | Backend só expande `organizer`/`participants` no endpoint de detalhe; a listagem (`GET /matches`) devolve `organizer_id` e `confirmed_count`/`available_slots` prontos, sem array de participantes. Código que hoje lê `match.participants`/`match.organizer.name` a partir de uma lista vai quebrar silenciosamente ao trocar o mock pela API. Ver `.status/backend-contract.md` §2.2 para o plano de split em `MatchSummary`/`MatchDetail`. |
| D17 | Faltam ações de organizador: encerrar partida e aprovar participante pendente | ~~Baixa~~ **Resolvida** | `MatchDetailScreen`/`ParticipantList`/`useMatchParticipation` já implementam "Encerrar partida" (`POST /matches/{id}/close`, botão visível só para o organizador quando a partida não está encerrada) e "Aprovar" participante pendente (`POST /matches/{id}/participants/{userId}/approve`, ação por item na lista de `pending`). Confirmado no código na sessão 28 — já estava implementado, só não estava marcado como concluído nesta fila. |
| D18 | Filtros de partida não cobrem `date`/`location`, que o backend já suporta | ~~Baixa~~ **Resolvida** | `FiltersScreen`/`MatchFiltersContext` já coletam `date` (`DD/MM/AAAA` → ISO) e `location` (texto livre); `MatchesContext` envia ambos como query params para `GET /matches` via `fetchMatches`. Confirmado no código na sessão 28 — já estava implementado, só não estava marcado como concluído nesta fila. |
| D19 | `MatchesContext`/`useMatchFilters`/`MatchCard` tipados sobre `MatchDetail`, não `MatchSummary` | ~~Média~~ **Resolvida** | Resolvida na sessão 24 (Fase 13.5): `MatchesContext`/`MatchFiltersContext`/`useMatchFilters`/`MatchCard`/`HomeScreen`/`SearchScreen` migrados para `MatchSummary` real (`GET /matches`); a busca por nome do organizador foi removida de `useMatchFilters.applyFilters` (opção escolhida, em vez de pedir um campo `organizer_name` novo ao backend). `MatchDetailScreen` (que precisa de `organizer`/`participants` completos) passou a buscar `MatchDetail` sob demanda via `GET /matches/{id}` através do novo hook `useMatchDetail`. |
| D20 | `toPublicUser` (`src/services/adapters/user.ts`) transforma `average_rating: null` em `0` | ~~Média~~ **Resolvida** | Sessão 26 (Fase 13.7): `PublicUser.averageRating` virou `number \| null`; `toPublicUser` não mascara mais o `null` com `0`; `RatingStars` mostra "Sem avaliações" (em vez de "0.0") quando `rating` é `null`; `TrustBadges` omite o badge de nota nesse caso; `MyProfileScreen`/`PublicProfileScreen` mostram "—" no `StatsRow` para usuário sem avaliações. |
| D21 | `Message.createdAt`/`Rating.createdAt`/`Report.createdAt` (adapters) recebem o ISO completo do backend sem reformatar | ~~Baixa~~ **Parcialmente resolvida** | Sessão 25 (Fase 13.6): `MessageBubble.tsx` agora formata `message.createdAt` via `formatMessageTime` (novo, `src/utils/date.ts`) — o gap do chat está fechado. `Rating`/`Report` seguem sem mudança (já tratados na tela via `formatDate`/`formatReportDate`, fora do escopo desta sessão). |
| D22 | `tokenStorage` usa `sessionStorage` no web, que não sobrevive a fechar a aba | Baixa | `expo-secure-store` é um no-op em `react-native-web` (`ExpoSecureStore.web.js` exporta objeto vazio) — sem alternativa nativa de "storage seguro" real no browser. `src/services/storage/tokenStorage.ts` cai para `sessionStorage` nesse caso, o que é aceitável para a demo acadêmica (`npm run web`) mas significa que o usuário é deslogado ao fechar/reabrir a aba (diferente do nativo, onde o keychain/keystore persiste entre sessões do app). Sem ação necessária a menos que a apresentação dependa de sessão persistente no browser — se depender, considerar `localStorage` (persiste mais, mas é menos seguro ainda) como troca consciente. Descoberto na sessão 21 (item 5, 13.2). |
| D23 | `ReportUserScreen` perdeu o picker de "partida relacionada" ao migrar a listagem para `MatchSummary` | Baixa | A Fase 13.5 (sessão 24) trocou `MatchesContext` para consumir `GET /matches` real, que devolve `MatchSummary` (sem `participants`). `ReportUserScreen` usava `matches.filter(m => m.participants.some(...))` para achar partidas em comum com o usuário denunciado — não há endpoint no backend para "partidas em comum com o usuário X", então esse filtro virou um array vazio hardcoded (`userMatches: MatchRef[] = []`) até a Fase 13.8 (`ReportsContext` real) resolver isso de verdade — possivelmente precisando de um novo endpoint no backend. Efeito visual: a seção "Partida relacionada" nunca aparece mais em `ReportUserScreen`, mesmo quando o usuário e o denunciado jogaram juntos. Descoberto na sessão 24. |
| D24 | Regra "avaliador precisa ter participado da partida" não documentada em nenhuma tela | Baixa | Descoberto testando `POST /matches/{id}/ratings/{userId}` via API real na sessão 28: o backend exige `confirmed` tanto para quem avalia quanto para quem é avaliado — organizador **não** é participante automático da própria partida (precisa dar `join`). Nenhuma tela (`PostMatchRatingScreen`/`RateUserScreen`) avisa disso; se o organizador nunca entrou como participante, a tentativa de avaliar falha com `403 NOT_MATCH_PARTICIPANT` sem mensagem específica na UI (cai no fallback genérico de erro). Nice-to-have: detectar esse código de erro e mostrar uma mensagem mais clara, ou simplesmente documentar a regra para quem for testar manualmente. |
| D25 | Usuários/partidas de teste ficaram no banco SQLite local do backend | Baixa | A sessão 28 criou usuários (`teste.e2e.*@squadup.dev`, `screenshots.tcc@squadup.dev`) e partidas de teste ao validar a Fase 13.9 e capturar screenshots, todos no `squadup-back/squadup.db` local (fora deste repositório). Não afeta produção (Railway usa Postgres separado). Quem rodar o backend local de novo verá esses registros extras em `GET /matches`; limpar o banco local (`rm squadup.db` + rodar migrations/seed de novo) se isso incomodar a demo. |
| D26 | `CreateMatchScreen` não dá feedback visual quando a localização não pôde ser capturada | Baixa | Comportamento correto por desenho (D-Geo-3 — geolocalização é estritamente aditiva, criar partida nunca deve travar por causa disso), mas se o usuário nega a permissão ou o GPS falha, a partida é criada normalmente sem nenhum aviso de que as coordenadas não foram enviadas. Nice-to-have: um texto discreto (ex.: "Localização não disponível — partida será criada sem coordenadas") quando `permissionDenied` for `true`. Descoberto na sessão 31 (Fase 14.1, item 5). Não bloqueante. |
| D27 | `eas build:configure` reescreve `android.permissions` em `app.json`, ignorando o valor já configurado | Baixa | Ao rodar `eas build:configure` na sessão 33 para gerar o `projectId` (tarefa 12.8/item 7), o CLI adicionou `android.permission.ACCESS_COARSE_LOCATION` (duplicado) e **`android.permission.ACCESS_FINE_LOCATION`** às permissões — essa última contraria diretamente a decisão D-Geo-4 (só precisão "balanced", nunca "fine"). Corrigido manualmente na mesma sessão (revertido para `["ACCESS_COARSE_LOCATION"]`). Se `eas build:configure`/`eas build` forem rodados de novo no futuro (ex.: ao adicionar a plataforma iOS), **conferir o diff de `app.json` antes de commitar** — o CLI pode reintroduzir a permissão indevida silenciosamente. |
| D28 | `HomeScreen`/`MatchChatScreen`/`MatchDetailScreen`/`MyProfileScreen`/`EditProfileScreen`/`PublicProfileScreen`/`ReportUserScreen` usavam `CURRENT_USER`/`MOCK_USERS`/`MOCK_RATINGS` (mocks) em vez do usuário real logado — **Resolvida (sessão 34)** | ~~Alta~~ **Resolvida** | Ficou pra trás quando a Fase 13 trocou os mocks pela API real — só `RateUserScreen`/`PostMatchRatingScreen` tinham sido migrados. Efeito prático descoberto ao usuário perguntar "cadastro novo, vai ficar funcional?": "Meu Perfil" sempre mostrava o perfil mockado (nunca o real); "Editar perfil" não persistia nada (só um `Alert` de sucesso fake); como organizador real, os botões "Encerrar partida"/"Aprovar participante" nunca apareciam (checagem de `isOrganizer` comparava com o ID do mock); status de participação do usuário real ficava errado; mensagens próprias no chat apareciam com o estilo de "mensagem de outra pessoa"; **`PublicProfileScreen`/`ReportUserScreen` mostravam "Usuário não encontrado" para qualquer participante real** (procuravam por `id` em `MOCK_USERS`, que só tem os 6 IDs fake — nunca bate com um UUID gerado pelo backend). Corrigido: `HomeScreen`/`MatchChatScreen`/`MatchDetailScreen`/`EditProfileScreen` passaram a usar `useAuth().user`; `MyProfileScreen` passou a usar `useAuth().user` + `useUserRatings` (real); novo hook `usePublicProfile` (`GET /users/{id}`, novo `fetchPublicProfile` em `api/users.ts`) substitui `MOCK_USERS.find` em `PublicProfileScreen`/`ReportUserScreen`; `useMatchParticipation` passou a aceitar `currentUser: PublicUser \| null`; novo método `updateProfile` em `AuthContext` faz `EditProfileScreen` salvar de verdade via `PATCH /users/me` (payload expandido em `api/users.ts` para incluir `name`/`bio`/`location`/`favorite_sports`, antes só `level`/`photo_url`). 3 suítes de teste reescritas (`MatchDetailScreen`, `PublicProfileScreen`, `ReportUserScreen`) para mockar `useAuth`/API real em vez dos mocks síncronos. |
| D29 | `expo-font` (peer dependency de `@expo/vector-icons`) nunca foi instalado — app crashava instantaneamente ao abrir fora do Expo Go | ~~Alta~~ **Resolvida (sessão 34)** | Descoberto no log da própria build EAS (fase `RUN_EXPO_DOCTOR`, nível `error`): "Missing peer dependency: expo-font ... Your app may crash outside of Expo Go without this dependency" — confirmado pelo usuário instalando o APK de teste e o app fechando sozinho na abertura. `@expo/vector-icons` é usado em quase toda tela (headers, abas, botões), então o crash acontecia antes de qualquer UI renderizar. `expo doctor` também apontava duas versões conflitantes de `expo-font` no `node_modules` (transitiva vs direta) e mais dois desalinhamentos de versão (`expo` 54.0.34→54.0.36, `babel-preset-expo`/`@types/jest` fora da faixa esperada pelo SDK 54). Corrigido com `npx expo install expo-font` + `npx expo install --fix`; `npx expo-doctor` confirma **18/18 checks passando** (estava 15/18). Mesma família do D7 (que já registrava a dependência-irmã `expo-asset` como um risco não instalado) — nenhuma ação adicional necessária para `expo-asset`, que segue mockado só no Jest. **Exige gerar uma build EAS nova** — o APK já instalado no dispositivo de teste (sessão 34) foi compilado antes desta correção e precisa ser substituído. |
| D30 | Campos `DD/MM/AAAA` sem inserção automática de "/" e telas de formulário sem `KeyboardAvoidingView` (teclado cobria o campo em foco) | ~~Alta~~ **Resolvida (sessão 34)** | Achado pelo usuário testando o cadastro no APK real: o teclado numérico do Android não tem tecla "/", e nenhuma tela inseria as barras automaticamente enquanto o usuário digitava — impossível preencher `RegisterScreen`/`CreateMatchScreen`/`FiltersScreen` (todas usam o mesmo padrão `DD/MM/AAAA`). Além disso, nenhuma tela de formulário (exceto `MatchChatScreen`) usava `KeyboardAvoidingView`, então em telas mais curtas (`Login`/`Register`/`ProfileSetup`) o teclado cobria o campo de senha/data em foco sem a `ScrollView` compensar. Corrigido: nova função `formatDateInput` (`src/utils/date.ts`) insere as barras automaticamente a partir dos dígitos digitados (usada em `RegisterScreen`, `CreateMatchScreen`, `FiltersScreen`; `keyboardType` alinhado para `number-pad` nos três); `KeyboardAvoidingView` (`behavior` `padding`/`height` por plataforma, mesmo padrão já usado em `MatchChatScreen`) adicionado em `LoginScreen`, `RegisterScreen`, `ProfileSetupScreen`, `CreateMatchScreen`, `EditProfileScreen`, `ReportUserScreen`, `RateUserScreen` e `FiltersScreen` — praticamente todas as telas com `Input`. 5 testes novos para `formatDateInput` (`date.test.ts`). **Exige gerar uma build EAS nova** (mesma exigência do D29 — os dois foram corrigidos juntos, uma única build cobre ambos). |

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
> em `.status/backend-contract.md` §6. **Fase 13 inteiramente concluída (16/16) na sessão 28** —
> detalhe tarefa-a-tarefa de todas as sub-fases (13.1–13.9) arquivado em
> [`progress.md`](progress.md), sessões 20–28.

| # | Tarefa | Sub-fase | Status |
|---|--------|----------|--------|
| 14 | `RatingsContext` → React Query; adapter de achatamento de critérios; UI trata `averageRating` nulo | 13.7 | 🟢 |
| 15 | `ReportsContext.updateReportStatus` migrado para ação (`archive`/`warn`/`ban`) em vez de status-alvo (D14) | 13.8 | 🟢 |
| 16 | Teste ponta a ponta (via API real, sessão 28); apontar `.env` para URL de produção; ajustar texto do TCC (decisão D-A) | 13.9 | 🟢 |

---

## Bloqueadores e observações

> Histórico detalhado por sessão (o "porquê" de cada decisão, trechos de código, achados de
> auditoria) vive em [`progress.md`](progress.md) — esta seção só guarda a observação mais
> recente, para servir de ponto de retomada rápido no início da próxima sessão.

- **Checkpointer — Sessão 33 (2026-07-28, branch `feat/push-notifications`, a partir de
  `feat/match-distance-filter`):** item 7 da tabela da Fase 14 concluído (🟢) —
  `useNotificationRegistration` (permissão + `ExpoPushToken` + `POST /users/me/push-token`),
  chamado uma vez quando `isAuthenticated` vira `true` em `AuthContext`; listener de navegação
  (`navigationRef.ts` + `RootNavigator`) mapeando `new_message`→`MatchChat`,
  `match_closed`/`participation_approved`→`MatchDetail`. `eas build:configure` rodado pelo
  usuário nesta sessão (`projectId` gerado: `0032bb63-f809-42d2-baba-6d62bc2b61b0`) — corrigido
  um efeito colateral dele em `app.json` que adicionava `ACCESS_FINE_LOCATION`, contrariando
  D-Geo-4. Detalhe completo em [`progress.md`](progress.md), sessão 33. **289/289 testes**,
  `tsc`/`lint` zerados, build web (`npx expo export`) validada.
  - **Próxima tarefa concreta (item 8, última da Fase 14):** hardening ponta a ponta em
    dispositivo físico — testar geolocalização real (GPS) e push real (Expo) num Android
    físico/Expo Go (push remoto **não funciona em Expo Go desde o SDK 53** — precisa de
    development build via `eas build --profile development`, ou `--profile preview` para um
    APK completo), confirmar navegação ao tocar a notificação nos 3 eventos, e então ajustar o
    texto do TCC (decisão D-A) de "trabalho futuro" para "implementado". Ação do usuário —
    mesma limitação de sandbox já registrada para 12.3.
  - Migration do backend já rodou em produção (Railway, confirmado sessão 30) — a Fase 14 pode
    ser testada tanto contra o backend local quanto contra `https://squadup-api.up.railway.app`.

- **Checkpointer — Sessão 34 (2026-07-28, branch `fix/real-user-profile-data`, a partir de
  `feat/push-notifications`/`dev` já mergeada):** achado e corrigido D28 — 7 telas
  (`HomeScreen`, `MatchChatScreen`, `MatchDetailScreen`, `MyProfileScreen`, `EditProfileScreen`,
  `PublicProfileScreen`, `ReportUserScreen`) ainda liam `CURRENT_USER`/`MOCK_USERS`/
  `MOCK_RATINGS` em vez do usuário real — resquício da Fase 13. Efeito mais grave: perfil público
  de qualquer participante real mostrava "Usuário não encontrado" (quebrava também "denunciar
  usuário"). Corrigido com `useAuth().user`, novo hook `usePublicProfile` (`GET /users/{id}`) e
  novo método `AuthContext.updateProfile` (agora `EditProfileScreen` salva de verdade via
  `PATCH /users/me`). Detalhe completo em [`progress.md`](progress.md), sessão 34. **289/289
  testes**, `tsc`/`lint` zerados, build web validada.
  - **Próxima tarefa concreta:** nenhuma de código pendente. Revisar/mergear
    `fix/real-user-profile-data` em `dev`; depois só resta o item 8 da Fase 14 (hardening em
    dispositivo físico) e as pendências não-técnicas (screenshots do TCC, decisões
    D-Deploy-1/D-Deploy-2/D-TCC-1/D-TCC-2 do `plano-de-entrega.md`).

---

## Progresso geral

**Total de tarefas:** 86 (70 do protótipo + 16 da fila de integração, Fase 13)
**Concluídas:** 85 (69 do protótipo + refinamento visual transversal + 16/16 da Fase 13 — sessões 20–28)
**Em andamento:** 1 (Fase 12: 12.8 — `eas.json` pronto, falta login/build real do usuário)
**A fazer:** 1 (Fase 12: 12.3 requer dispositivo/emulador do usuário)
