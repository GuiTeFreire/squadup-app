import { applyFilters } from "../useMatchFilters";
import type { MatchSummary } from "../../types";
import type { MatchFilters } from "../../contexts/MatchFiltersContext";

type MatchSeed = Omit<MatchSummary, "organizerId" | "confirmedCount" | "availableSlots"> & {
  organizerId?: string;
  confirmedCount: number;
};

const makeMatch = (overrides: Partial<MatchSeed> = {}): MatchSummary => {
  const seed: MatchSeed = {
    id: "m1",
    sport: "football",
    title: "Pelada de domingo",
    location: "Arena Botafogo",
    date: "2026-05-25",
    time: "09:00",
    maxParticipants: 10,
    level: "intermediate",
    organizerId: "u1",
    confirmedCount: 2,
    status: "open",
    allowBeginners: true,
    requiresApproval: false,
    ...overrides,
  };
  return {
    ...seed,
    organizerId: seed.organizerId ?? "u1",
    availableSlots: seed.maxParticipants - seed.confirmedCount,
  };
};

const EMPTY_FILTERS: MatchFilters = {
  sport: null,
  level: null,
  onlyAvailable: false,
  date: null,
  location: null,
};

describe("applyFilters", () => {
  const matches: MatchSummary[] = [
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
      organizerId: "u10",
    }),
    makeMatch({
      id: "m4",
      sport: "football",
      level: "intermediate",
      maxParticipants: 2,
      confirmedCount: 2,
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
