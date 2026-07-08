# SquadUp — Paridade de Contrato Front × Backend

> Gerado na sessão 18 (2026-07-08) comparando `../back` (FastAPI + SQLModel, stack real e já
> testada — 100+ testes, Alembic, JWT) com os tipos/mocks/contexts do front (`src/types`,
> `src/mocks`, `src/contexts`). Backend está bem mais adiantado do que o roadmap do front
> presumia: já existe auth JWT completa, matches, mensagens, ratings e reports persistidos em
> SQLite via SQLModel. Este documento é a fonte única de verdade para o contrato de API —
> manter atualizado sempre que um schema mudar de qualquer um dos dois lados (regra do
> `CLAUDE.md`, seção 1).

Backend lido em: `app/models/*.py`, `app/schemas/*.py`, `app/routers/*.py`, `app/main.py`.

---

## 1. Convenção de nomenclatura (esperado, não é bug)

Backend usa `snake_case` (Python/JSON), front usa `camelCase` (convenção TS/JS). Isso é
correto para cada lado — **não renomear os campos do front para snake_case**. A paridade deve
vir de uma camada de adaptação na integração (ver seção 5), não de forçar uma convenção sobre
a outra.

---

## 2. Paridade por entidade

### 2.1 User

| Campo | Backend (`UserRead`/`PublicProfileRead`/`MyProfileRead`) | Front (`types.User`) | Situação |
|---|---|---|---|
| id, name, age, location, bio, level | ✅ | ✅ | paridade (case à parte) |
| photo_url / photoUrl | ✅ | ✅ | paridade |
| favorite_sports / favoriteSports | ✅ | ✅ | paridade |
| is_verified / isVerified | ✅ | ✅ | paridade |
| average_rating | `float \| null` (nulo se sem avaliações) | `averageRating: number` (nunca nulo) | ⚠️ **discrepância** — front assume sempre número |
| matches_played / matchesPlayed | ✅ | ✅ | paridade |
| **email** | presente em `UserRead`/`MyProfileRead` | **ausente no tipo `User`** | ⚠️ **campo ausente** — necessário para telas de perfil/edição quando integrar auth real |
| **role** (`user`\|`admin`) | presente em `MyProfileRead` | **ausente no tipo `User`** | ⚠️ **campo ausente** — `AdminDashboardScreen` hoje é acessível por link direto sem checar role nenhuma (ver `.status/queue.md`, nota da sessão 15/16); backend já tem RBAC real via `get_current_admin` |
| `hashed_password` | só no model interno, nunca exposto | — | não aplicável ao front, ok |

Backend também distingue **3 shapes diferentes** de usuário que o front trata como um tipo
único:
- `PublicProfileRead` — o que qualquer um vê de outro usuário (sem email/role).
- `MyProfileRead` — perfil próprio (com email/role).
- `UserRead` — usado só nas respostas de `/auth/register` e `/auth/me`.

**Sugestão:** dividir `types.User` em `PublicUser` (o que hoje existe) e `MyProfile extends
PublicUser { email, role }`, espelhando o backend. Evita vazar `email`/`role` em componentes
que só deveriam receber o shape público (ex.: `PublicProfileScreen`, `ParticipantList`).

### 2.2 Match

Backend separa **duas shapes**, front usa uma única (`types.Match`):

| Shape backend | Onde é usada | Campos únicos |
|---|---|---|
| `MatchRead` | `POST /matches`, `GET /matches` (lista), ações (`join`/`leave`/`close`/`approve`) | `organizer_id: str` (só o ID), **sem** `participants`; tem `confirmed_count` e `available_slots` calculados no servidor |
| `MatchDetailRead` | `GET /matches/{id}` | `MatchRead` + `organizer: PublicProfileRead` (objeto completo) + `participants: ParticipantRead[]` |

