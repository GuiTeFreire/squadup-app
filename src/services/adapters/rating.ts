import type { Rating, RatingCriteria } from "../../types";
import type { ApiRating } from "./types";
import { toMatchRef } from "./match";
import { toPublicUser } from "./user";

export function toRating(api: ApiRating): Rating {
  return {
    id: api.id,
    ratedUser: toPublicUser(api.rated_user),
    raterUser: toPublicUser(api.rater),
    match: toMatchRef(api.match),
    criteria: {
      punctuality: api.punctuality,
      respect: api.respect,
      behavior: api.behavior,
      presence: api.presence,
      overall: api.overall,
    },
    comment: api.comment ?? undefined,
    createdAt: api.created_at,
  };
}

/** Achata `RatingCriteria` para o payload que `POST /matches/{id}/ratings/{userId}` espera. */
export interface RatingCreatePayload extends RatingCriteria {
  comment?: string;
}

export function toRatingPayload(criteria: RatingCriteria, comment?: string): RatingCreatePayload {
  return { ...criteria, comment };
}
