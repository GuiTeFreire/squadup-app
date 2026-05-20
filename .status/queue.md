# SquadUp — Fila de Tarefas Front-end

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
| Fase 2 — Fluxo de entrada | 8/8 ✅ | `feat/auth-flow` (pronta para merge) |

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

## FASE 4 — Listagem e busca de partidas ← próxima sessão

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 4.1 | Expandir `AppNavigator` com Bottom Tabs completo | ⚪ | Abas: Home, Busca, Criar Partida, Perfil |
| 4.2 | Criar tela `HomeScreen` com lista de partidas | ⚪ | FlatList com MatchCards usando dados mock (substitui placeholder) |
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
| D1 | jest versão | ~~Média~~ **Resolvida** | Downgrade para `jest@29` + instalação direta de `babel-preset-expo`. 52 testes passando. |
| D2 | react-test-renderer | Baixa | Fixado em `19.1.0`; atualizar junto com `react` quando necessário. |
| D3 | react-native-screens | Baixa | Pinado em `~4.16.0` (SDK 54); verificar ao fazer upgrade de Expo SDK. |
| D4 | Line endings CRLF | Baixa | Windows gera CRLF; Prettier exige LF. Solução atual: `npm run lint:fix` ao final de cada sessão. Solução definitiva: adicionar `.editorconfig` com `end_of_line = lf`. |
| D5 | HomeScreen placeholder | Média | `src/screens/HomeScreen.tsx` é um stub — substituir na Fase 4 (tarefa 4.2). |
| D6 | AppNavigator incompleto | Média | Atualmente tem apenas a aba Home. Expandir para 4 abas na Fase 4 (tarefa 4.1). |

---

## Bloqueadores e observações

- Branch `feat/auth-flow` pronta para merge em `dev` (merge commit no-ff recomendado).
- Próxima sessão: branch `feat/home-matches` implementando Fase 4 completa.
- Ordem sugerida para Fase 4: AppNavigator → HomeScreen → MatchCard → SearchScreen → FiltersScreen → useMatchFilters → testes.
- Nenhuma integração real com backend prevista nesta fase.

---

## Progresso geral

**Total de tarefas:** 70
**Concluídas:** 27
**Em andamento:** 0
**A fazer:** 43