Front's `types.Match` sempre assume `organizer: User` (objeto completo) e `participants:
Participant[]` presentes — isso **quebra ao integrar a listagem real**: `GET /matches` não
devolve nem organizador expandido nem lista de participantes. `HomeScreen`/`MatchCard` hoje
recalculam vagas contando `participants.filter(status === "confirmed")`
(`MatchDetailScreen.tsx:87-90`), o que só é possível porque o mock sempre inclui o array
completo — na API real isso não existiria fora da tela de detalhe.

**Sugestão:**
- `MatchSummary` (equivalente a `MatchRead`): `organizerId: string`, `confirmedCount: number`,
  `availableSlots: number` — usar direto os campos calculados pelo servidor em vez de
  recalcular no cliente.
- `MatchDetail extends MatchSummary`: `organizer: PublicUser`, `participants: Participant[]`.
- `HomeScreen`/`MatchCard`/`MatchFiltersContext` operam sobre `MatchSummary[]`;
  `MatchDetailScreen` busca um `MatchDetail` sob demanda (via `GET /matches/{id}`).

Outras discrepâncias em Match:
- `allow_beginners`/`requires_approval` → `allowBeginners`/`requiresApproval`: paridade (case).
- `status` (`MatchStatus`) e `level` (`ExperienceLevel`): enums idênticos aos do front — ✅
  paridade total de valores.
- **Faltando no front:** nenhuma ação de **"encerrar partida"** (`POST
  /matches/{id}/close`). `MatchDetailScreen` nunca transiciona `status` para `closed` — no
  mock, partidas já nascem `closed`. Sem essa ação, o fluxo real de avaliação pós-partida
  (que exige `MATCH_NOT_CLOSED` → erro se a partida não foi encerrada) não tem como ser
  disparado pelo organizador dentro do app.
- **Faltando no front:** UI para **aprovar participante pendente** (`POST
  /matches/{id}/participants/{user_id}/approve`). Hoje `updateParticipation` (client-side, em
  `MatchesContext.tsx`) deixa qualquer status ser setado livremente; não existe uma tela/ação
  onde o organizador vê a fila de `pending` e aprova um a um — só o próprio usuário
  cancela/entra na própria participação (`useMatchParticipation.ts`).

### 2.3 Participant / ParticipationStatus

`ParticipationStatus` (`confirmed`\|`pending`\|`cancelled`) — **paridade total** de valores
entre `app/models/enums.py:ParticipationStatus` e `types.ParticipationStatus`.

`ParticipantRead.status` no backend é tipado como `str` solto (não o enum) — obs. só relevante
para quem for tocar no backend, não afeta o front.

### 2.4 Message

| Backend `MessageRead` | Front `types.Message` | Situação |
|---|---|---|
| `sender: PublicProfileRead` (objeto completo) | `senderId` + `senderName` + `senderPhotoUrl` (achatado) | ⚠️ precisa adapter para achatar/expandir |
| `created_at: datetime` (ISO, gerado pelo servidor) | `createdAt: string` (só `"HH:mm"`, gerado no cliente em `MessagesContext.sendMessage`) | ⚠️ **contrato quebrado** — front nunca deveria gerar o timestamp; ao integrar, `sendMessage` deve enviar só `{ text }` e usar o `created_at` que volta na resposta do `POST` (já é o desenho do backend: "timestamp gerado pelo servidor"). Isso também resolve a D12 (`.status/queue.md`) de vez |
| `type` (`message`\|`system`) | idêntico | ✅ paridade de valores, mas... |

**Gap real:** o backend não tem nenhum serviço que gere mensagens `type: "system""`
automaticamente (ex.: "Partida criada por X. Bem-vindos!", presente nos mocks
`src/mocks/messages.ts`). O enum existe (`MessageType.SYSTEM`) mas nada em
`app/services/message_service.py` o emite. Ou o backend precisa ganhar esse comportamento
(ex.: inserir uma mensagem de sistema ao criar a partida), ou o front deve parar de assumir
que essas mensagens vêm da API.

Falta também paginação no front: `GET /matches/{id}/messages` aceita `skip`/`limit` (máx.
100); `MatchChatScreen`/`MessagesContext` hoje carregam a lista inteira do mock de uma vez.

### 2.5 Rating

