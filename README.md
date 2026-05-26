# SquadUp — Front-end

Aplicativo mobile para conectar pessoas a partidas de esportes coletivos.
Protótipo navegável com dados mockados para apresentação acadêmica.

## Stack

- **React Native** 0.81.5 + **Expo** SDK 54
- **TypeScript** 5.9
- **NativeWind** v4 (Tailwind CSS para React Native)
- **React Navigation** v6 (Stack + Bottom Tabs)
- **@expo/vector-icons** — MaterialCommunityIcons para ícones vetoriais
- **Jest** + React Native Testing Library
- **ESLint** 9 (flat config) + **Prettier**

## Pré-requisitos

- Node.js >= 18
- npm >= 9
- Expo Go no dispositivo (iOS ou Android) **ou** emulador local

## Instalação

```bash
npm install
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor Expo |
| `npm run android` | Abre no emulador Android |
| `npm run ios` | Abre no simulador iOS (macOS) |
| `npm run test` | Executa a suíte de testes |
| `npm run lint` | Verifica erros de lint |
| `npm run lint:fix` | Corrige erros de lint automaticamente |

## Paleta de cores

| Token | Cor | Uso |
| --- | --- | --- |
| `primary` | `#2563EB` Electric Blue | CTAs, links, foco, elementos ativos |
| `secondary` | `#0F172A` Dark Slate | Header, tab bar, fundos escuros |
| `accent` | `#F97316` Orange | Badges de energia, destaques |

## Estrutura de pastas

```
src/
├── components/   # Componentes reutilizáveis (Button, Input, Card, Avatar…)
├── contexts/     # Context API (AuthContext)
├── hooks/        # Hooks customizados
├── mocks/        # Dados mockados (users, matches, ratings)
├── navigation/   # Navigators (AuthNavigator, AppNavigator, RootNavigator)
├── screens/      # Telas da aplicação
├── types/        # Tipos TypeScript globais
└── utils/        # Funções utilitárias
__mocks__/        # Mocks Jest (expo-vector-icons)
```

## Fluxo de navegação atual

```
App
└── RootNavigator
    ├── AuthNavigator  (não autenticado)
    │   ├── WelcomeScreen       ← dark slate + ícones vetoriais
    │   ├── LoginScreen
    │   ├── RegisterScreen
    │   └── ProfileSetupScreen
    └── AppNavigator   (autenticado)
        └── HomeScreen  ← placeholder, será expandido na Fase 4
```

## Autenticação (mock)

Não há backend. O `AuthContext` simula:

- **Login** — qualquer e-mail válido + senha ≥ 6 chars autentica como `Guilherme Mendes`
- **Cadastro** → `RegisterScreen` → `ProfileSetupScreen` → cria novo perfil em memória
- **Logout** — disponível na `HomeScreen`

## Status do projeto

| Fase | Descrição | Status |
| --- | --- | --- |
| 1 | Estrutura e design system | ✅ Concluída |
| 2 | Fluxo de autenticação | ✅ Concluída |
| — | Refinamento visual (Electric Blue + Dark Slate) | ✅ Concluído |
| 3 | Perfil do usuário | ⚪ A fazer |
| 4 | Listagem e busca de partidas | ⚪ **Próxima** |
| 5–12 | Demais fases | ⚪ A fazer |

**52 testes passando · lint zerado · 27/70 tarefas concluídas**

Ver [`.status/queue.md`](.status/queue.md) para a fila de tarefas e [`.status/progress.md`](.status/progress.md) para o histórico detalhado por sessão.
