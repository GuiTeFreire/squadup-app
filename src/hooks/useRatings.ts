import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../contexts/AuthContext";
import { toRating, toRatingPayload } from "../services/adapters/rating";
import { fetchUserRatings, postRating } from "../services/api/ratings";
import { queryKeys } from "../services/queryKeys";
import type { Rating, RatingCriteria } from "../types";

export interface UseUserRatingsResult {
  ratings: Rating[];
  isLoading: boolean;
  hasRated: (matchId: string, ratedUserId: string) => boolean;
}

/** Avaliações recebidas por `userId` — usada tanto para exibir o perfil quanto para saber se o usuário logado já avaliou alguém numa partida. */
export function useUserRatings(userId: string): UseUserRatingsResult {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.userRatings(userId),
    queryFn: async () => (await fetchUserRatings(userId)).map(toRating),
    enabled: Boolean(userId),
  });

  const ratings = data ?? [];

  function hasRated(matchId: string, ratedUserId: string): boolean {
    if (ratedUserId !== userId || !user) return false;
    return ratings.some((r) => r.match.id === matchId && r.raterUser.id === user.id);
  }

  return { ratings, isLoading, hasRated };
}

/** Verifica, para vários participantes de uma vez, se o usuário logado já avaliou cada um na partida — usada em `PostMatchRatingScreen` para evitar violar as regras de hooks com um `useUserRatings` por linha. */
export function useHasRatedMap(matchId: string, ratedUserIds: string[]): Record<string, boolean> {
  const { user } = useAuth();

  const results = useQueries({
    queries: ratedUserIds.map((ratedUserId) => ({
      queryKey: queryKeys.userRatings(ratedUserId),
      queryFn: async () => (await fetchUserRatings(ratedUserId)).map(toRating),
      enabled: Boolean(ratedUserId),
    })),
  });

  const map: Record<string, boolean> = {};
  ratedUserIds.forEach((ratedUserId, index) => {
    const ratings = results[index]?.data ?? [];
    map[ratedUserId] = Boolean(
      user && ratings.some((r) => r.match.id === matchId && r.raterUser.id === user.id)
    );
  });
  return map;
}

export interface UseSubmitRatingResult {
  submitRating: (
    matchId: string,
    ratedUserId: string,
    criteria: RatingCriteria,
    comment?: string,
    callbacks?: { onSuccess?: () => void; onError?: (error: unknown) => void }
  ) => void;
  isSubmitting: boolean;
}

export function useSubmitRating(): UseSubmitRatingResult {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      matchId,
      ratedUserId,
      criteria,
      comment,
    }: {
      matchId: string;
      ratedUserId: string;
      criteria: RatingCriteria;
      comment?: string;
    }) => postRating(matchId, ratedUserId, toRatingPayload(criteria, comment)),
  });

  return {
    submitRating: (matchId, ratedUserId, criteria, comment, callbacks) =>
      mutate(
        { matchId, ratedUserId, criteria, comment },
        {
          onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: queryKeys.userRatings(ratedUserId) });
            callbacks?.onSuccess?.();
          },
          onError: (error) => callbacks?.onError?.(error),
        }
      ),
    isSubmitting: isPending,
  };
}