| Backend | Front | Situação |
|---|---|---|
| `punctuality/respect/behavior/presence/overall` **campos soltos** no topo do schema | agrupados em `criteria: RatingCriteria` | precisa adapter (achatar ao enviar, agrupar ao ler) |
| `rater: PublicProfileRead` | `raterUser: User` | rename simples |
| `rated_user_id: string` (só ID) | `ratedUser: User` (objeto completo) | ⚠️ backend não expande o avaliado — front precisa resolver via contexto já conhecido (é a própria tela de perfil sendo visualizada) |
| `match_id: string` (só ID) | `match: Match` (objeto completo) | ⚠️ backend não expande a partida — se a UI precisa mostrar título/data da partida avaliada, vai precisar de um fetch adicional por `match_id`, ou pedir ao backend para expandir |
| endpoint: `POST /matches/{match_id}/ratings/{user_id}` | `RatingsContext.submitRating(matchId, ratedUserId, criteria, comment)` | assinatura já compatível com os path params — bom |
| endpoint: `GET /users/{user_id}/ratings` (avaliações **recebidas**) | front lê de `MOCK_RATINGS` global e filtra em memória | precisa migrar para fetch por usuário |

### 2.6 Report

| Backend | Front | Situação |
|---|---|---|
| `reason` (`ReportReason`, 7 valores) | idêntico | ✅ paridade total |
| `status` (`ReportStatus`, 4 valores) | idêntico | ✅ paridade total |
| `reported_user`/`reporter` (objetos completos em `ReportRead`) | `reportedUser`/`reporterUser` | rename simples (`reporter` → `reporterUser`) |
| `match_id: string \| null` (só ID) | `match?: Match` (objeto completo) | ⚠️ mesma limitação do Rating — backend não expande a partida |
| `ReportCreate.reported_user_id` (reporter vem do JWT, não do payload) | `ReportUserScreen` monta o `Report` inteiro no cliente | ok, é o esperado — ajustar ao trocar por chamada real |
| **`PATCH /reports/{id}` espera `{ action: "archive"\|"warn"\|"ban" }`** (`ReportAction`) | `updateReportStatus(reportId, status)` manda um **`ReportStatus`** direto (`pending`\|`archived`\|`warned`\|`banned`) | 🔴 **quebra de contrato real, não só nomenclatura** — o backend não aceita "setar status pending" (não existe ação para isso) nem entende `ReportStatus` como payload. `AdminDashboardScreen`/`ReportDetailScreen` precisam migrar para trabalhar em termos de **ação** (`archive`/`warn`/`ban`), não de status-alvo, antes de apontar para a API real |

### 2.7 Auth — o maior gap

Front (`AuthContext.tsx`) hoje é 100% síncrono e local: `login`/`register` só setam estado,
sem token, sem chamada de rede. Backend já tem fluxo JWT completo com refresh rotation.

| Backend | Front | Situação |
|---|---|---|
| `POST /auth/register` exige `name, email, password, age, location` (bio/favorite_sports opcionais) | `RegisterScreen` só coleta `name/email/password`; `location`/`favoriteSports`/`level` vêm depois em `ProfileSetupScreen`; **`age` não é coletado em nenhuma tela** — `completeProfile` hardcoda `age: 25` | 🔴 **campo obrigatório no backend sem input nenhum no front** — falta um campo de idade em algum ponto do fluxo de cadastro |
| `POST /auth/register` retorna `UserRead` (não retorna token) | — | ao integrar, precisa de um `login` explícito logo após o registro (ou o backend expor essa conveniência) |
| `POST /auth/login` → `{ access_token, refresh_token, token_type }` | `login()` não lida com token nenhum | falta camada de armazenamento seguro de token (ver seção 4) |
| `POST /auth/refresh` (rotação: token usado é invalidado) | inexistente | precisa de interceptor de refresh automático quando integrar |
| `POST /auth/logout` revoga o refresh token no servidor | `logout()` só reseta estado local | ao integrar, precisa chamar o endpoint antes de limpar o estado |
| `GET /auth/me` | sem equivalente (React state já guarda o "usuário atual" localmente) | vira o boot da sessão (restaurar usuário a partir do token salvo) |

---

## 3. Camada que falta no front: cliente de API

Hoje **não existe nenhum `src/services/` ou `src/api/`** no projeto — toda "persistência" é
`useState` dentro de Contexts, alimentado por mocks estáticos. Para consumir o backend real
será preciso introduzir essa camada; hoje ela não existe em lugar nenhum para comparar.

