# SquadUp — Fila de Tarefas Front-end

## Legenda
- ⚪ A fazer
- 🟡 Em andamento
- 🟢 Concluído
- 🔴 Bloqueado

---

## FASE 1 — Estrutura inicial do projeto

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 1.1 | Inicializar projeto com Expo + TypeScript | 🟢 | `expo@54`, `react-native@0.81.5` |
| 1.2 | Instalar e configurar NativeWind v4 | 🟢 | `tailwind.config.js`, `babel.config.js`, `metro.config.js` |
| 1.3 | Instalar React Navigation v6 (Stack + Bottom Tabs) | 🟢 | + dependências nativas do Expo |
| 1.4 | Definir estrutura de pastas | 🟢 | `src/{screens,components,hooks,mocks,types,utils,contexts,navigation}` |
| 1.5 | Definir tokens de design (cores, tipografia, espaçamentos) | 🟢 | Paleta no `tailwind.config.js` |
| 1.6 | Configurar Jest + React Native Testing Library | 🟢 | `jest-expo@54`, `npm run test` ok |
| 1.7 | Configurar ESLint + Prettier | 🟢 | ESLint 9 flat config, `npm run lint` zero erros |
| 1.8 | Criar componente `Button` | 🟢 | Variantes: primary, secondary, ghost; NativeWind; 7 testes |
| 1.9 | Criar componente `Input` | 🟢 | Label + mensagem de erro; 6 testes |
| 1.10 | Criar componente `Card` | 🟢 | Pressable opcional; 3 testes |
| 1.11 | Criar componente `Avatar` | 🟢 | Imagem + fallback iniciais; 4 testes |
| 1.12 | Criar componente `Badge` | 🟢 | Esporte (com emoji), nível, status; 6 testes |
| 1.13 | Criar componente `Header` | 🟢 | Título + botão voltar opcional; 4 testes |
| 1.14 | Criar componente `EmptyState` | 🟢 | Ícone + título + descrição + action slot; 6 testes |
| 1.15 | Criar componente `RatingStars` | 🟢 | Estrelas cheias/meia/vazia + valor numérico; 6 testes |
| 1.16 | Criar dados mockados — Usuários (`mocks/users.ts`) | 🟢 | 6 usuários com foto, nível, esportes, nota |
| 1.17 | Criar dados mockados — Partidas (`mocks/matches.ts`) | 🟢 | 11 partidas com todos os campos + estados variados |
| 1.18 | Criar dados mockados — Avaliações (`mocks/ratings.ts`) | 🟢 | 7 avaliações vinculadas a usuários e partidas |
| 1.19 | Criar arquivo de tipos TypeScript (`types/index.ts`) | 🟢 | `User`, `Match`, `Rating`, `Report`, `Sport`, `MatchStatus`, etc. |

---

## FASE 2 — Fluxo de entrada do usuário

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 2.1 | Criar navigator de autenticação (`AuthNavigator`) | ⚪ | Stack: Welcome → Login / Register → ProfileSetup |
| 2.2 | Criar tela `WelcomeScreen` (Boas-vindas) | ⚪ | Logo, slogan, botões Login e Cadastro |
| 2.3 | Criar tela `LoginScreen` | ⚪ | Email + senha, link para Cadastro, login mockado |
| 2.4 | Criar tela `RegisterScreen` (Cadastro) | ⚪ | Nome, email, senha, data de nascimento |
| 2.5 | Criar tela `ProfileSetupScreen` (Config. inicial) | ⚪ | Foto (visual), esportes favoritos, nível, localização aproximada |
| 2.6 | Criar `AuthContext` com estado global | ⚪ | Usuário logado, login/logout mockados |
| 2.7 | Implementar lógica de navegação condicional | ⚪ | Autenticado → AppNavigator; não autenticado → AuthNavigator |
| 2.8 | Escrever testes para `LoginScreen` | ⚪ | Renderização, validação de campos |

---

