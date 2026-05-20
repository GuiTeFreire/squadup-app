# Front-end Development Guidelines

## 0. Before Anything Else

Read these files at the start of **every session**, in this order:
1. `.status/vision.md` — what the project is and the real stack
2. `.status/roadmap.md` — technical debt and priorities
3. `.status/queue.md` — active tasks and blockers

Update `.status/queue.md` when starting or finishing a task. Run `/update-status` at the end of the session to sync `progress.md`, `roadmap.md`, and `queue.md`.

---

## 1. Context & State
- **Always consult the `.status/` folder (vision, roadmap, queue) before proposing changes.
- **Maintain a single source of truth for API contracts by referencing the backend schemas.

## 2. Technical Stack & UI
- **Core:** React Native + Expo + TypeScript.
- **Styling:** NativeWind v4 (Tailwind CSS syntax para React Native).
- **Navigation:** React Navigation v6 (Stack + Bottom Tabs).
- **State Management:** Context API/Zustand para estado local; React Query (TanStack) para estado de servidor quando houver backend.
- **Commits:** Suggest **Conventional Commits** after completing a task or significant logical change.
- **Architecture:** Decouple UI components from business logic. Use "Dumb Components" for pure presentation.
- **Mocking:** Use mock data for UI development if the API is pending or unstable.

## 3. Engineering Quality
- **Definition of Done:** A task is only complete if it includes passing tests (Jest + React Native Testing Library).
- **Complexity:** Max 500 lines per file. Max 3 levels of nested logic (cyclomatic complexity).
- **Optimization:** Use `memo`, `useMemo`, and `useCallback` for expensive renders or lists.
- **DRY:** Extract shared logic into custom hooks or utility functions.

## 4. Security & Privacy (LGPD)
- **PII:** Never log or store Personally Identifiable Information in AsyncStorage/Console.
- **Sanitization:** Sanitize all user inputs before processing.
- **Principles:** Implement RBAC (Role-Based Access Control) and Least Privilege for API calls.

## 5. Automated Validation
- **Before marking a task as done, run `npm run test` and `npm run lint`. Ensure zero errors.
- **Error Debugging Protocol:** If a task fails or a bug is found, do not attempt to fix it immediately. First, gather logs (terminal output, Metro bundler, or Expo Go console). Explain the root cause before proposing a solution.