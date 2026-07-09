import { applyFilters } from "../useMatchFilters";
import type { MatchDetail } from "../../types";
import type { MatchFilters } from "../../contexts/MatchFiltersContext";

const makeUser = (id: string, name = "Usuário Teste") => ({
  id,
  name,
  age: 25,
  location: "Rio de Janeiro",
  favoriteSports: ["football" as const],
  level: "intermediate" as const,
  averageRating: 4.0,
  matchesPlayed: 10,
  isVerified: false,
});

type MatchSeed = Omit<MatchDetail, "organizerId" | "confirmedCount" | "availableSlots">;

const makeMatch = (overrides: Partial<MatchSeed> = {}): MatchDetail => {
  const seed: MatchSeed = {
    id: "m1",
    sport: "football",
    title: "Pelada de domingo",
    location: "Arena Botafogo",
    date: "2026-05-25",
    time: "09:00",
    maxParticipants: 10,
    level: "intermediate",
    organizer: makeUser("u1", "Carlos Lima"),
    participants: [
      { user: makeUser("u1"), status: "confirmed" },
      { user: makeUser("u2"), status: "confirmed" },
    ],
    status: "open",
    allowBeginners: true,
    requiresApproval: false,
    ...overrides,
  };
  const confirmedCount = seed.participants.filter((p) => p.status === "confirmed").length;
  return {
    ...seed,
    organizerId: seed.organizer.id,
    confirmedCount,
    availableSlots: seed.maxParticipants - confirmedCount,
  };
};

const EMPTY_FILTERS: MatchFilters = {
  sport: null,
  level: null,
  onlyAvailable: false,
};

describe("applyFilters", () => {
  const matches: MatchDetail[] = [
    makeMatch({ id: "m1", sport: "football", level: "beginner", title: "Futebol iniciante" }),
    makeMatch({
      id: "m2",
      sport: "volleyball",
      level: "intermediate",
      location: "Parque Villa-Lobos",
    }),
    makeMatch({
      id: "m3",
      sport: "basketball",
      level: "advanced",
      organizer: makeUser("u10", "João Basquete"),
    }),
    makeMatch({
      id: "m4",
      sport: "football",
      level: "intermediate",
      maxParticipants: 2,
      participants: [
        { user: makeUser("u1"), status: "confirmed" },
        { user: makeUser("u2"), status: "confirmed" },
      ],
      status: "full",
    }),
  ];

  it("retorna todos os matches quando filtros estão vazios e sem texto", () => {
    expect(applyFilters(matches, EMPTY_FILTERS, "")).toHaveLength(4);
  });

  it("filtra por esporte", () => {
    const result = applyFilters(matches, { ...EMPTY_FILTERS, sport: "football" }, "");
    expect(result).toHaveLength(2);
    result.forEach((m) => expect(m.sport).toBe("football"));
  });

  it("filtra por nível", () => {
    const result = applyFilters(matches, { ...EMPTY_FILTERS, level: "advanced" }, "");
    expect(result).toHaveLength(1);
    expect(result[0].level).toBe("advanced");
  });

  it("filtra somente partidas com vagas disponíveis", () => {
    const result = applyFilters(matches, { ...EMPTY_FILTERS, onlyAvailable: true }, "");
    result.forEach((m) => expect(m.availableSlots).toBeGreaterThan(0));
  });

  it("filtra por texto no título", () => {
    const result = applyFilters(matches, EMPTY_FILTERS, "iniciante");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("m1");
  });

  it("filtra por texto no local", () => {
    const result = applyFilters(matches, EMPTY_FILTERS, "villa-lobos");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("m2");
  });

  it("filtra por nome do organizador", () => {
    const result = applyFilters(matches, EMPTY_FILTERS, "João Basquete");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("m3");
  });

  it("a busca por texto é case-insensitive", () => {
    const result = applyFilters(matches, EMPTY_FILTERS, "FUTEBOL");
    expect(result.length).toBeGreaterThan(0);
  });

  it("combina filtro de esporte e nível", () => {
    const result = applyFilters(
      matches,
      { ...EMPTY_FILTERS, sport: "football", level: "beginner" },
      ""
    );
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("m1");
  });

  it("retorna array vazio quando nenhuma partida bate com os filtros", () => {
    const result = applyFilters(matches, { ...EMPTY_FILTERS, sport: "tennis" }, "");
    expect(result).toHaveLength(0);
  });

  it("retorna array vazio quando searchText não bate com nada", () => {
    const result = applyFilters(matches, EMPTY_FILTERS, "xyzabc123");
    expect(result).toHaveLength(0);
  });
});
