# SquadUp — Plano de Entrega Final (App + Backend + TCC)

> Criado em 2026-07-08, a partir da leitura de `TCC.tex` (front), `.status/{vision,roadmap,queue,backend-contract}.md` (front) e `../back/.status/{vision,roadmap,queue}.md` (back). Documento vivo — atualizar conforme as trilhas avançam, mesmo padrão dos outros arquivos em `.status/`.
>
> **Onde estamos:** o backend (`../back`) está com as Fases 1–12 concluídas, testado (113 testes, 99% cobertura) e **já deployado em produção no Railway**: `https://squadup-api.up.railway.app` (documentado em 2026-07-08 — ver §2). O front (`../front`) tem o protótipo visual 100% pronto (Fases 1–11 concluídas, Fase 12 em 6/8) mas **ainda não consome a API real** — é 100% mockado. A Fase 13 (integração real) é 0/16 e é o maior bloco de trabalho que resta; agora já tem uma URL de produção real para apontar (`EXPO_PUBLIC_API_URL`), não só `localhost`. O `TCC.tex` está escrito como um **anteprojeto** (tempo futuro, "será implementado"), não como a monografia final — falta reescrever boa parte para refletir o que foi de fato construído, e os assets (prints, bibliografia) hoje só existem no Overleaf, fora do repositório.

---

## 1. Visão geral: 5 trilhas, a maioria em paralelo

| Trilha | O quê | Depende de | Pode começar |
|---|---|---|---|
| **A — Deploy do backend** | Executar o deploy real no Railway | Nada — **✅ URL de produção já ativa** (`squadup-api.up.railway.app`) | Concluída (falta só a decisão de seed, §2) |
| **B — Integração front↔back** | Fase 13 do front (trocar mocks por API real) | Trilha A (precisa de uma URL real para apontar, mas pode começar contra `localhost` antes disso) | **Agora**, em paralelo com A |
| **C — Build e demo do app** | EAS Build / Expo Go para teste e apresentação | Trilha B razoavelmente avançada | Depois de B |
| **D — Assets do TCC** | Estrutura de pastas, prints, bibliografia, diagramas | Nada (screenshots podem ser tirados com os mocks atuais) | **Agora**, em paralelo com tudo |
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

## 3. Trilha B — Integração front↔back (Fase 13)

Detalhamento tarefa-a-tarefa já existe em `.status/roadmap.md` §19 e `.status/backend-contract.md` §6 (16 tarefas, 13.1–13.9). Aqui só a visão executiva e a ordem sugerida:

1. **13.1–13.3 (fundação, sequencial):** tipos alinhados ao contrato real → cliente HTTP + adapters + storage seguro de token → React Query. Isso é pré-requisito de tudo abaixo.
2. **13.4–13.8 (independentes entre si, podem ser paralelas ou em qualquer ordem):** Auth real, Matches reais, Mensagens reais, Avaliações reais, Denúncias reais. Sugestão de prioridade: **Auth primeiro** (destrava telas que exigem usuário logado), depois **Matches** (fluxo mais visado numa demo).
3. **13.9 (fechamento):** teste manual ponta a ponta contra o backend local primeiro, depois contra a URL de produção do Railway (`https://squadup-api.up.railway.app`, Trilha A já concluída); ajustar `EXPO_PUBLIC_API_URL`.

Este é o maior bloco de trabalho restante do projeto — envolve reescrever a camada de dados dos 6 Contexts (`AuthContext`, `MatchesContext`, `MatchFiltersContext`, `MessagesContext`, `RatingsContext`, `ReportsContext`) por dentro, mantendo as interfaces públicas para não precisar tocar nas telas.

Junto disso, fechar a Fase 12 do front que ainda falta:
- **12.3** — testar no Expo Go em dispositivo físico/emulador (ação do usuário).
- **12.8** — preparar build de apresentação (ver Trilha C).

---

## 4. Trilha C — Build e demo do app

Hoje não existe `eas.json` nem configuração de build no projeto. Para a defesa, recomenda-se um **APK Android via EAS Build** em vez de depender de Expo Go + rede durante a apresentação (menos pontos de falha ao vivo):

1. `npx eas login` + `npx eas build:configure` (gera `eas.json`).
2. Perfil de build `preview` (APK direto, sem passar pela Play Store) apontando para a URL de produção do Railway — `EXPO_PUBLIC_API_URL=https://squadup-api.up.railway.app` via `eas.json` → `env`.
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

### 5.1 — Screenshots do próprio app: automatizáveis, e podem começar já

Como o front já roda via `expo start --web` (react-native-web, usado pelos testes Jest) e ainda está 100% mockado, **os screenshots podem ser gerados agora, sem esperar a Trilha B** — os dados mockados já são coerentes o suficiente para uma captura de tela apresentável.

Sugestão de ferramenta: **Playwright**, rodando contra `npm run web`, navegando pelas telas via a própria UI (ou com rotas diretas, se a navegação permitir) e tirando screenshot em viewport fixo (ex.: 393×852, proporção de celular) para consistência visual entre todas as imagens.

- Instalar: `npm install -D @playwright/test` (não existe hoje no `package.json`).
- Script novo, ex. `scripts/capture-tcc-screenshots.ts`: abre a página, faz login mockado, navega para cada tela-alvo, tira o screenshot, salva em `tcc/assets/app/`.
- Ressalva conhecida (dívida técnica D11 do front): `Alert.alert` não renderiza em `react-native-web` — telas que dependem de um Alert para mostrar algo (parte do fluxo de denúncia/avaliação) podem precisar de um screenshot manual via Expo Go/emulador em vez do script.

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