## FASE 3 — Perfil do usuário

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 3.1 | Criar tela `MyProfileScreen` (Meu perfil) | ⚪ | Foto, nome, bio, esportes, nível, nota, partidas, selos |
| 3.2 | Criar tela `EditProfileScreen` (Editar perfil) | ⚪ | Formulário editável + feedback de sucesso |
| 3.3 | Criar tela `PublicProfileScreen` (Perfil público) | ⚪ | Visão de outro usuário + avaliações recebidas + botão Denunciar |
| 3.4 | Criar componente `TrustBadges` | ⚪ | Selos: verificado, partidas concluídas, nota média |
| 3.5 | Criar componente `ReviewCard` | ⚪ | Avaliação recebida com nota, critério e comentário |
| 3.6 | Escrever testes para `PublicProfileScreen` | ⚪ | Renderização dos dados do usuário mock |

---

## FASE 4 — Listagem e busca de partidas

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 4.1 | Criar navigator principal com Bottom Tabs | ⚪ | Abas: Home, Busca, Criar Partida, Perfil |
| 4.2 | Criar tela `HomeScreen` com lista de partidas | ⚪ | FlatList com MatchCards usando dados mock |
| 4.3 | Criar componente `MatchCard` | ⚪ | Esporte, título, local, data, vagas, nível, organizador |
| 4.4 | Criar tela `SearchScreen` (Busca) | ⚪ | Input de busca por texto em tempo real |
| 4.5 | Criar tela/modal `FiltersScreen` (Filtros) | ⚪ | Esporte, data, nível, vagas disponíveis |
| 4.6 | Criar hook `useMatchFilters` | ⚪ | Lógica de filtragem sobre dados mock |
| 4.7 | Adicionar indicador visual de vagas | ⚪ | Barra de progresso ou badge (cheio / disponível) |
| 4.8 | Escrever testes para `MatchCard` e `useMatchFilters` | ⚪ | Renderização e lógica de filtro |

---

## FASE 5 — Detalhes da partida

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 5.1 | Criar tela `MatchDetailScreen` (Detalhes) | ⚪ | Todos os campos: esporte, local, data, hora, vagas, nível, organizador |
| 5.2 | Criar seção de participantes confirmados | ⚪ | Linha de avatares + contador |
| 5.3 | Criar componente `ParticipantList` | ⚪ | Lista de participantes com link para perfil público |
| 5.4 | Implementar os 5 estados da tela | ⚪ | Não participa / participa / lotada / pendente / encerrada |
| 5.5 | Criar botão contextual de participação | ⚪ | Texto e estilo mudam conforme estado |
| 5.6 | Escrever testes para estados da tela | ⚪ | Cada estado renderiza o botão correto |

---

## FASE 6 — Criação de partida

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 6.1 | Criar tela `CreateMatchScreen` (Criar partida) | ⚪ | Formulário com todos os campos do roadmap §8 |
| 6.2 | Implementar validação do formulário | ⚪ | Campos obrigatórios, formato de data/hora |
| 6.3 | Implementar feedback de sucesso | ⚪ | Toast ou tela de confirmação com resumo |
| 6.4 | Adicionar partida criada ao estado mock local | ⚪ | Via contexto ou estado global |
| 6.5 | Escrever testes para o formulário de criação | ⚪ | Validação e submissão |

---

## FASE 7 — Participação em partida

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 7.1 | Implementar ação "Participar de partida" | ⚪ | Atualiza estado mock, exibe feedback visual |
| 7.2 | Implementar ação "Cancelar participação" | ⚪ | Remove usuário da lista mock |
| 7.3 | Implementar estado "Aguardando aprovação" | ⚪ | Quando organizador exige aprovação |
| 7.4 | Criar hook `useMatchParticipation` | ⚪ | Encapsula lógica de participação |
| 7.5 | Escrever testes para fluxo de participação | ⚪ | Ações e mudança de estado |

---

## FASE 8 — Chat da partida

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 8.1 | Criar tela `MatchChatScreen` | ⚪ | FlatList de mensagens simuladas, invertida |
| 8.2 | Criar componente `MessageBubble` | ⚪ | Diferencia mensagem própria vs. outros participantes |
| 8.3 | Criar componente `ChatInput` | ⚪ | TextInput + botão enviar |
| 8.4 | Simular envio de mensagem no estado local | ⚪ | Mensagem aparece na lista sem backend |
| 8.5 | Adicionar mensagens de sistema (ex: "Partida amanhã!") | ⚪ | Visual diferenciado das mensagens normais |
| 8.6 | Escrever testes para `MessageBubble` | ⚪ | Renderização por tipo de mensagem |

