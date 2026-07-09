import { toRating, toRatingPayload } from "../rating";
import type { ApiRating, ApiPublicUser } from "../types";

const API_USER: ApiPublicUser = {
  id: "user-1",
  name: "Ana Souza",
  photo_url: null,
  age: 28,
  location: "São Paulo, SP",
  bio: null,
  favorite_sports: ["football"],
  level: "intermediate",
  is_verified: true,
  average_rating: 4.5,
  matches_played: 12,
};

describe("toRating", () => {
  it("agrupa os critérios soltos em RatingCriteria e renomeia rater/rated_user", () => {
    const api: ApiRating = {
      id: "rating-1",
      match: { id: "match-1", title: "Pelada", sport: "football", date: "2026-05-25" },
      rated_user: API_USER,
      rater: { ...API_USER, id: "user-2", name: "Carlos Lima" },
      punctuality: 5,
      respect: 5,
      behavior: 4,
      presence: 5,
      overall: 5,
      comment: "Ótimo parceiro de jogo!",
      created_at: "2026-05-25T20:00:00Z",
    };

    const result = toRating(api);

    expect(result.ratedUser.id).toBe("user-1");
    expect(result.raterUser.id).toBe("user-2");
    expect(result.criteria).toEqual({
      punctuality: 5,
      respect: 5,
      behavior: 4,
      presence: 5,
      overall: 5,
    });
    expect(result.comment).toBe("Ótimo parceiro de jogo!");
    expect(result.createdAt).toBe("2026-05-25T20:00:00Z");
  });

  it("converte comment nulo em undefined", () => {
    const api: ApiRating = {
      id: "rating-1",
      match: { id: "match-1", title: "Pelada", sport: "football", date: "2026-05-25" },
      rated_user: API_USER,
      rater: API_USER,
      punctuality: 5,
      respect: 5,
      behavior: 5,
      presence: 5,
      overall: 5,
      comment: null,
      created_at: "2026-05-25T20:00:00Z",
    };

    expect(toRating(api).comment).toBeUndefined();
  });
});

describe("toRatingPayload", () => {
  it("achata RatingCriteria e o comentário num único objeto para o POST", () => {
    const payload = toRatingPayload(
      { punctuality: 5, respect: 4, behavior: 5, presence: 5, overall: 5 },
      "Muito pontual"
    );

    expect(payload).toEqual({
      punctuality: 5,
      respect: 4,
      behavior: 5,
      presence: 5,
      overall: 5,
      comment: "Muito pontual",
    });
  });

  it("funciona sem comentário", () => {
    const payload = toRatingPayload({
      punctuality: 3,
      respect: 3,
      behavior: 3,
      presence: 3,
      overall: 3,
    });

    expect(payload.comment).toBeUndefined();
  });
});
