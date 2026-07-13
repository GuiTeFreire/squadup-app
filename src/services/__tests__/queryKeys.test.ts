import { queryKeys } from "../queryKeys";

describe("queryKeys", () => {
  it("me() não recebe parâmetro", () => {
    expect(queryKeys.me()).toEqual(["me"]);
  });

  it("matches() embute o objeto de filtros inteiro na chave", () => {
    const filters = {
      sport: "football" as const,
      level: null,
      onlyAvailable: false,
      date: null,
      location: null,
    };
    expect(queryKeys.matches(filters)).toEqual(["matches", filters]);
    expect(queryKeys.matches()).toEqual(["matches", undefined]);
  });

  it("match()/messages()/userRatings() embutem o id no segundo elemento", () => {
    expect(queryKeys.match("match-1")).toEqual(["match", "match-1"]);
    expect(queryKeys.messages("match-1")).toEqual(["messages", "match-1"]);
    expect(queryKeys.userRatings("user-1")).toEqual(["ratings", "user-1"]);
  });

  it("reports() não recebe parâmetro", () => {
    expect(queryKeys.reports()).toEqual(["reports"]);
  });
});
