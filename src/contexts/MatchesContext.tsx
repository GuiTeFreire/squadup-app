import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import { MOCK_MATCHES } from "../mocks/matches";
import type { MatchDetail, ParticipationStatus, PublicUser } from "../types";

interface MatchesContextValue {
  matches: MatchDetail[];
  addMatch: (match: MatchDetail) => void;
  updateParticipation: (matchId: string, user: PublicUser, status: ParticipationStatus) => void;
}

const MatchesContext = createContext<MatchesContextValue | null>(null);

function withRecalculatedSlots(match: MatchDetail): MatchDetail {
  const confirmedCount = match.participants.filter((p) => p.status === "confirmed").length;
  return { ...match, confirmedCount, availableSlots: match.maxParticipants - confirmedCount };
}

function applyParticipationUpdate(
  matches: MatchDetail[],
  matchId: string,
  user: PublicUser,
  status: ParticipationStatus
): MatchDetail[] {
  return matches.map((m) => {
    if (m.id !== matchId) return m;
    const idx = m.participants.findIndex((p) => p.user.id === user.id);
    const participants =
      idx >= 0
        ? m.participants.map((p, i) => (i === idx ? { user, status } : p))
        : [...m.participants, { user, status }];
    return withRecalculatedSlots({ ...m, participants });
  });
}

export function MatchesProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [matches, setMatches] = useState<MatchDetail[]>(MOCK_MATCHES);

  const addMatch = useCallback((match: MatchDetail) => {
    setMatches((prev) => [match, ...prev]);
  }, []);

  const updateParticipation = useCallback(
    (matchId: string, user: PublicUser, status: ParticipationStatus) => {
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
