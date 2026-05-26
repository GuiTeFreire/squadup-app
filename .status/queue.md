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
| Fase 2 — Fluxo de entrada | 8/8 ✅ | `feat/auth-flow` → `dev` |
| Refinamento visual | transversal ✅ | direto em `dev` (sessão 4 — 2026-05-25) |
| Fase 4 — Listagem e busca | 8/8 ✅ | `feat/home-matches` → `dev` (sessão 5 — 2026-05-25) |
| Fase 5 — Detalhes da partida | 6/6 ✅ | `feat/match-detail` → `dev` (sessão 6 — 2026-05-26) |

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

## FASE 4 — Listagem e busca de partidas ✅ Concluída — sessão 5 (2026-05-25)

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 4.1 | Expandir `AppNavigator` com Bottom Tabs completo | 🟢 | RootStack (tabs + modal Filters) · 4 abas com `MaterialCommunityIcons` |
| 4.2 | Criar tela `HomeScreen` com lista de partidas | 🟢 | FlatList + busca inline + botão de filtros com badge de contagem |
| 4.3 | Criar componente `MatchCard` | 🟢 | Badges sport/level/status, local, data, barra de vagas, organizador |
| 4.4 | Criar tela `SearchScreen` (Busca) | 🟢 | Campo dedicado + contador de resultados + EmptyState contextual |
| 4.5 | Criar tela/modal `FiltersScreen` (Filtros) | 🟢 | Modal nativo (presentation: modal) · chips sport/level + toggle vagas |
| 4.6 | Criar hook `useMatchFilters` | 🟢 | `applyFilters` puro + hook com `MatchFiltersContext` |
| 4.7 | Adicionar indicador visual de vagas | 🟢 | Barra colorida (verde/laranja/vermelho) + texto "X vagas disponíveis" |
| 4.8 | Escrever testes para `MatchCard` e `useMatchFilters` | 🟢 | 12 testes MatchCard + 11 testes applyFilters · 75 total passando |

---

## FASE 5 — Detalhes da partida ✅ Concluída — sessão 6 (2026-05-26)

| # | Tarefa | Status | Observação |
|---|--------|--------|------------|
| 5.1 | Criar tela `MatchDetailScreen` (Detalhes) | 🟢 | Header dark + ScrollView + info block + badges + organizador |
| 5.2 | Criar seção de participantes confirmados | 🟢 | Contador "X de Y" + `ParticipantList` |
| 5.3 | Criar componente `ParticipantList` | 🟢 | Confirmados com avatar/rating; pendentes com badge laranja |
| 5.4 | Implementar os 5 estados da tela | 🟢 | isMatchOver · confirmed · pending · isMatchFull · padrão |
| 5.5 | Criar botão contextual de participação | 🟢 | Bottom bar absoluta; handleJoin / handleCancel com Alert |
| 5.6 | Escrever testes para estados da tela | 🟢 | 11 testes — 5 estados + join + renderização + goBack + invalid id |

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
| D6 | AppNavigator incompleto | Média | Tem apenas a aba Home com dark styling. Expandir para 4 abas com ícones vetoriais na Fase 4 (tarefa 4.1). |
| D7 | expo-asset não instalado | Baixa | `@expo/vector-icons` depende de `expo-asset` em runtime, mas no Jest é mockado via `moduleNameMapper`. Se adicionar novos pacotes Expo que também dependam de `expo-asset`, instalar: `npx expo install expo-asset`. |

---

## Bloqueadores e observações

- Fase 5 concluída. Próxima sessão: branch `feat/user-profile` (Fase 3).
- Ponto exato de retomada: `src/screens/MyProfileScreen.tsx` — substituir placeholder (tarefa 3.1).
- `MatchDetailScreen` usa `useRoute<RouteProp<AppRootStackParamList, "MatchDetail">>()` para receber `matchId`.
- `CURRENT_USER` (Guilherme Freire, user-1) é usado como usuário logado — derivar status inicial via `match.participants.find(p => p.user.id === CURRENT_USER.id)`.
- `match-12` adicionado aos mocks (basquete avançado · full · Rafael + Beatriz) para cobrir o estado "lotada" em testes.

---

## Progresso geral

**Total de tarefas:** 70
**Concluídas:** 41 (fases numeradas) + refinamento visual transversal
**Em andamento:** 0
**A fazer:** 29
