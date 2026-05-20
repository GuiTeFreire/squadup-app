# SquadUp — Front-end

Aplicativo mobile para conectar pessoas a partidas de esportes coletivos.
Protótipo navegável com dados mockados para apresentação acadêmica.

## Stack

- **React Native** 0.81.5 + **Expo** SDK 54
- **TypeScript** 5.9
- **NativeWind** v4 (Tailwind CSS para React Native)
- **React Navigation** v6 (Stack + Bottom Tabs)
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

## Estrutura de pastas

```
src/
├── components/   # Componentes reutilizáveis (Button, Input, Card…)
├── contexts/     # Context API (AuthContext, MatchContext…)
├── hooks/        # Hooks customizados
├── mocks/        # Dados mockados (users, matches, ratings)
├── navigation/   # Navigators (AuthNavigator, AppNavigator)
├── screens/      # Telas da aplicação
├── types/        # Tipos TypeScript globais
└── utils/        # Funções utilitárias
```

## Status do projeto

Fase 1 em andamento — setup concluído, componentes base pendentes.
Ver [`.status/queue.md`](.status/queue.md) para a fila de tarefas e [`.status/progress.md`](.status/progress.md) para o histórico.
