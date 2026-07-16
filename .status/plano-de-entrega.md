# SquadUp — Plano de Entrega Final (App + Backend + TCC)

> Criado em 2026-07-08, a partir da leitura de `TCC.tex` (front), `.status/{vision,roadmap,queue,backend-contract}.md` (front) e `../back/.status/{vision,roadmap,queue}.md` (back). Documento vivo — atualizar conforme as trilhas avançam, mesmo padrão dos outros arquivos em `.status/`.
>
> **Onde estamos (atualizado em 2026-07-16, sessão 28):** o backend (`../back`, também acessível
> localmente como `squadup-back` numa das máquinas de trabalho) está com as Fases 1–12 concluídas,
> testado (113 testes, 99% cobertura) e **já deployado em produção no Railway**:
> `https://squadup-api.up.railway.app`. O front tem o protótipo visual 100% pronto (Fases 1–11
> concluídas, Fase 12 em 6/8) e **a Fase 13 (integração real) está 100% concluída (16/16)** —
> fundação, Auth real, Matches reais, Mensagens reais, Avaliações reais, Denúncias reais e o
> hardening/teste ponta a ponta (13.9, sessão 28, validado via chamadas diretas à API REST contra
> o backend local, cobrindo auth/matches/join/approve/close/chat/ratings/reports/RBAC — ver
> `progress.md` sessão 28 para o detalhe completo). Nenhum Context mockado resta no projeto. Trilha
> C (build) avançou parcialmente: `eas.json` criado com os três perfis, falta só `eas login` +
> `eas build:configure` (credenciais do usuário) para gerar o build de fato. Trilha D avançou:
> Playwright automatiza a captura de 8 das ~11 screenshots do app (`tcc/assets/app/`) — faltam as
> que dependem de `Alert.alert` (D11) e os prints de concorrentes (manuais). O `TCC.tex` segue como
> um **anteprojeto** (tempo futuro, "será implementado"), ainda não trazido para o repositório
> (D-TCC-1 em aberto) — Trilha E não avançou nesta sessão.

---

## 1. Visão geral: 5 trilhas, a maioria em paralelo

| Trilha | O quê | Depende de | Pode começar |
|---|---|---|---|
| **A — Deploy do backend** | Executar o deploy real no Railway | Nada — **✅ URL de produção já ativa** (`squadup-api.up.railway.app`) | Concluída (falta só a decisão de seed, §2) |
| **B — Integração front↔back** | Fase 13 do front (trocar mocks por API real) | Trilha A (precisa de uma URL real para apontar, mas pode começar contra `localhost` antes disso) | Concluída (16/16, sessão 28) |
| **C — Build e demo do app** | EAS Build / Expo Go para teste e apresentação | Trilha B razoavelmente avançada | Em andamento — `eas.json` pronto, falta login/build do usuário |
| **D — Assets do TCC** | Estrutura de pastas, prints, bibliografia, diagramas | Nada (screenshots podem ser tirados com os mocks atuais) | Em andamento — 8/~11 screenshots do app automatizadas (sessão 28) |
| **E — Escrita da monografia** | Capítulos novos/atualizados do TCC.tex | Parcialmente nada (casos de uso extras e arquitetura já documentável), parcialmente B/C (capítulo de resultados) | **Agora** para as partes que não dependem de resultado final |

Nenhuma trilha bloqueia totalmente as outras — dá para avançar em 3–4 frentes ao mesmo tempo.

---

## 2. Trilha A — Deploy do backend (Railway) — ✅ concluída em 2026-07-08

**URL de produção:** `https://squadup-api.up.railway.app` — este é o valor que `EXPO_PUBLIC_API_URL`
deve usar a partir da tarefa 13.2 (infraestrutura de API) e no fechamento 13.9 do front, e também
o valor de `env` no perfil `preview` do `eas.json` na Trilha C.

Passos originais, documentados em `../back/README.md` §"Deploy" e `../back/.status/queue.md`:

