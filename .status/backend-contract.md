# SquadUp — Paridade de Contrato Front × Backend

> Gerado na sessão 18 (2026-07-08) comparando `../back` (FastAPI + SQLModel, stack real e já
> testada — 100+ testes, Alembic, JWT) com os tipos/mocks/contexts do front (`src/types`,
> `src/mocks`, `src/contexts`). Backend está bem mais adiantado do que o roadmap do front
> presumia: já existe auth JWT completa, matches, mensagens, ratings e reports persistidos em
> SQLite via SQLModel. Este documento é a fonte única de verdade para o contrato de API —
> manter atualizado sempre que um schema mudar de qualquer um dos dois lados (regra do
> `CLAUDE.md`, seção 1).
>
> **Atualização (sessão do backend em 2026-07-08, lida e sincronizada aqui na mesma data):**
> a Etapa 1 do plano mestre (§6) — pré-requisito da Fase 13 deste repositório — está
> **100% concluída** em `../back`. As decisões D-B, D-C e D-D (§6) foram todas resolvidas a
> favor da recomendação registrada aqui; as três discrepâncias que este documento apontava
> como "⚠️" nas seções 2.4/2.5/2.6 **não existem mais no contrato real**. Também nasceu um
> endpoint novo (`POST /auth/logout-all`, §2.7) que não existia quando esta comparação foi
> escrita. Os parágrafos abaixo foram atualizados in-loco para refletir o schema real de hoje;
> o texto original de cada discrepância foi mantido, marcado como resolvido, para preservar o
> histórico de por que cada decisão foi tomada. **Conclusão prática: nada bloqueia mais o
> início da Fase 13** (`.status/roadmap.md` §19 / `.status/queue.md`).

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

**Gap real — ✅ resolvido em 2026-07-08 (decisão D-D aplicada no backend):** este parágrafo
descrevia um estado em que o backend não emitia mensagens de sistema. Isso mudou:
`app/services/match_service.py::create_match` agora insere automaticamente uma
`Message(type=system, sender=organizador, text="Partida criada. Bem-vindos!")` ao criar a
partida — escopo mínimo, conforme a recomendação D-D (§6): só no evento de criação, sem
replicar as demais variações que hoje só existem em `src/mocks/messages.ts`. Ao integrar, o
front só precisa exibir a mensagem que a própria API já devolve no histórico — não é preciso
gerar nada no cliente.

Falta também paginação no front: `GET /matches/{id}/messages` aceita `skip`/`limit` (máx.
100); `MatchChatScreen`/`MessagesContext` hoje carregam a lista inteira do mock de uma vez.

### 2.5 Rating

| Backend | Front | Situação |
|---|---|---|
| `punctuality/respect/behavior/presence/overall` **campos soltos** no topo do schema | agrupados em `criteria: RatingCriteria` | precisa adapter (achatar ao enviar, agrupar ao ler) |
| `rater: PublicProfileRead` | `raterUser: User` | rename simples |
| `rated_user: PublicProfileRead` (objeto completo — ver nota) | `ratedUser: User` (objeto completo) | ✅ **resolvido em 2026-07-08** — decisão D-B (§6) aplicada: o backend passou a expandir `rated_user` (era só `rated_user_id`). `RatingRead` agora tem paridade de shape total com o que este documento recomendava; não precisa mais de resolução via contexto |
| `match: MatchRef` (`id, title, sport, date` — ver nota) | `match: Match` (objeto completo) | ✅ **resolvido em 2026-07-08** — decisão D-C (§6) aplicada: novo schema `MatchRef` embutido em `RatingRead.match` (era só `match_id`). Não é o `Match` completo, mas cobre exatamente o caso de uso citado ("avaliação referente à partida X, em 25/05") sem N+1 request |
| endpoint: `POST /matches/{match_id}/ratings/{user_id}` | `RatingsContext.submitRating(matchId, ratedUserId, criteria, comment)` | assinatura já compatível com os path params — bom |
| endpoint: `GET /users/{user_id}/ratings` (avaliações **recebidas**) | front lê de `MOCK_RATINGS` global e filtra em memória | precisa migrar para fetch por usuário |

### 2.6 Report

