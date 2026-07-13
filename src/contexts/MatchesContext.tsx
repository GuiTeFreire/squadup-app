import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo } from "react";

import { toMatchSummary } from "../services/adapters/match";
import { fetchMatches } from "../services/api/matches";
import { queryKeys } from "../services/queryKeys";
import type { MatchSummary } from "../types";
import { useMatchFiltersContext } from "./MatchFiltersContext";

interface MatchesContextValue {
  matches: MatchSummary[];
  isLoading: boolean;
  refetch: () => void;
}

const MatchesContext = createContext<MatchesContextValue | null>(null);

export function MatchesProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { filters } = useMatchFiltersContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.matches(filters),
    queryFn: async () => {
      const apiMatches = await fetchMatches({
        sport: filters.sport,
        level: filters.level,
        date: filters.date,
        location: filters.location,
        hasOpenSlots: filters.onlyAvailable,
      });
      return apiMatches.map(toMatchSummary);
    },
  });

  const value = useMemo(
    () => ({ matches: data ?? [], isLoading, refetch: () => void refetch() }),
    [data, isLoading, refetch]
  );

  return <MatchesContext.Provider value={value}>{children}</MatchesContext.Provider>;
}

export function useMatchesContext(): MatchesContextValue {
  const ctx = useContext(MatchesContext);
  if (!ctx) throw new Error("useMatchesContext must be used inside MatchesProvider");
  return ctx;
}

export function useInvalidateMatches(): () => void {
  const queryClient = useQueryClient();
  return () => {
    void queryClient.invalidateQueries({ queryKey: ["matches"] });
  };
}