1. Criar projeto no Railway a partir do repositório GitHub `squadup-back` (branch `dev`, depois de decidir se `main` também será promovida — ver dívida técnica em `../back/.status/queue.md`).
2. Adicionar addon PostgreSQL.
3. Configurar variáveis de ambiente: `SECRET_KEY` (gerar um valor forte, nunca o placeholder de dev), `ENVIRONMENT=production`, `CORS_ORIGINS` (só relevante se o front rodar como web/Expo web — apps mobile nativos não são bloqueados por CORS).
4. Deploy dispara automaticamente via `Procfile` (`alembic upgrade head && uvicorn ...`) — já pronto, não precisa de configuração adicional.
5. Validar: `GET /health` público responde 200; rodar manualmente `python -m app.seed` (via shell do Railway) se quiser dados de exemplo para demonstração na defesa.
6. ~~Anotar a URL pública gerada~~ — ✅ feito: `squadup-api.up.railway.app`.

**Decisão a fechar:** vale a pena popular o banco de produção com dados de seed para a demo da defesa (usuários, partidas, avaliações fictícias e coerentes), ou a demo será feita 100% ao vivo (cadastro/criação na hora)? Recomendação: seed + 1 fluxo ao vivo — reduz risco de algo falhar durante a apresentação. (Ainda não confirmado se o passo 5 — `GET /health` e/ou `python -m app.seed` — já foi executado contra a URL de produção; validar antes de apontar o front para lá.)

---

## 3. Trilha B — Integração front↔back (Fase 13) — ✅ concluída em 2026-07-16 (sessão 28)

Detalhamento tarefa-a-tarefa em `.status/roadmap.md` §19 e `.status/backend-contract.md` §6
(16 tarefas, 13.1–13.9, todas 🟢). Resumo:

1. **13.1–13.3 (fundação):** tipos alinhados ao contrato real → cliente HTTP + adapters + storage seguro de token → React Query. Concluído (sessões 20–21).
2. **13.4–13.8:** Auth real (sessões 22–23), Matches reais (sessão 24, `feat/matches-real`), Mensagens reais (sessão 25, `feat/messages-real`), Avaliações reais (sessão 26, `feat/ratings-real`), Denúncias reais (sessão 27, `feat/reports-real`).
3. **13.9 (fechamento):** teste ponta a ponta validado via API real contra o backend local (sessão 28, branch `feat/organizer-actions-and-filters`, ainda não mergeada) — cobriu auth, matches (incluindo ações de organizador: encerrar/aprovar), chat, ratings, reports e RBAC de moderação. `.env` local reapontado para produção como validação adicional. Faltou só a navegação manual pela UI via dispositivo/browser interativo, que fica coberta pela mesma pendência da tarefa 12.3.

Este foi o maior bloco de trabalho do projeto — envolveu reescrever a camada de dados dos 6 Contexts originais (`AuthContext`, `MatchesContext`, `MatchFiltersContext`, `MessagesContext`, `RatingsContext`, `ReportsContext`); `MessagesContext`, `RatingsContext` e `ReportsContext` foram removidos por completo e substituídos por hooks de React Query (`useMessages`, `useRatings`, `useReports`), mantendo as interfaces públicas equivalentes para não precisar tocar (ou tocando o mínimo) nas telas.

Da Fase 12 do front, ainda restam:
- **12.3** — testar no Expo Go em dispositivo físico/emulador (ação do usuário).
- **12.8** — preparar build de apresentação (ver Trilha C) — em andamento.

---

## 4. Trilha C — Build e demo do app (em andamento, sessão 28)

`eas.json` **já criado** (sessão 28) com três perfis: `development` (client de dev, APK interno),
`preview` (APK interno, `EXPO_PUBLIC_API_URL` já apontando para produção) e `production`
(`autoIncrement`, mesma URL). Para a defesa, recomenda-se um **APK Android via EAS Build** em vez
de depender de Expo Go + rede durante a apresentação (menos pontos de falha ao vivo):