| Backend | Front | Situação |
|---|---|---|
| `reason` (`ReportReason`, 7 valores) | idêntico | ✅ paridade total |
| `status` (`ReportStatus`, 4 valores) | idêntico | ✅ paridade total |
| `reported_user`/`reporter` (objetos completos em `ReportRead`) | `reportedUser`/`reporterUser` | rename simples (`reporter` → `reporterUser`) |
| `match: MatchRef \| null` (era `match_id: string \| null`) | `match?: Match` (objeto completo) | ✅ **resolvido em 2026-07-08** — mesma decisão D-C aplicada aqui também: `ReportRead.match` agora é `MatchRef \| null` em vez de só o ID |
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
| **`POST /auth/logout-all`** (novo, adicionado em 2026-07-08) — autenticado via `Authorization: Bearer <access_token>` (não recebe `refresh_token` no corpo), revoga **todos** os refresh tokens ativos do usuário de uma vez, `204` | sem equivalente | endpoint novo, não coberto pelo `logout()` simples de 13.4. Não é obrigatório para o MVP (o fluxo básico de logout usa `POST /auth/logout` normalmente), mas é a peça que falta para uma futura tela de "gerenciar sessões"/"sair de todos os dispositivos" (ex.: em `MyProfileScreen`, ação de segurança em caso de suspeita de conta comprometida) — considerar ao planejar 13.4 se esse caso de uso entrar no escopo |

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

## 5. Contexto adicional do TCC (`TCC.tex`, lido na sessão 19)

O TCC confirma a visão de produto e a arquitetura (React Native + FastAPI + banco relacional)
já descritas em `vision.md` dos dois repositórios — sem contradição aí. Duas afirmações do
texto, porém, estão **à frente da implementação real** e representam risco de credibilidade
na banca se não forem alinhadas antes da defesa:

1. **Geolocalização como se já existisse** (§4.6.5, "Geolocalização"): *"No SquadUp, a
   geolocalização foi utilizada para facilitar a descoberta de partidas esportivas próximas ao
   usuário."* — no verbo no passado, como funcionalidade entregue. Na prática, `vision.md` dos
   dois repositórios lista geolocalização real explicitamente **fora do escopo** (front §14,
   back §8), e nem `User` nem `Match` têm campos de latitude/longitude — `location` é só
   `string` livre nos dois lados. Nenhum código precisa mudar por causa disso; o texto do TCC
   é que precisa ser ajustado (tempo verbal / mover para "trabalhos futuros"), a menos que se
   decida implementar geolocalização de verdade antes da defesa (ver Decisão D-A abaixo).
2. **"Local" como entidade própria** (§4.7, "Principais entidades"): o TCC lista `Local` como
   uma das seis entidades principais, ao lado de Usuário/Partida/Participação/Avaliação/
   Denúncia. No modelo real (`app/models/match.py`), não existe uma tabela `Location`/`Venue`
   — `location` é um campo `str` solto em `Match`, igual ao `location: string` do front. Ajustar
   o texto (tratar "local" como atributo, não entidade) é a opção de menor esforço; modelar uma
   entidade `Location` de verdade é uma opção maior, só justificável se o projeto for evoluir
   para busca por proximidade real.

Nenhum dos dois pontos bloqueia a integração técnica — são decisões de **escopo/redação**, não
bugs de contrato. Ficam registrados aqui porque afetam diretamente a defesa do TCC, e a decisão
(ajustar o texto vs. implementar de verdade) muda o que entra no roadmap técnico. Ver "Decisão
D-A" na seção 7.

O cronograma do TCC (§5, Tabela "Cronograma de Desenvolvimento") também dá uma baliza de tempo
útil: a etapa "Integração entre frontend e backend" está prevista para Ago–Set, logo após
"Implementação do backend" (até Jul 2) — ou seja, pelo calendário do próprio TCC, **agora é o
momento correto de iniciar exatamente o plano da seção 7 abaixo.**

## 6. Plano de implementação mestre (integração front × backend)

Plano de arquitetura para sair do estado atual (front 100% mockado, backend funcional e maduro
mas não consumido) para um MVP integrado ponta a ponta. Numerado em **decisões** (a fechar
antes de codar) e **etapas** (trabalho executável, em ordem de dependência). Cada etapa indica
o repositório responsável. As etapas foram transformadas em tarefas concretas em
`.status/roadmap.md` (Fase 13, deste repositório) e no `roadmap.md`/`queue.md` do backend.

### Decisões a fechar antes de codar

- **D-A (produto/escopo, decidir com o orientador):** manter geolocalização e "Local" como
  trabalho futuro (ajustar só o texto do TCC) **ou** investir tempo em implementar de verdade
  antes da defesa. Recomendação: manter como trabalho futuro — o cronograma do próprio TCC não
  reserva tempo para isso, e nenhum caso de uso priorizado depende disso.
- **D-B (contrato, backend) — ✅ resolvida em 2026-07-08, aplicada como recomendado:**
  `RatingRead` expandia `rater` (`PublicProfileRead`) mas não `rated_user` (só
  `rated_user_id`) — assimetria em relação ao padrão que o próprio backend já estabeleceu para
  `Message.sender`/`Participant.user` ("Lições da Fase 8", `back/.status/queue.md`). O backend
  passou a expandir `rated_user` também. Ver §2.5 atualizado.
