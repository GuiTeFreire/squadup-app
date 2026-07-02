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
| D5 | HomeScreen placeholder | ~~Média~~ **Resolvida** | Substituído na Fase 4 (sessão 5). |
| D6 | AppNavigator incompleto | ~~Média~~ **Resolvida** | 4 abas com ícones vetoriais criadas na Fase 4 (sessão 5). |
| D7 | expo-asset não instalado | Baixa | `@expo/vector-icons` depende de `expo-asset` em runtime, mas no Jest é mockado via `moduleNameMapper`. Se adicionar novos pacotes Expo que também dependam de `expo-asset`, instalar: `npx expo install expo-asset`. |
| D8 | Participação em partida local apenas | Média | `MatchDetailScreen.handleJoin` / `handleCancel` alteram só `useState` interno — mudança não persiste ao navegar. Fase 7 eleva para `MatchesContext` via `useMatchParticipation`. |
| D9 | `RateUserScreen.tsx:78` — `user` possivelmente `undefined` (tsc) | ~~Baixa~~ **Resolvida** | Causa: narrowing de `if (!match \|\| !user) return` no corpo do componente não se propaga para dentro do closure `handleSubmit` (limitação conhecida do TS com controle de fluxo em funções aninhadas). Corrigido repetindo o guard `if (!user) return;` no início de `handleSubmit`. `npx tsc --noEmit` limpo, lint zerado, 181/181 testes passando (sessão 14). |

---

## Bloqueadores e observações

- Fase 11 concluída (sessão 13 — 2026-07-02). D9 corrigida (sessão 14 — 2026-07-02). Próxima etapa: 12.1 (consistência visual) em diante.
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
**Concluídas:** 64 (fases numeradas) + refinamento visual transversal
**Em andamento:** 0
**A fazer:** 6 (Fase 12)
