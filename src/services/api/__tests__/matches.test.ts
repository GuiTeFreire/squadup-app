import { fetchMatches } from "../matches";

function mockFetchOnce(body: unknown) {
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => body,
  }) as jest.Mock;
}

function calledUrl(): string {
  return (globalThis.fetch as jest.Mock).mock.calls[0][0] as string;
}

describe("fetchMatches", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("não inclui lat/lng/radius_km quando nenhum filtro geográfico é informado", async () => {
    mockFetchOnce([]);

    await fetchMatches({ sport: "football" });

    const url = calledUrl();
    expect(url).toContain("sport=football");
    expect(url).not.toContain("lat=");
    expect(url).not.toContain("lng=");
    expect(url).not.toContain("radius_km=");
  });

  it("inclui lat/lng/radius_km quando latitude e longitude são informadas", async () => {
    mockFetchOnce([]);

    await fetchMatches({ latitude: -22.9, longitude: -43.2, radiusKm: 20 });

    const url = calledUrl();
    expect(url).toContain("lat=-22.9");
    expect(url).toContain("lng=-43.2");
    expect(url).toContain("radius_km=20");
  });

  it("não inclui lat/lng quando só um dos dois está presente", async () => {
    mockFetchOnce([]);

    await fetchMatches({ latitude: -22.9, longitude: null, radiusKm: 20 });

    const url = calledUrl();
    expect(url).not.toContain("lat=");
    expect(url).not.toContain("radius_km=");
  });

  it("não faz nenhuma query quando nenhum filtro é passado", async () => {
    mockFetchOnce([]);

    await fetchMatches();

    expect(calledUrl()).toBe("http://localhost:8000/matches");
  });
});
