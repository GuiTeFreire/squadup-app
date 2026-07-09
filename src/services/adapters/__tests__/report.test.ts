import { toReport } from "../report";
import type { ApiReport, ApiPublicUser } from "../types";

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

describe("toReport", () => {
  it("renomeia reporter para reporterUser e converte a partida referenciada", () => {
    const api: ApiReport = {
      id: "report-1",
      reported_user: API_USER,
      reporter: { ...API_USER, id: "user-2", name: "Carlos Lima" },
      match: { id: "match-1", title: "Pelada", sport: "football", date: "2026-05-25" },
      reason: "bad_behavior",
      description: "Foi agressivo com outros jogadores.",
      status: "pending",
      created_at: "2026-05-25T20:00:00Z",
    };

    const result = toReport(api);

    expect(result.reportedUser.id).toBe("user-1");
    expect(result.reporterUser.id).toBe("user-2");
    expect(result.match).toEqual({
      id: "match-1",
      title: "Pelada",
      sport: "football",
      date: "2026-05-25",
    });
    expect(result.status).toBe("pending");
  });

  it("converte match nulo (denúncia sem partida associada) em undefined", () => {
    const api: ApiReport = {
      id: "report-1",
      reported_user: API_USER,
      reporter: API_USER,
      match: null,
      reason: "spam",
      description: "Mensagens repetidas.",
      status: "pending",
      created_at: "2026-05-25T20:00:00Z",
    };

    expect(toReport(api).match).toBeUndefined();
  });
});
