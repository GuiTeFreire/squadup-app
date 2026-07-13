import { toMyProfile, toPublicUser } from "../user";
import type { ApiMyProfile, ApiPublicUser } from "../types";

const API_PUBLIC_USER: ApiPublicUser = {
  id: "user-1",
  name: "Ana Souza",
  photo_url: "https://example.com/avatar.jpg",
  age: 28,
  location: "São Paulo, SP",
  bio: "Adoro futebol de fim de semana.",
  favorite_sports: ["football", "volleyball"],
  level: "intermediate",
  is_verified: true,
  average_rating: 4.5,
  matches_played: 12,
};

describe("toPublicUser", () => {
  it("converte snake_case para camelCase mantendo os valores", () => {
    expect(toPublicUser(API_PUBLIC_USER)).toEqual({
      id: "user-1",
      name: "Ana Souza",
      photoUrl: "https://example.com/avatar.jpg",
      age: 28,
      location: "São Paulo, SP",
      bio: "Adoro futebol de fim de semana.",
      favoriteSports: ["football", "volleyball"],
      level: "intermediate",
      isVerified: true,
      averageRating: 4.5,
      matchesPlayed: 12,
    });
  });

  it("converte photo_url/bio nulos em undefined", () => {
    const result = toPublicUser({ ...API_PUBLIC_USER, photo_url: null, bio: null });

    expect(result.photoUrl).toBeUndefined();
    expect(result.bio).toBeUndefined();
  });

  it("preserva average_rating nulo (usuário sem avaliações)", () => {
    const result = toPublicUser({ ...API_PUBLIC_USER, average_rating: null });

    expect(result.averageRating).toBeNull();
  });
});

describe("toMyProfile", () => {
  it("estende toPublicUser com email e role", () => {
    const api: ApiMyProfile = { ...API_PUBLIC_USER, email: "ana.souza@example.com", role: "admin" };

    const result = toMyProfile(api);

    expect(result).toMatchObject({ id: "user-1", email: "ana.souza@example.com", role: "admin" });
  });
});
