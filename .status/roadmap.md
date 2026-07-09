# SquadUp — Roadmap Inicial do Front-end

## Status de execução (atualizado em 2026-07-02, sessão 17)

| Fase | Descrição | Status |
|------|-----------|--------|
| Fase 1 | Estrutura inicial do projeto | 🟢 Concluída (19/19 tarefas) |
| Fase 2 | Fluxo de entrada do usuário | 🟢 Concluída (8/8 tarefas) |
| — | Refinamento visual (Electric Blue + Dark Slate) | 🟢 Concluído (transversal — sessão 4) |
| Fase 4 | Listagem e busca de partidas | 🟢 Concluída (8/8 tarefas — sessão 5) |
| Fase 5 | Detalhes da partida | 🟢 Concluída (6/6 tarefas — sessão 6) |
| Fase 3 | Perfil do usuário | 🟢 Concluída (6/6 tarefas — sessão 7) |
| Fase 6 | Criação de partida | 🟢 Concluída (5/5 tarefas — sessão 8) |
| Fase 7 | Participação em partida | 🟢 Concluída (5/5 tarefas — sessão 9) |
| Fase 8 | Chat da partida | 🟢 Concluída (6/6 tarefas — sessão 10) |
| Fase 9 | Avaliação pós-partida | 🟢 Concluída (5/5 tarefas — sessão 11) |
| Fase 10 | Denúncia e segurança | 🟢 Concluída (5/5 tarefas — sessão 12) |
| Fase 11 | Moderação (opcional) | 🟢 Concluída (3/3 tarefas — sessão 13) |
| — | Redesign visual premium (theme module, elevação, cor por esporte) | 🟢 Concluído (transversal — sessão 16) |
| Fase 12 | Revisão e polimento final | 🟡 Em andamento (6/8 — 12.1, 12.2, 12.4–12.7 concluídas, sessão 17) |
| Fase 13 | Integração com o backend real | 🟡 Em andamento (6/16 — 13.1 concluída sessão 20; 13.2 e 13.3 completas — itens 3–6 — sessão 21) |

**Progresso geral:** 75/86 tarefas concluídas (87%) · 218 testes passando · lint zerado · tsc zerado

Stack confirmada: React Native 0.81.5 · Expo SDK 54 · TypeScript · NativeWind v4 · React Navigation v6 · @expo/vector-icons (MaterialCommunityIcons)

---

## 1. Objetivo do roadmap

Este roadmap organiza a construção inicial do front-end do SquadUp em uma ordem lógica de desenvolvimento. A prioridade é criar um protótipo navegável que represente os principais casos de uso do sistema e demonstre a proposta do produto.

Nesta fase, o desenvolvimento será focado em telas, navegação, componentes visuais e dados mockados.

## 2. Estratégia de desenvolvimento

A construção do front-end será realizada de forma incremental, começando pela estrutura base do aplicativo e evoluindo para os fluxos principais.

A ordem de desenvolvimento segue a lógica:

1. estruturar o projeto;
2. criar navegação;
3. construir autenticação visual;
4. criar perfil do usuário;
5. listar partidas;
6. detalhar partidas;
7. criar partidas;
8. participar de partidas;
9. adicionar interação social;
10. adicionar confiança, avaliação e denúncia.

## 3. Fase 1 — Estrutura inicial do projeto

### Objetivo

Criar a base técnica e visual do aplicativo.

### Tarefas

- Criar projeto React Native;
- Configurar estrutura de pastas;
- Configurar navegação;
- Criar tema base;
- Definir cores, espaçamentos e tipografia;
- Criar componentes reutilizáveis iniciais.

### Componentes iniciais

- Button;
- Input;
- Card;
- Avatar;
- Badge;
- ScreenContainer;
- Header;
- EmptyState;
- RatingDisplay.

### Resultado esperado

Aplicativo inicial rodando com navegação básica e identidade visual mínima.

## 4. Fase 2 — Fluxo de entrada do usuário

### Casos de uso contemplados