1. ~~`npx eas build:configure` (gera `eas.json`)~~ — ✅ feito manualmente (sessão 28), sem passar pelo comando interativo.
2. **Falta:** `npx eas login` (credenciais do usuário) + `eas build:configure` de fato (gera `projectId` em `app.json`, algo que a criação manual do `eas.json` não substitui).
3. `npx eas build --platform android --profile preview`.
4. Instalar o APK gerado num dispositivo Android para o dia da defesa (ou usar um emulador local como plano B).
5. iOS: opcional — exige conta Apple Developer paga; só perseguir se for um requisito da banca (normalmente não é).

**Decisão a fechar:** Android-only é suficiente para a defesa, ou a banca/orientador exige demonstrar iOS também?

---

## 5. Trilha D — Estrutura de assets do TCC

Hoje `TCC.tex` referencia arquivos que **não existem no repositório** (`assets/logo.png`, `assets/app/*.png`, `assets/hexagon_screen_*.jpeg`, `assets/meetup_screen.png`, `assets/peladeiros.jpeg`, `assets/strava.jpeg`, `references.bib`, `catalog.PDF`) — hoje eles só existem no Overleaf, então o `.tex` não compila fora de lá. `TCC.tex` está inclusive no `.gitignore` do front. Como você topa trazer isso para o repositório, a estrutura sugerida:

```
front/
├── tcc/                          ← pasta nova, dedicada (tira o TCC do meio do código do app)
│   ├── TCC.tex                   ← mover daqui da raiz
│   ├── references.bib            ← copiar do Overleaf
│   ├── catalog.pdf               ← ficha catalográfica (pedir à biblioteca da UNIRIO, chega tarde no processo)
│   └── assets/
│       ├── logo.png              ← logo oficial UNIRIO (baixar do site da universidade)
│       ├── arquitetura.png       ← diagrama da arquitetura (hoje comentado no .tex, linha ~945)
│       ├── er-diagrama.png       ← diagrama entidade-relacionamento (novo, ver abaixo)
│       ├── app/                  ← screenshots do próprio SquadUp (geráveis, ver abaixo)
│       │   ├── feed-principal.png
│       │   ├── criar-partida.png
│       │   ├── detalhes-partida.png
│       │   ├── detalhes-partida-2.png
│       │   ├── perfil.png
│       │   ├── denunciar.png
│       │   ├── login.png             ← novo (caso de uso de auth, ver Trilha E)
│       │   ├── cadastro.png          ← novo
│       │   ├── chat-partida.png      ← novo
│       │   ├── avaliacao.png         ← novo
│       │   └── moderacao.png         ← novo
│       └── concorrentes/         ← screenshots de apps de terceiros (manuais, não automatizáveis)
│           ├── hexagon_screen_1.jpeg
│           ├── hexagon_screen_3.jpeg
│           ├── hexagon_screen_4.jpeg
│           ├── meetup_screen.png
│           ├── peladeiros.jpeg
│           └── strava.jpeg
├── .gitignore                    ← trocar a linha "TCC.tex" por "tcc/*.pdf" (versionar o resto)
└── ... (resto do app, sem mudança)
```

Ajustar os `\includegraphics{assets/...}` do `.tex` para `\includegraphics{assets/app/...}` etc. já é o padrão que o próprio documento já usa (a maioria já está organizada assim) — só falta mover os arquivos físicos para bater com os caminhos.

### 5.1 — Screenshots do próprio app — 8/~11 automatizadas (sessão 28)

`@playwright/test` instalado e `scripts/capture-tcc-screenshots.ts` +
`scripts/playwright.config.ts` (viewport 393×852) criados. O script faz login **real** (contra a
API, não mais mockado — a Trilha B terminou antes desta etapa) com um usuário de teste e navega a
UI de verdade via `npm run web`. Já geradas em `tcc/assets/app/`: `welcome`, `login`,
`feed-principal`, `filtros`, `detalhes-partida`, `chat-partida`, `criar-partida`, `perfil`.

