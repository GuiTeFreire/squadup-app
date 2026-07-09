import type { MatchFilters } from "../contexts/MatchFiltersContext";

/** Convenção central de query keys do React Query (Fase 13.3) — cada Context real (13.4–13.8) usa as chaves daqui. */
export const queryKeys = {
  me: () => ["me"] as const,
  matches: (filters?: MatchFilters) => ["matches", filters] as const,
  match: (matchId: string) => ["match", matchId] as const,
  messages: (matchId: string) => ["messages", matchId] as const,
  userRatings: (userId: string) => ["ratings", userId] as const,
  reports: () => ["reports"] as const,
};