---

## FASE 9 — Avaliação pós-partida

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 9.1 | Criar tela `PostMatchRatingScreen` (Lista para avaliar) | ⚪ | Participantes da partida passada |
| 9.2 | Criar tela `RateUserScreen` (Formulário de avaliação) | ⚪ | Critérios: pontualidade, respeito, comportamento, presença, exp. geral |
| 9.3 | Criar componente `StarRatingInput` | ⚪ | Input interativo de 1–5 estrelas por critério |
| 9.4 | Implementar feedback de avaliação enviada | ⚪ | Toast ou tela de confirmação |
| 9.5 | Escrever testes para `StarRatingInput` | ⚪ | Seleção de nota e callback |

---

## FASE 10 — Denúncia e segurança

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 10.1 | Criar tela `ReportUserScreen` (Denúncia) | ⚪ | Campos: motivo, descrição, partida relacionada |
| 10.2 | Implementar select de motivos de denúncia | ⚪ | Lista predefinida: comportamento, violência, spam, etc. |
| 10.3 | Implementar feedback de denúncia enviada | ⚪ | Confirmação visual com mensagem de suporte |
| 10.4 | Adicionar botão "Denunciar" no `PublicProfileScreen` | ⚪ | Navega para `ReportUserScreen` |
| 10.5 | Escrever testes para o formulário de denúncia | ⚪ | Validação e submissão |

---

## FASE 11 — Moderação (opcional)

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 11.1 | Criar tela `AdminDashboardScreen` (Lista de denúncias) | ⚪ | Acessível via rota oculta ou perfil admin no mock |
| 11.2 | Criar tela `ReportDetailScreen` (Detalhes da denúncia) | ⚪ | Informações + ações administrativas |
| 11.3 | Implementar ações mockadas (arquivar, advertir, banir) | ⚪ | Atualiza estado local com feedback visual |

---

## FASE 12 — Revisão e polimento final

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 12.1 | Revisar consistência visual entre todas as telas | ⚪ | Cores, espaçamentos, tipografia |
| 12.2 | Testar fluxo completo (happy path) | ⚪ | Welcome → Login → Home → Partida → Chat → Avaliação |
| 12.3 | Testar no Expo Go em iOS e Android | ⚪ | Dispositivo físico ou emulador |
| 12.4 | Verificar acessibilidade básica (`accessibilityLabel`, contraste) | ⚪ | |
| 12.5 | Executar `npm run lint` — zero erros | ⚪ | |
| 12.6 | Executar `npm run test` — zero falhas | ⚪ | |
| 12.7 | Revisar dados mockados para coerência narrativa | ⚪ | Usuários e partidas devem parecer reais e consistentes |
| 12.8 | Preparar build de apresentação (`expo build` ou EAS Build) | ⚪ | Verificar sem erros |

---

## Dívidas técnicas

| # | Item | Prioridade | Descrição |
|---|------|-----------|-----------|
| D1 | jest versão | ~~Média~~ **Resolvida** | Downgrade para `jest@29` + instalação direta de `babel-preset-expo` como devDep. 42 testes passando. |
| D2 | react-test-renderer | Baixa | Fixado em `19.1.0`; atualizar junto com `react` quando necessário. |
| D3 | react-native-screens | Baixa | Pinado em `~4.16.0` (SDK 54); verificar ao fazer upgrade de Expo SDK. |

---

## Bloqueadores e observações

- Fase 1 **concluída** (1.1–1.19 ✅). Branch `feat/design-system` em andamento.
- Próxima sessão: criar branch `feat/auth-flow` e implementar Fase 2 (AuthNavigator + WelcomeScreen + LoginScreen + RegisterScreen + ProfileSetupScreen + AuthContext).
- Nenhuma integração real com backend prevista nesta fase.

---

## Progresso geral

**Total de tarefas:** 70
**Concluídas:** 19
**Em andamento:** 0
**A fazer:** 51