Backend devolve erros como `{ "detail": { "code": "USER_NOT_FOUND", "message": "..." } }`
(`app/schemas/errors.py`) — um cliente HTTP central precisa reconhecer esse formato (`code`
estável para lógica, `message` para exibir).

---

## 4. Plano de refatoração sugerido (paridade 100%, sem quebrar o protótipo atual)

Prioridade da migração pensada para não quebrar nada enquanto o backend ainda não está
plugado — os mocks continuam existindo, só a *forma* dos tipos muda para já nascer compatível.

1. **Tipos primeiro** (`src/types/index.ts`) — menor risco, maior valor:
   - Separar `User` em `PublicUser` / `MyProfile` (email, role).
   - Separar `Match` em `MatchSummary` / `MatchDetail` (organizerId vs organizer expandido).
   - Achatar `RatingCriteria` nos pontos de escrita, manter agrupado só na exibição via
     adapter, ou aceitar o agrupamento como decisão de UI e isolar a conversão numa função
     `toRatingPayload()`/`fromRatingRead()`.
2. **Camada de adapters** (`src/services/adapters/` — sugestão de local): funções puras
   `toFrontUser(apiUser)`, `toApiRatingPayload(criteria, comment)` etc. Mantém o
   `snake_case ↔ camelCase` e achatamento/expansão de objetos isolados num só lugar, para não
   espalhar `.favorite_sports` pela UI inteira no dia da integração.
3. **Cliente HTTP** (`src/services/api/client.ts` — sugestão): wrapper de `fetch` tipado,
   parse de `ErrorResponse`, anexação de `Authorization: Bearer`, refresh automático em 401.
4. **Ações que faltam na UI**, para fechar os fluxos que o backend já exige:
   - Botão "Encerrar partida" para o organizador (`MatchDetailScreen`), chamando
     `POST /matches/{id}/close`.
   - Lista de solicitações pendentes com "Aprovar" para o organizador — hoje `ParticipantList`
     só exibe, não tem ação de moderação.
   - Campo de idade no fluxo de cadastro (`RegisterScreen` ou `ProfileSetupScreen`).
   - Filtros de **data** e **localização** em `FiltersScreen`/`MatchFiltersContext` — o
     backend já aceita `date`/`location` em `GET /matches`, o front só filtra por
     `sport`/`level`/`onlyAvailable` hoje.
   - Migrar `ReportsContext.updateReportStatus(id, status)` → `updateReportStatus(id, action)`
     onde `action` é `archive`/`warn`/`ban`, alinhado ao `PATCH /reports/{id}` real.
5. **Auth real por último** (maior superfície de mudança): storage seguro de tokens
   (`expo-secure-store`, não `AsyncStorage` — dado sensível, ver seção 4 do `CLAUDE.md`),
   interceptor de refresh, tela de boot que chama `/auth/me`.

Nenhuma dessas mudanças precisa acontecer nesta sessão — é a ordem sugerida para quando a
Fase "integração com backend" (roadmap, seção 18) começar. Ficam registradas em
`.status/queue.md` como dívidas técnicas novas (D14–D18).

---

## 5. Resumo executivo

- **Paridade boa hoje:** todos os enums (`Sport`, `ExperienceLevel`, `MatchStatus`,
  `ParticipationStatus`, `MessageType`, `ReportReason`, `ReportStatus`) têm exatamente os
  mesmos valores dos dois lados. Isso é o mais difícil de acertar depois e já está certo.
- **Maior risco de quebra silenciosa:** `Match` único no front vs `MatchRead`/`MatchDetailRead`
  separados no backend — código que hoje lê `match.participants` ou `match.organizer.name` a
  partir de uma listagem vai quebrar em runtime ao trocar o mock pela API real, sem erro de
  tipo nenhum se os tipos não forem ajustados antes.
- **Único contrato genuinamente incompatível (não é só nomenclatura):** ação de moderação de
  denúncia — front manda status-alvo, backend espera verbo de ação.
- **Único campo obrigatório sem input no front:** idade no cadastro.
