import type { MyProfile, PublicUser } from "../../types";
import type { ApiMyProfile, ApiPublicUser } from "./types";

export function toPublicUser(api: ApiPublicUser): PublicUser {
  return {
    id: api.id,
    name: api.name,
    photoUrl: api.photo_url ?? undefined,
    age: api.age,
    location: api.location,
    bio: api.bio ?? undefined,
    favoriteSports: api.favorite_sports,
    level: api.level,
    averageRating: api.average_rating,
    matchesPlayed: api.matches_played,
    isVerified: api.is_verified,
  };
}

export function toMyProfile(api: ApiMyProfile): MyProfile {
  return {
    ...toPublicUser(api),
    email: api.email,
    role: api.role,
  };
}