- **D-C (contrato, backend) — ✅ resolvida em 2026-07-08, aplicada como recomendado:**
  `Rating`/`Report` só referenciavam `Match` por `match_id`, sem nome/data. O backend ganhou um
  `MatchRef` leve (`id, title, sport, date`) embutido em `RatingRead.match` e `ReportRead.match`,
  evitando N+1 requests do front quando `PublicProfileScreen`/`ReportDetailScreen` renderizarem
  listas. Ver §2.5/§2.6 atualizados.
- **D-D (produto, backend) — ✅ resolvida em 2026-07-08, aplicada como recomendado:**
  o backend não gerava mensagens `type: system` em nenhum evento — o enum existia, mas nada o
  emitia. Aplicado no escopo mínimo recomendado: `create_match` agora emite automaticamente uma
  `Message` de sistema só ao **criar a partida** (não replica as demais variações do mock). Ver
  §2.4 atualizado.

### Etapas de execução (ordem de dependência)

| # | Etapa | Repositório | Depende de | Status |
|---|---|---|---|---|
| 1 | Refinamentos de consistência do contrato (D-B, D-C, D-D) + fechar Fase 11/12 (CORS produção, hospedagem, purge de refresh tokens, logout de todos os dispositivos) | **Backend** | Decisões acima | ✅ **Concluída em 2026-07-08** — `../back/.status/roadmap.md` Fase 11 e 12 ambas 🟢. Nada bloqueia mais o início da Etapa 2 |
| 2 | Tipos TS alinhados ao contrato real (`PublicUser`/`MyProfile`, `MatchSummary`/`MatchDetail`) | **Front** | Etapa 1 (schemas finais) |
| 3 | Camada de adapters (`src/services/adapters/`) + cliente HTTP tipado (`src/services/api/`) + storage seguro de token | **Front** | Etapa 2 |
| 4 | Auth real: campo de idade no cadastro, fluxo register→login, `AuthContext` por trás da mesma interface pública, mas com API real | **Front** | Etapa 3 |
| 5 | Matches reais: listagem/detalhe/criação/entrar/sair, filtros de data e local, botão "encerrar partida", UI de aprovar pendente | **Front** | Etapa 3 |
| 6 | Mensagens reais: histórico paginado, envio sem timestamp gerado no cliente | **Front** | Etapa 3, decisão D-D |
| 7 | Avaliações reais: adapter de achatamento de critérios, tratamento de `average_rating` nulo | **Front** | Etapa 3, decisão D-B |
| 8 | Denúncias reais: `ReportsContext` migrado para ação (`archive`/`warn`/`ban`) em vez de status-alvo | **Front** | Etapa 3 |
| 9 | Hardening conjunto: teste manual ponta a ponta contra o backend local, apontar `.env` do front para a URL de produção decidida (`https://squadup-api.up.railway.app`), ajustar texto do TCC conforme decisão D-A | **Ambos** | Etapas 4–8 |

**URL de produção do backend (Railway):** `https://squadup-api.up.railway.app` — documentada em
2026-07-08 (`.status/plano-de-entrega.md` §2). É o valor de `EXPO_PUBLIC_API_URL` para a Etapa 9
acima e para o build de apresentação (EAS).

Etapas 4–8 são independentes entre si (todas dependem só da 3) e podem ser feitas em qualquer
ordem ou em paralelo — a ordem na tabela é só uma sugestão de prioridade (auth destrava tudo
que exige usuário logado; matches é o fluxo mais visado na demo).

## 7. Resumo executivo

- **Paridade boa hoje:** todos os enums (`Sport`, `ExperienceLevel`, `MatchStatus`,
  `ParticipationStatus`, `MessageType`, `ReportReason`, `ReportStatus`) têm exatamente os
  mesmos valores dos dois lados. Isso é o mais difícil de acertar depois e já está certo.
- **Maior risco de quebra silenciosa:** `Match` único no front vs `MatchRead`/`MatchDetailRead`
  separados no backend — código que hoje lê `match.participants` ou `match.organizer.name` a
  partir de uma listagem vai quebrar em runtime ao trocar o mock pela API real, sem erro de
  tipo nenhum se os tipos não forem ajustados antes.
- **Único contrato genuinamente incompatível (não é só nomenclatura):** ação de moderação de
  denúncia — front manda status-alvo, backend espera verbo de ação. (D14, ainda pendente no
  front — não depende de nada novo do backend.)
- **Único campo obrigatório sem input no front:** idade no cadastro. (D15, ainda pendente no
  front.)
- **Atualização de 2026-07-08:** as três discrepâncias de contrato que dependiam do backend
  (D-B/rated_user, D-C/MatchRef, D-D/mensagem de sistema) **foram todas resolvidas** — ver nota
  no topo do documento e §2.4/2.5/2.6. Os pontos que restam em aberto (D14, D15, e os itens
  13.1–13.9 do roadmap) são 100% trabalho do front; a Etapa 1 do plano mestre (pré-requisito de
  backend) está encerrada.
