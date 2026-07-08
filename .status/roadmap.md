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

**Progresso geral:** 69/70 tarefas concluídas (99%) · 181 testes passando · lint zerado · tsc zerado

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