- Cadastrar-se no sistema;
- Realizar login;
- Configurar perfil inicial.

### Telas

- Tela de boas-vindas;
- Tela de login;
- Tela de cadastro;
- Tela de configuração inicial de perfil.

### Funcionalidades simuladas

- Login mockado;
- Cadastro mockado;
- Seleção de esportes favoritos;
- Seleção de nível de experiência;
- Cadastro de localização aproximada;
- Upload visual de foto, sem integração real.

### Resultado esperado

Usuário consegue navegar do início do aplicativo até a tela principal após simular cadastro ou login.

## 5. Fase 3 — Perfil do usuário

### Casos de uso contemplados

- Editar perfil;
- Visualizar perfil;
- Visualizar reputação.

### Telas

- Meu perfil;
- Editar perfil;
- Perfil público de outro usuário.

### Informações exibidas

- Foto;
- Nome;
- Bio;
- Localização aproximada;
- Esportes favoritos;
- Nível de experiência;
- Nota média;
- Quantidade de partidas concluídas;
- Selos de confiança;
- Avaliações recebidas.

### Resultado esperado

O protótipo deve demonstrar que o perfil é um elemento central para gerar confiança entre usuários.

## 6. Fase 4 — Listagem e busca de partidas

### Casos de uso contemplados

- Buscar partidas;
- Filtrar partidas;
- Visualizar partidas próximas.

### Telas

- Home com lista de partidas;
- Tela de busca;
- Tela de filtros.

### Informações da partida no card

- Nome ou título da partida;
- Esporte;
- Local;
- Data;
- Horário;
- Vagas disponíveis;
- Nível da partida;
- Organizador;
- Participantes confirmados.

### Filtros previstos

- Esporte;
- Data;
- Localização;
- Nível;
- Partidas com vagas disponíveis.

### Resultado esperado

Usuário consegue visualizar partidas disponíveis e filtrar oportunidades compatíveis com seu interesse.

## 7. Fase 5 — Detalhes da partida

### Casos de uso contemplados

- Visualizar detalhes da partida;
- Visualizar participantes;
- Participar de partida.

### Tela

- Detalhes da partida.

### Informações exibidas

- Esporte;
- Local;
- Data;
- Horário;
- Número de vagas;
- Descrição;
- Nível da partida;
- Organizador;
- Lista de participantes;
- Reputação dos participantes;
- Botão para participar.

### Estados da tela

- Usuário ainda não participa;
- Usuário já participa;
- Partida lotada;
- Participação pendente de aprovação;
- Partida encerrada.

### Resultado esperado

Usuário entende claramente se a partida é adequada para ele e consegue simular participação.

## 8. Fase 6 — Criação de partida

### Casos de uso contemplados

- Criar partida.

### Tela

- Criar partida.

### Campos do formulário

- Modalidade esportiva;
- Título da partida;
- Local;
- Data;
- Horário;
- Quantidade máxima de participantes;
- Nível da partida;
- Descrição;
- Permitir iniciantes;
- Exigir aprovação do organizador.

### Resultado esperado

Usuário consegue preencher visualmente os dados necessários para criar uma partida e visualizar feedback de sucesso.

## 9. Fase 7 — Participação em partida

### Casos de uso contemplados

- Participar de partida;
- Cancelar participação;
- Confirmar presença.

### Telas/elementos

- Botão de participar;
- Estado de participação confirmada;
- Estado de solicitação pendente;
- Confirmação de presença;
- Cancelamento de participação.

### Resultado esperado

O protótipo deve representar o fluxo de entrada do usuário em uma partida e sua mudança de status.

## 10. Fase 8 — Chat da partida

### Casos de uso contemplados

- Conversar no grupo da partida.

### Tela

- Chat da partida.

### Funcionalidades simuladas

- Lista de mensagens;
- Campo para envio de mensagem;
- Identificação dos participantes;
- Mensagens do organizador;
- Avisos da partida.

### Resultado esperado