Ainda faltam (confirmada a ressalva prevista abaixo): `cadastro`, `avaliacao`, `denunciar`,
`moderacao` — telas cujo fluxo depende de `Alert.alert`, que não renderiza em `react-native-web`
(D11), então exigem um screenshot manual via Expo Go/emulador em vez do script.

Para rodar de novo (ex.: após uma mudança de design): `npm run web` de pé, um usuário de teste
cadastrado no backend apontado pelo `.env`, e `TCC_SCREENSHOT_PASSWORD="senha" npx playwright test
--config=scripts/playwright.config.ts`.

### 5.2 — Screenshots de concorrentes: manuais, ação do usuário

Hexagon Sports, Peladeiros, Meetup e Strava são apps/sites de terceiros — não há como automatizar a captura (e não tenho como navegar apps mobile de terceiros). Ação do usuário: tirar prints manuais e salvar em `tcc/assets/concorrentes/`.

### 5.3 — Diagrama ER: posso ajudar a gerar

O `.tex` já tem um placeholder comentado para um diagrama de arquitetura (linha ~945) e nenhum para o modelo de dados. Como o schema real já existe em `../back/app/models/*.py`, posso gerar um diagrama entidade-relacionamento (ex.: via Mermaid, exportado como PNG) a partir das tabelas reais (`User`, `Match`, `Participant`, `Message`, `Rating`, `Report`, `RefreshToken`) quando chegarmos à Trilha E — é trabalho técnico, não depende do Overleaf.

### 5.4 — Bibliografia

`references.bib` — copiar do Overleaf para `tcc/references.bib`. As chaves já citadas no texto (`pradal-cano_using_2020`, `wang_association_2019`, `crossman_facilitators_2024`, `gil-castineira_runwithus_2011`, `claudinus_sport_2020`) precisam ter entradas correspondentes; não tenho acesso ao conteúdo bibliográfico real para inventar essas entradas — só posso ajudar a formatar/organizar depois que o conteúdo vier do Overleaf.

---

## 6. Trilha E — Escrita da monografia

`TCC.tex` hoje é um anteprojeto (Capítulos 1–6, tempo futuro, sem capítulo de resultados). Para virar a monografia final, mapeei os gaps de conteúdo:

### 6.1 — Pode ser escrito **agora**, sem esperar nada
- **Casos de uso faltantes** (Capítulo 3): hoje só 6 estão documentados (buscar partidas, criar, detalhes, participar, perfil, denunciar), mas o front já tem telas e o back já tem endpoints para pelo menos mais 7: **cadastro/login** (autenticação), **cancelar participação**, **aprovar participante pendente** (organizador), **encerrar partida** (organizador), **conversar no chat da partida**, **avaliar usuário pós-partida**, **moderar denúncias** (admin: arquivar/advertir/banir). Cada um segue o mesmo template já usado (ator, pré/pós-condições, fluxo principal, fluxos alternativos, screenshot).
- **Correção da seção 4.6.5 "Geolocalização" e 4.7 "Local"** (decisão D-A já registrada em `.status/backend-contract.md` §5): ajustar o tempo verbal — hoje o texto afirma que geolocalização "foi utilizada" quando na verdade `location` é só uma string livre nos dois lados, sem lat/long. Mover para "trabalhos futuros" em vez de apagar — é uma limitação honesta, não um erro a esconder.
- **Seção de segurança/LGPD** (novo, Capítulo 4): JWT com rotação de refresh token, hash de senha via bcrypt, RBAC (admin vs. usuário), purge automático de tokens expirados — tudo já implementado e testado no back, só falta descrever.

