import type { ApiRating } from "../adapters/types";
import type { RatingCreatePayload } from "../adapters/rating";
import { apiClient } from "./client";

export async function fetchUserRatings(userId: string): Promise<ApiRating[]> {
  return apiClient.get<ApiRating[]>(`/users/${userId}/ratings`);
}

export async function postRating(
  matchId: string,
  ratedUserId: string,
  payload: RatingCreatePayload
): Promise<ApiRating> {
  return apiClient.post<ApiRating>(`/matches/${matchId}/ratings/${ratedUserId}`, payload);
}