Usuário consegue visualizar como a comunicação entre participantes aconteceria dentro do aplicativo.

## 11. Fase 9 — Avaliação pós-partida

### Casos de uso contemplados

- Avaliar usuário.

### Telas

- Lista de participantes para avaliar;
- Formulário de avaliação;
- Confirmação de avaliação enviada.

### Critérios de avaliação

- Pontualidade;
- Respeito;
- Comportamento;
- Presença;
- Experiência geral.

### Resultado esperado

O protótipo deve demonstrar como a reputação dos usuários será construída a partir de avaliações pós-partida.

## 12. Fase 10 — Denúncia e segurança

### Casos de uso contemplados

- Denunciar usuário;
- Denunciar comportamento inadequado.

### Telas

- Formulário de denúncia;
- Confirmação de denúncia enviada.

### Campos

- Motivo da denúncia;
- Descrição;
- Partida relacionada;
- Usuário denunciado.

### Resultado esperado

O protótipo deve mostrar que o SquadUp considera segurança e moderação como partes importantes da experiência.

## 13. Fase 11 — Tela administrativa simples

### Casos de uso contemplados

- Moderar denúncias.

### Observação

Esta etapa pode ser opcional para o primeiro protótipo, mas é útil para demonstrar preocupação com segurança.

### Tela

- Lista de denúncias pendentes;
- Detalhes da denúncia;
- Ações administrativas simuladas.

### Ações

- Arquivar denúncia;
- Advertir usuário;
- Suspender usuário;
- Banir usuário.

### Resultado esperado

Representar, ainda que de forma simples, que denúncias não ficam sem tratamento dentro do sistema.

## 14. Ordem sugerida de implementação

A ordem recomendada de implementação é:

1. Estrutura inicial do projeto;
2. Design system básico;
3. Navegação;
4. Boas-vindas;
5. Login;
6. Cadastro;
7. Configuração inicial de perfil;
8. Meu perfil;
9. Home com partidas;
10. Filtros de partidas;
11. Detalhes da partida;
12. Participar de partida;
13. Criar partida;
14. Perfil público de usuário;
15. Chat da partida;
16. Avaliação pós-partida;
17. Denúncia de usuário;
18. Moderação simples;
19. Ajustes visuais;
20. Revisão do fluxo completo.

## 15. MVP visual para apresentação acadêmica

Para a apresentação inicial, o protótipo deve priorizar as seguintes telas:

1. Tela de boas-vindas;
2. Tela de cadastro/login;
3. Tela de configuração de perfil;
4. Home com partidas próximas;
5. Detalhes da partida;
6. Criar partida;
7. Perfil do usuário;
8. Chat da partida;
9. Avaliação pós-partida;
10. Denúncia de usuário.

Essas telas são suficientes para demonstrar os três pilares do SquadUp:

- Social;
- Logístico;
- Saúde.

## 16. Critérios de aceite do protótipo

O protótipo inicial será considerado adequado se:

- permitir navegação entre as principais telas;
- representar a proposta social do aplicativo;
- demonstrar como o usuário encontra uma partida;
- demonstrar como o usuário cria uma partida;
- demonstrar mecanismos de confiança;
- utilizar dados mockados coerentes;
- possuir visual consistente;
- estar adequado para apresentação acadêmica.

## 17. Fora do escopo inicial

Nesta primeira etapa não será necessário implementar:

- backend real;
- autenticação real;
- banco de dados;
- geolocalização real;
- chat em tempo real;
- notificações push;
- upload real de imagem;
- moderação real;
- avaliações persistidas;
- integração com mapas.

Esses recursos poderão ser desenvolvidos posteriormente em PG2.

## 18. Próxima evolução após o protótipo

> **Backend já existe e está adiantado** (`../back`, FastAPI + SQLModel): auth JWT, matches,
> mensagens, ratings e reports já persistidos e testados. Antes de iniciar a integração,
> consultar `.status/backend-contract.md` (comparação completa de contrato, sessão 18) e as
> dívidas D14–D18 em `.status/queue.md`.

