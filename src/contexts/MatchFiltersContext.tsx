import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import type { ExperienceLevel, Sport } from "../types";

export interface MatchFilters {
  sport: Sport | null;
  level: ExperienceLevel | null;
  onlyAvailable: boolean;
}

const DEFAULT_FILTERS: MatchFilters = {
  sport: null,
  level: null,
  onlyAvailable: false,
};

interface MatchFiltersContextValue {
  filters: MatchFilters;
  setFilters: (f: MatchFilters) => void;
  clearFilters: () => void;
  activeFilterCount: number;
}

const MatchFiltersContext = createContext<MatchFiltersContextValue | null>(null);

export function MatchFiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<MatchFilters>(DEFAULT_FILTERS);

  const clearFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const activeFilterCount = useMemo(
    () => [filters.sport, filters.level, filters.onlyAvailable || null].filter(Boolean).length,
    [filters]
  );

  const value = useMemo(
    () => ({ filters, setFilters, clearFilters, activeFilterCount }),
    [filters, clearFilters, activeFilterCount]
  );

  return <MatchFiltersContext.Provider value={value}>{children}</MatchFiltersContext.Provider>;
}

export function useMatchFiltersContext(): MatchFiltersContextValue {
  const ctx = useContext(MatchFiltersContext);
  if (!ctx) throw new Error("useMatchFiltersContext must be used inside MatchFiltersProvider");
  return ctx;
}
