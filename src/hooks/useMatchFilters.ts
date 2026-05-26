import { useMemo } from "react";

import type { MatchFilters } from "../contexts/MatchFiltersContext";
import { useMatchFiltersContext } from "../contexts/MatchFiltersContext";
import type { Match } from "../types";

export function getConfirmedCount(match: Match): number {
  return match.participants.filter((p) => p.status === "confirmed").length;
}

export function getAvailableSlots(match: Match): number {
  return match.maxParticipants - getConfirmedCount(match);
}

export function applyFilters(matches: Match[], filters: MatchFilters, searchText: string): Match[] {
  const q = searchText.trim().toLowerCase();
  return matches.filter((match) => {
    if (filters.sport && match.sport !== filters.sport) return false;
    if (filters.level && match.level !== filters.level) return false;
    if (filters.onlyAvailable && getAvailableSlots(match) <= 0) return false;
    if (q) {
      const inTitle = match.title.toLowerCase().includes(q);
      const inLocation = match.location.toLowerCase().includes(q);
      const inOrganizer = match.organizer.name.toLowerCase().includes(q);
      if (!inTitle && !inLocation && !inOrganizer) return false;
    }
    return true;
  });
}

export function useMatchFilters(matches: Match[], searchText: string = ""): Match[] {
  const { filters } = useMatchFiltersContext();
  return useMemo(() => applyFilters(matches, filters, searchText), [matches, filters, searchText]);
}