Após a validação das telas, as próximas etapas serão:

- refinar os casos de uso;
- modelar banco de dados;
- definir contratos da API;
- implementar backend com FastAPI;
- integrar frontend com backend;
- testar fluxos principais;
- preparar versão funcional do MVP.

---

## 19. Fase 13 — Integração com o backend real

> Detalhamento tarefa-a-tarefa do plano mestre em `.status/backend-contract.md` §6. **Etapa 1
> (backend) concluída em 2026-07-08** — `../back/.status/roadmap.md` Fase 11 e 12 ambas 🟢 —
> então esta fase já pode começar. As sub-fases 13.4–13.8 são independentes entre si (todas
> dependem só de 13.2/13.3) e podem ser feitas em qualquer ordem.

### Objetivo

Substituir os seis Contexts mockados (`AuthContext`, `MatchesContext`, `MatchFiltersContext`,
`MessagesContext`, `RatingsContext`, `ReportsContext`) por consumo real da API do backend,
mantendo as mesmas interfaces públicas de hook sempre que possível, para minimizar mudanças nas
telas.

### 13.1 — Tipos alinhados ao contrato real

- Dividir `types.User` em `PublicUser` (dados públicos) e `MyProfile extends PublicUser { email, role }`;
- Dividir `types.Match` em `MatchSummary` (`organizerId`, `confirmedCount`, `availableSlots`) e
  `MatchDetail extends MatchSummary` (`organizer`, `participants`);
- Ajustar `Rating`/`Report` para refletir o shape real (`raterUser`→`rater` só se o backend
  aplicar D-B; `ratedUser`/`match` viram opcionais ou removidos conforme decisão D-B/D-C do
  backend);
- Rodar `npx tsc --noEmit` e ajustar todos os usos quebrados pelos novos tipos (esperado —
  é o objetivo do exercício: expor em tempo de compilação todo lugar que assumia o shape antigo).

### 13.2 — Camada de infraestrutura de API

- Criar `src/services/api/client.ts`: wrapper de `fetch` tipado, parse de
  `{ detail: { code, message } }`, anexação de `Authorization: Bearer`;
- Criar `src/services/adapters/`: funções puras de conversão (`toUser`, `toMatchSummary`,
  `toRatingPayload`, etc.) isolando `snake_case↔camelCase` e achatamento/expansão de objetos;
- Criar módulo de storage seguro de token com `expo-secure-store` (não `AsyncStorage` — dado
  sensível, CLAUDE.md §4);
- Adicionar `expo-secure-store` às dependências (`npx expo install expo-secure-store`);
- Configurar `EXPO_PUBLIC_API_URL` via variável de ambiente (`.env` + `app.config.ts`), com um
  `.env.example` versionado (mesmo padrão já usado em `../back`) — **atenção:** `localhost` não
  funciona a partir de um dispositivo físico ou emulador via Expo Go, que não alcançam o
  `localhost` da máquina de desenvolvimento; usar o IP da rede local (`http://192.168.x.x:8000`)
  ou o túnel do Expo (`expo start --tunnel`) ao testar fora do `npm run web`;
- **Backend já deployado em produção** (2026-07-08): `https://squadup-api.up.railway.app` — é o
  valor de `EXPO_PUBLIC_API_URL` para builds de apresentação/produção (13.9, Trilha C do
  `plano-de-entrega.md`); ambiente local continua usando o IP de rede acima durante o
  desenvolvimento das tarefas 13.4–13.8.

### 13.3 — React Query

- Instalar `@tanstack/react-query` (já previsto no CLAUDE.md §2, nunca instalado até aqui);
- Configurar `QueryClientProvider` no root do app (`App.tsx`);
- Definir convenção de query keys (`["matches", filters]`, `["match", id]`, `["ratings", userId]`, etc.).

### 13.4 — Auth real

- Adicionar campo de **idade** ao fluxo de cadastro (`RegisterScreen` ou `ProfileSetupScreen`) — hoje
  não existe input nenhum e `age` é obrigatório no backend (D15);
