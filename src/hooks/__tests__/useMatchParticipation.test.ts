import { act, renderHook, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";

import { createQueryWrapper } from "../../test-utils/queryClientWrapper";
import { useMatchParticipation } from "../useMatchParticipation";

const GUILHERME = {
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

const ANA = {
  ...GUILHERME,
  id: "u2",
  name: "Ana Souza",
};

function apiMatchDetail(overrides: Record<string, unknown> = {}) {
  return {
    id: "match-1",
    sport: "football",
    title: "Pelada de domingo",
    location: "Arena Botafogo",
    date: "2026-06-01",
    time: "10:00:00",
    max_participants: 10,
    level: "intermediate",
    description: null,
    organizer_id: "u2",
    status: "open",
    allow_beginners: true,
    requires_approval: false,
    confirmed_count: 1,
    available_slots: 9,
    organizer: ANA,
    participants: [{ user: ANA, status: "confirmed" }],
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

const CURRENT_USER = {
  id: "u1",
  name: "Guilherme Freire",
  age: 28,
  location: "Rio de Janeiro, RJ",
  favoriteSports: ["football" as const],
  level: "intermediate" as const,
  averageRating: 4.5,
  matchesPlayed: 12,
  isVerified: false,
};

async function renderParticipation(detail: ReturnType<typeof apiMatchDetail>) {
  mockFetchSequence([{ status: 200, body: detail }]);
  const { result } = renderHook(() => useMatchParticipation("match-1", CURRENT_USER), {
    wrapper: createQueryWrapper(),
  });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  return result;
}

describe("useMatchParticipation — leitura de status", () => {
  it("retorna userStatus confirmed quando o usuário está confirmado", async () => {
    const result = await renderParticipation(
      apiMatchDetail({ participants: [{ user: GUILHERME, status: "confirmed" }] })
    );
    expect(result.current.userStatus).toBe("confirmed");
  });

  it("retorna userStatus pending quando o usuário está aguardando aprovação", async () => {
    const result = await renderParticipation(
      apiMatchDetail({ participants: [{ user: GUILHERME, status: "pending" }] })
    );
    expect(result.current.userStatus).toBe("pending");
  });

  it("retorna userStatus null quando o usuário não é participante", async () => {
    const result = await renderParticipation(
      apiMatchDetail({ participants: [{ user: ANA, status: "confirmed" }] })
    );
    expect(result.current.userStatus).toBeNull();
  });

  it("retorna userStatus null quando o usuário tem status cancelled (normalização)", async () => {
    const result = await renderParticipation(
      apiMatchDetail({ participants: [{ user: GUILHERME, status: "cancelled" }] })
    );
    expect(result.current.userStatus).toBeNull();
  });
});

describe("useMatchParticipation — join()", () => {
  it("join() chama POST /matches/{id}/join", async () => {
    const result = await renderParticipation(
      apiMatchDetail({ participants: [{ user: ANA, status: "confirmed" }] })
    );

    mockFetchSequence([{ status: 200, body: apiMatchDetail() }]);
    await act(async () => {
      await result.current.join();
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/matches/match-1/join"),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("join() exibe alerta quando a chamada falha", async () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});
    const result = await renderParticipation(
      apiMatchDetail({ participants: [{ user: ANA, status: "confirmed" }] })
    );

    mockFetchSequence([{ status: 400, body: { detail: { code: "X", message: "erro" } } }]);
    await act(async () => {
      await result.current.join();
    });

    expect(alertSpy).toHaveBeenCalled();
    alertSpy.mockRestore();
  });
});

describe("useMatchParticipation — cancel()", () => {
  it("cancel() abre Alert de confirmação", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    const result = await renderParticipation(
      apiMatchDetail({ participants: [{ user: GUILHERME, status: "confirmed" }] })
    );

    act(() => result.current.cancel());
    expect(alertSpy).toHaveBeenCalledWith(
      "Cancelar participação",
      "Tem certeza que deseja cancelar?",
      expect.any(Array)
    );
    alertSpy.mockRestore();
  });

  it("confirmar cancel chama POST /matches/{id}/leave", async () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation((_t, _m, buttons) => {
      const confirm = (buttons as { text?: string; onPress?: () => void }[]).find((b) =>
        b.text?.includes("Sim")
      );
      confirm?.onPress?.();
    });
    const result = await renderParticipation(
      apiMatchDetail({ participants: [{ user: GUILHERME, status: "confirmed" }] })
    );

    mockFetchSequence([{ status: 200, body: apiMatchDetail() }]);
    await act(async () => {
      result.current.cancel();
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/matches/match-1/leave"),
      expect.objectContaining({ method: "POST" })
    );
    alertSpy.mockRestore();
  });
});
