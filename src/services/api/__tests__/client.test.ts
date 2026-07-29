import { apiClient, ApiError, isNetworkError, setAuthToken } from "../client";

function mockFetchOnce(status: number, body: unknown) {
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  }) as jest.Mock;
}

describe("apiClient", () => {
  afterEach(() => {
    setAuthToken(null);
    jest.restoreAllMocks();
  });

  it("faz GET e devolve o corpo JSON tipado", async () => {
    mockFetchOnce(200, { id: "match-1", title: "Pelada" });

    const result = await apiClient.get<{ id: string; title: string }>("/matches/match-1");

    expect(result).toEqual({ id: "match-1", title: "Pelada" });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/matches/match-1",
      expect.objectContaining({ method: "GET" })
    );
  });

  it("envia POST com body serializado e Content-Type json", async () => {
    mockFetchOnce(201, { id: "match-2" });

    await apiClient.post("/matches", { title: "Pelada de domingo" });

    const [, options] = (globalThis.fetch as jest.Mock).mock.calls[0];
    expect(options.method).toBe("POST");
    expect(options.body).toBe(JSON.stringify({ title: "Pelada de domingo" }));
    expect((options.headers as Headers).get("Content-Type")).toBe("application/json");
  });

  it("anexa Authorization: Bearer quando há token setado", async () => {
    setAuthToken("abc123");
    mockFetchOnce(200, {});

    await apiClient.get("/auth/me");

    const [, options] = (globalThis.fetch as jest.Mock).mock.calls[0];
    expect((options.headers as Headers).get("Authorization")).toBe("Bearer abc123");
  });

  it("não anexa Authorization quando não há token", async () => {
    mockFetchOnce(200, {});

    await apiClient.get("/matches");

    const [, options] = (globalThis.fetch as jest.Mock).mock.calls[0];
    expect((options.headers as Headers).get("Authorization")).toBeNull();
  });

  it("lança ApiError com code/message a partir de { detail } em respostas de erro", async () => {
    mockFetchOnce(404, { detail: { code: "MATCH_NOT_FOUND", message: "Partida não encontrada." } });

    await expect(apiClient.get("/matches/does-not-exist")).rejects.toMatchObject({
      name: "ApiError",
      status: 404,
      code: "MATCH_NOT_FOUND",
      message: "Partida não encontrada.",
    });
  });

  it("lança ApiError genérico quando o corpo de erro não segue o formato esperado", async () => {
    mockFetchOnce(500, {});

    await expect(apiClient.get("/matches")).rejects.toMatchObject({
      status: 500,
      code: "UNKNOWN_ERROR",
    });
  });

  it("extrai uma mensagem legível de um 422 de validação automática do FastAPI (detail em lista)", async () => {
    mockFetchOnce(422, {
      detail: [
        {
          type: "string_too_short",
          loc: ["body", "password"],
          msg: "String should have at least 8 characters",
          input: "abc123",
          ctx: { min_length: 8 },
        },
      ],
    });

    await expect(apiClient.post("/auth/register", {})).rejects.toMatchObject({
      status: 422,
      code: "VALIDATION_ERROR",
      message: "password: String should have at least 8 characters",
    });
  });

  it("devolve undefined em respostas 204", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 204,
      json: async () => {
        throw new Error("no body");
      },
    }) as jest.Mock;

    const result = await apiClient.delete("/matches/match-1");

    expect(result).toBeUndefined();
  });

  it("ApiError é instância de Error", async () => {
    mockFetchOnce(400, { detail: { code: "BAD_REQUEST", message: "Inválido." } });

    try {
      await apiClient.get("/matches");
      fail("deveria ter lançado");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error).toBeInstanceOf(Error);
    }
  });

  describe("retry em falha de rede (fetch() lança antes de qualquer resposta)", () => {
    it("tenta de novo e devolve o resultado se uma tentativa seguinte funcionar", async () => {
      const fetchMock = jest
        .fn()
        .mockRejectedValueOnce(new TypeError("Network request failed"))
        .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ id: "match-1" }) });
      globalThis.fetch = fetchMock;

      const result = await apiClient.get<{ id: string }>("/matches/match-1");

      expect(result).toEqual({ id: "match-1" });
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("desiste depois de esgotar as tentativas e propaga o erro de rede original", async () => {
      const networkError = new TypeError("Network request failed");
      const fetchMock = jest.fn().mockRejectedValue(networkError);
      globalThis.fetch = fetchMock;

      await expect(apiClient.get("/matches")).rejects.toBe(networkError);
      // 1 tentativa inicial + 2 retries = 3 chamadas ao fetch.
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it("não tenta de novo em cima de uma resposta HTTP de erro (só falha de rede pura)", async () => {
      mockFetchOnce(500, {});

      await expect(apiClient.get("/matches")).rejects.toMatchObject({ status: 500 });
      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("isNetworkError", () => {
  it("identifica TypeError (erro cru do fetch nativo) como falha de rede", () => {
    expect(isNetworkError(new TypeError("Network request failed"))).toBe(true);
  });

  it("não confunde ApiError (resposta HTTP real) com falha de rede", () => {
    expect(isNetworkError(new ApiError(500, { code: "UNKNOWN_ERROR", message: "Erro." }))).toBe(
      false
    );
  });

  it("não confunde um Error genérico com falha de rede", () => {
    expect(isNetworkError(new Error("algo deu errado"))).toBe(false);
  });
});
