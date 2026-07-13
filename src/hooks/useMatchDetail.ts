import { useQuery } from "@tanstack/react-query";

import { toMatchDetail } from "../services/adapters/match";
import { fetchMatchDetail } from "../services/api/matches";
import { queryKeys } from "../services/queryKeys";
import type { MatchDetail } from "../types";

export interface UseMatchDetailResult {
  match: MatchDetail | null;
  isLoading: boolean;
}

export function useMatchDetail(matchId: string): UseMatchDetailResult {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.match(matchId),
    queryFn: async () => toMatchDetail(await fetchMatchDetail(matchId)),
  });

  return { match: data ?? null, isLoading };
}
