import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import { MOCK_MATCHES } from "../mocks/matches";
import type { Match, ParticipationStatus, User } from "../types";

interface MatchesContextValue {
  matches: Match[];
  addMatch: (match: Match) => void;
  updateParticipation: (matchId: string, user: User, status: ParticipationStatus) => void;
}

const MatchesContext = createContext<MatchesContextValue | null>(null);

function applyParticipationUpdate(
  matches: Match[],
  matchId: string,
  user: User,
  status: ParticipationStatus
): Match[] {
  return matches.map((m) => {
    if (m.id !== matchId) return m;
    const idx = m.participants.findIndex((p) => p.user.id === user.id);
    if (idx >= 0) {
      const updated = [...m.participants];
      updated[idx] = { user, status };
      return { ...m, participants: updated };
    }
    return { ...m, participants: [...m.participants, { user, status }] };
  });
}

export function MatchesProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES);

  const addMatch = useCallback((match: Match) => {
    setMatches((prev) => [match, ...prev]);
  }, []);

  const updateParticipation = useCallback(
    (matchId: string, user: User, status: ParticipationStatus) => {
      setMatches((prev) => applyParticipationUpdate(prev, matchId, user, status));
    },
    []
  );

  const value = useMemo(
    () => ({ matches, addMatch, updateParticipation }),
    [matches, addMatch, updateParticipation]
  );

  return <MatchesContext.Provider value={value}>{children}</MatchesContext.Provider>;
}

export function useMatchesContext(): MatchesContextValue {
  const ctx = useContext(MatchesContext);
  if (!ctx) throw new Error("useMatchesContext must be used inside MatchesProvider");
  return ctx;
}
