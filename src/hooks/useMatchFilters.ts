import { useMemo } from "react";

import type { MatchFilters } from "../contexts/MatchFiltersContext";
import { useMatchFiltersContext } from "../contexts/MatchFiltersContext";
import type { MatchSummary } from "../types";

export function applyFilters(
  matches: MatchSummary[],
  filters: MatchFilters,
  searchText: string
): MatchSummary[] {
  const q = searchText.trim().toLowerCase();
  return matches.filter((match) => {
    if (filters.sport && match.sport !== filters.sport) return false;
    if (filters.level && match.level !== filters.level) return false;
    if (filters.onlyAvailable && match.availableSlots <= 0) return false;
    if (q) {
      const inTitle = match.title.toLowerCase().includes(q);
      const inLocation = match.location.toLowerCase().includes(q);
      if (!inTitle && !inLocation) return false;
    }
    return true;
  });
}

export function useMatchFilters(matches: MatchSummary[], searchText: string = ""): MatchSummary[] {
  const { filters } = useMatchFiltersContext();
  return useMemo(() => applyFilters(matches, filters, searchText), [matches, filters, searchText]);
}