### 6.2 — Precisa da Trilha A/B avançarem primeiro
- **Capítulo novo "Implementação, Testes e Validação"** (entre Arquitetura e Cronograma): stack final por camada, cobertura de testes automatizados (back: 113 testes/99% via `pytest-cov`; front: quantidade real de testes Jest), pipeline de CI (GitHub Actions — lint, type-check, testes, gate de cobertura, CodeQL, gitleaks, bandit, pip-audit), decisão de hospedagem (Railway) e por quê, teste manual ponta a ponta (depende da Trilha B estar concluída).
- **Cronograma (Capítulo 5) atualizado**: adicionar uma coluna de status real (concluído/em andamento/pendente) comparando com o planejado — mostra maturidade e controle de projeto para a banca.
- **Considerações Finais (Capítulo 6) reescritas**: hoje é prospectivo ("a proposta apresentada demonstra..."); precisa virar retrospectivo, reportando resultados reais alcançados, limitações encontradas (dívidas técnicas relevantes, ex. sem geolocalização real, sem chat em tempo real via WebSocket) e trabalhos futuros (a lista de "fora do escopo" já existe em `.status/roadmap.md` §17 do front — reaproveitar).

**Decisão a fechar:** houve (ou está planejado) algum teste de usabilidade com usuários reais além do orientador? O próprio cronograma do TCC prevê "Testes e validação dos fluxos" e "Validação com orientador" como etapas distintas — se não houver teste com usuários reais, o capítulo de resultados deve deixar isso explícito como limitação, em vez de omitir.

---

## 7. Sequenciamento sugerido (mapeado ao cronograma já aprovado no TCC)

O cronograma do próprio `TCC.tex` (Capítulo 5) já reserva Jul 2–Ago 2 para "Implementação do backend" (✅ concluído, adiantado) e Ago 2–Set 2 para "Integração entre frontend e backend" — ou seja, **estamos no ponto exato para começar a Trilha B agora**, dentro do prazo já formalmente aprovado.

| Período (do cronograma) | Foco |
|---|---|
| Agora – Ago 2 | Trilha B (13.1–13.4: fundação + Auth real) · Trilha A (deploy Railway, curto) · Trilha D (screenshots do app, começa em paralelo) · Trilha E.1 (casos de uso extras, correção D-A — escrita não bloqueada) |
| Ago 2 – Set 2 | Trilha B (13.5–13.9: matches/mensagens/avaliações/denúncias + teste ponta a ponta contra produção) · Trilha C (EAS build) |
| Set 1 – Set 2 | "Testes e validação dos fluxos" do cronograma — 12.3 (Expo Go em dispositivo) + validação ponta a ponta |
| Set 2 – Out 2 | "Validação com orientador e ajustes funcionais" · Trilha E.2 (capítulo de Implementação/Testes, agora com dados reais de CI/cobertura/deploy) |
| Out 1 – Nov 1 | Escrita da monografia (grosso do texto restante, cronograma atualizado, considerações finais) |
| Nov 1 – Nov 2 | Revisão final da monografia · bibliografia/ficha catalográfica fechadas |
| Nov 2 – Dez 1 | Correções finais · preparação da defesa (demo, roteiro, build final) |
| Dez 1 | Defesa |

---

## 8. Decisões a fechar (resumo)

- **D-Deploy-1:** popular o Railway de produção com dados de seed para a demo, ou demo 100% ao vivo? (Recomendação: seed + 1 fluxo ao vivo.)
- **D-Deploy-2:** Android-only no EAS Build é suficiente para a defesa, ou a banca exige iOS também? (Recomendação: Android-only, salvo exigência contrária.)
- **D-TCC-1:** trazer `TCC.tex`/assets/bibliografia para o repositório Git (estrutura da seção 5) em vez de manter só no Overleaf? (Você já indicou que sim para a bibliografia — recomendo estender para o pacote todo, por durabilidade e para eu poder editar diretamente.)
- **D-TCC-2:** houve ou está planejado teste de usabilidade com usuários reais (além do orientador)? Define se o capítulo de resultados reporta isso como dado ou como limitação.
- **D-A** (já registrada em `backend-contract.md`): geolocalização/"Local" como trabalho futuro — mantida como recomendação, só falta ajustar o texto (Trilha E.1).