- Reescrever `AuthContext` por dentro para chamar `POST /auth/register` → `POST /auth/login` em
  sequência (registro não retorna token), mantendo a mesma assinatura pública (`login`,
  `register`, `completeProfile`, `logout`) para não alterar telas;
- Salvar `access_token`/`refresh_token` no storage seguro (13.2) após login;
- Interceptor de refresh automático em 401 no cliente HTTP (13.2), usando `POST /auth/refresh`;
- Tela de boot: ao abrir o app, tentar `GET /auth/me` com token salvo antes de mostrar `WelcomeScreen`;
- `logout()` deve chamar `POST /auth/logout` com o refresh token antes de limpar o estado local.

### 13.5 — Matches reais

- `MatchesContext`/`MatchFiltersContext` → hooks de React Query contra `GET /matches` (com filtros
  `sport`/`date`/`location`/`level`/`has_open_slots`);
- Adicionar filtro de **data** e **localização** em `FiltersScreen`/`MatchFiltersContext` (D18 — o
  backend já aceita, o front nunca expôs);
- `MatchDetailScreen` busca `MatchDetail` sob demanda via `GET /matches/{id}`;
- `CreateMatchScreen` envia só o payload de criação (`POST /matches`), deixando o backend gerar
  `id`/`organizer`/`status`/`participants`;
- `useMatchParticipation` migra `join`/`cancel` para `POST /matches/{id}/join` e `/leave`;
- Adicionar botão **"Encerrar partida"** em `MatchDetailScreen`, visível só para o organizador
  quando `status` é `open`/`full`, chamando `POST /matches/{id}/close` (D17);
- Adicionar UI de **aprovar solicitação pendente** para o organizador (lista de `pending` com ação
  por item), chamando `POST /matches/{id}/participants/{userId}/approve` (D17).

### 13.6 — Mensagens reais

- `MessagesContext` → React Query (`GET`/`POST /matches/{id}/messages`);
- `sendMessage` para de gerar `createdAt` no cliente — usa o valor devolvido pelo `POST` (resolve D12);
- `MatchChatScreen` ganha paginação (`skip`/`limit`, máx. 100 por página) em vez de carregar tudo de uma vez;
- Comportamento de mensagens de sistema decidido conforme D-D do backend (`backend-contract.md` §6).

### 13.7 — Avaliações reais

- `RatingsContext` → React Query contra `POST /matches/{id}/ratings/{userId}` e `GET /users/{id}/ratings`;
- Adapter achata `RatingCriteria` em campos soltos ao enviar, e (se D-B for aplicado no backend)
  reagrupa ao ler;
- `RatingStars`/telas de perfil tratam `averageRating` nulo (usuário sem avaliações) em vez de
  assumir sempre um número.

### 13.8 — Denúncias reais

- `ReportsContext.updateReportStatus(reportId, status)` → `updateReportStatus(reportId, action)`,
  onde `action` é `"archive" | "warn" | "ban"`, alinhado a `PATCH /reports/{id}` (D14 — único
  contrato genuinamente quebrado encontrado na comparação);
- `AdminDashboardScreen`/`ReportDetailScreen` atualizados para os três verbos de ação;
- `ReportUserScreen` envia só `{ reported_user_id, match_id?, reason, description }` via
  `POST /reports` (reporter vem do JWT).

### 13.9 — Hardening conjunto e fechamento

- Teste manual ponta a ponta (welcome → login → home → partida → chat → avaliação → denúncia)
  contra o backend rodando localmente;
- Apontar `EXPO_PUBLIC_API_URL` para a URL de produção decidida (`../back`, Fase 12);
- Ajustar a redação do TCC conforme a decisão D-A (geolocalização/"Local") antes da defesa;
- Remover `src/mocks/*.ts` **só depois** que todas as telas estiverem consumindo dados reais —
  manter como fallback/seed de testes de componente até lá (os testes Jest continuam usando os
  mocks como fixtures, isso não muda).