import { useMemo } from "react";

import type { MatchFilters } from "../contexts/MatchFiltersContext";
import { useMatchFiltersContext } from "../contexts/MatchFiltersContext";
import type { MatchDetail } from "../types";

export function applyFilters(
  matches: MatchDetail[],
  filters: MatchFilters,
  searchText: string
): MatchDetail[] {
  const q = searchText.trim().toLowerCase();
  return matches.filter((match) => {
    if (filters.sport && match.sport !== filters.sport) return false;
    if (filters.level && match.level !== filters.level) return false;
    if (filters.onlyAvailable && match.availableSlots <= 0) return false;
    if (q) {
      const inTitle = match.title.toLowerCase().includes(q);
      const inLocation = match.location.toLowerCase().includes(q);
      const inOrganizer = match.organizer.name.toLowerCase().includes(q);
      if (!inTitle && !inLocation && !inOrganizer) return false;
    }
    return true;
  });
}

export function useMatchFilters(matches: MatchDetail[], searchText: string = ""): MatchDetail[] {
  const { filters } = useMatchFiltersContext();
  return useMemo(() => applyFilters(matches, filters, searchText), [matches, filters, searchText]);
}
