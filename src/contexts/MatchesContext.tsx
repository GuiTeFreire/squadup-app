import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import { MOCK_MATCHES } from "../mocks/matches";
import type { Match } from "../types";

interface MatchesContextValue {
  matches: Match[];
  addMatch: (match: Match) => void;
}

const MatchesContext = createContext<MatchesContextValue | null>(null);

export function MatchesProvider({ children }: { children: React.ReactNode }) {
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES);

  const addMatch = useCallback((match: Match) => {
    setMatches((prev) => [match, ...prev]);
  }, []);

  const value = useMemo(() => ({ matches, addMatch }), [matches, addMatch]);

  return <MatchesContext.Provider value={value}>{children}</MatchesContext.Provider>;
}

export function useMatchesContext(): MatchesContextValue {
  const ctx = useContext(MatchesContext);
  if (!ctx) throw new Error("useMatchesContext must be used inside MatchesProvider");
  return ctx;
}
