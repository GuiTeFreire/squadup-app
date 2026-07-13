import { act, renderHook, waitFor } from "@testing-library/react-native";

import { createQueryWrapper } from "../../test-utils/queryClientWrapper";
import { useMessages } from "../useMessages";

const SENDER = {
  id: "u1",
  name: "Guilherme Freire",
  photo_url: null,
  age: 28,
  location: "Rio de Janeiro, RJ",
  bio: null,
  favorite_sports: ["football"],
  level: "intermediate",
  is_verified: false,
  average_rating: 4.5,
  matches_played: 12,
};

function apiMessage(overrides: Record<string, unknown> = {}) {
  return {
    id: "message-1",
    match_id: "match-1",
    sender: SENDER,
    text: "Confirmado!",
    created_at: "2026-07-08T09:00:00Z",
    type: "message",
    ...overrides,
  };
}

function mockFetchSequence(responses: { status: number; body: unknown }[]) {
  const queue = [...responses];
  globalThis.fetch = jest.fn(async () => {
    const next = queue.shift();
    if (!next) throw new Error("fetch chamado além do esperado nesta sequência de teste");
    return {
      ok: next.status >= 200 && next.status < 300,
      status: next.status,
      json: async () => next.body,
    } as Response;
  }) as jest.Mock;
}

describe("useMessages — leitura", () => {
  it("busca mensagens e inverte para a mais recente ficar no topo (index 0)", async () => {
    mockFetchSequence([
      {
        status: 200,
        body: [
          apiMessage({ id: "message-1", text: "Primeira", created_at: "2026-07-08T09:00:00Z" }),
          apiMessage({ id: "message-2", text: "Segunda", created_at: "2026-07-08T09:05:00Z" }),
        ],
      },
    ]);

    const { result } = renderHook(() => useMessages("match-1"), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.messages.map((m) => m.text)).toEqual(["Segunda", "Primeira"]);
  });

  it("busca a rota GET /matches/{id}/messages", async () => {
    mockFetchSequence([{ status: 200, body: [] }]);

    const { result } = renderHook(() => useMessages("match-1"), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/matches/match-1/messages"),
      expect.objectContaining({ method: "GET" })
    );
  });
});

describe("useMessages — sendMessage()", () => {
  it("envia POST /matches/{id}/messages só com o texto", async () => {
    mockFetchSequence([{ status: 200, body: [] }]);
    const { result } = renderHook(() => useMessages("match-1"), {
      wrapper: createQueryWrapper(),
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    mockFetchSequence([
      { status: 201, body: apiMessage() },
      { status: 200, body: [apiMessage()] },
    ]);
    await act(async () => {
      result.current.sendMessage("Confirmado!");
    });

    await waitFor(() =>
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/matches/match-1/messages"),
        expect.objectContaining({ method: "POST", body: JSON.stringify({ text: "Confirmado!" }) })
      )
    );
  });

  it("ignora texto vazio ou só com espaços", async () => {
    mockFetchSequence([{ status: 200, body: [] }]);
    const { result } = renderHook(() => useMessages("match-1"), {
      wrapper: createQueryWrapper(),
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const callsBefore = (globalThis.fetch as jest.Mock).mock.calls.length;
    act(() => result.current.sendMessage("   "));

    expect((globalThis.fetch as jest.Mock).mock.calls.length).toBe(callsBefore);
  });
});
