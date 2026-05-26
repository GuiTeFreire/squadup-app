import { act, renderHook } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";

import { MatchesProvider } from "../../contexts/MatchesContext";
import { MOCK_USERS } from "../../mocks/users";
import { useMatchParticipation } from "../useMatchParticipation";

// Controlled set of matches for predictable tests
jest.mock("../../mocks/matches", () => {
  const { MOCK_USERS: users } = jest.requireActual("../../mocks/users");
  const [guilherme, ana] = users;
  return {
    MOCK_MATCHES: [
      {
        id: "t-confirmed",
        sport: "football",
        title: "Test Confirmed",
        location: "Local",
        date: "2026-06-01",
        time: "10:00",
        maxParticipants: 10,
        level: "intermediate",
        organizer: guilherme,
        participants: [{ user: guilherme, status: "confirmed" }],
        status: "open",
        allowBeginners: true,
        requiresApproval: false,
      },
      {
        id: "t-pending",
        sport: "volleyball",
        title: "Test Pending",
        location: "Local",
        date: "2026-06-02",
        time: "11:00",
        maxParticipants: 10,
        level: "beginner",
        organizer: ana,
        participants: [{ user: guilherme, status: "pending" }],
        status: "open",
        allowBeginners: true,
        requiresApproval: true,
      },
      {
        id: "t-open-no-approval",
        sport: "basketball",
        title: "Test Open No Approval",
        location: "Local",
        date: "2026-06-03",
        time: "12:00",
        maxParticipants: 10,
        level: "beginner",
        organizer: ana,
        participants: [{ user: ana, status: "confirmed" }],
        status: "open",
        allowBeginners: true,
        requiresApproval: false,
      },
      {
        id: "t-open-with-approval",
        sport: "futsal",
        title: "Test Open With Approval",
        location: "Local",
        date: "2026-06-04",
        time: "13:00",
        maxParticipants: 10,
        level: "intermediate",
        organizer: ana,
        participants: [{ user: ana, status: "confirmed" }],
        status: "open",
        allowBeginners: false,
        requiresApproval: true,
      },
      {
        id: "t-cancelled-participant",
        sport: "tennis",
        title: "Test Cancelled Participant",
        location: "Local",
        date: "2026-06-05",
        time: "14:00",
        maxParticipants: 4,
        level: "advanced",
        organizer: ana,
        participants: [{ user: guilherme, status: "cancelled" }],
        status: "open",
        allowBeginners: false,
        requiresApproval: false,
      },
    ],
  };
});

const [guilherme] = MOCK_USERS;

function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(MatchesProvider, null, children);
}

describe("useMatchParticipation — leitura de status", () => {
  it("retorna userStatus confirmed quando o usuário está confirmado", () => {
    const { result } = renderHook(() => useMatchParticipation("t-confirmed", guilherme), {
      wrapper,
    });
    expect(result.current.userStatus).toBe("confirmed");
  });

  it("retorna userStatus pending quando o usuário está aguardando aprovação", () => {
    const { result } = renderHook(() => useMatchParticipation("t-pending", guilherme), { wrapper });
    expect(result.current.userStatus).toBe("pending");
  });

  it("retorna userStatus null quando o usuário não é participante", () => {
    const { result } = renderHook(() => useMatchParticipation("t-open-no-approval", guilherme), {
      wrapper,
    });
    expect(result.current.userStatus).toBeNull();
  });

  it("retorna userStatus null quando o usuário tem status cancelled (normalização)", () => {
    const { result } = renderHook(
      () => useMatchParticipation("t-cancelled-participant", guilherme),
      { wrapper }
    );
    expect(result.current.userStatus).toBeNull();
  });

  it("retorna match null para matchId inexistente", () => {
    const { result } = renderHook(() => useMatchParticipation("nao-existe", guilherme), {
      wrapper,
    });
    expect(result.current.match).toBeNull();
    expect(result.current.userStatus).toBeNull();
  });
});

describe("useMatchParticipation — join()", () => {
  it("join() sem aprovação obrigatória define status como confirmed", () => {
    const { result } = renderHook(() => useMatchParticipation("t-open-no-approval", guilherme), {
      wrapper,
    });
    act(() => result.current.join());
    expect(result.current.userStatus).toBe("confirmed");
  });

  it("join() com aprovação obrigatória define status como pending", () => {
    const { result } = renderHook(() => useMatchParticipation("t-open-with-approval", guilherme), {
      wrapper,
    });
    act(() => result.current.join());
    expect(result.current.userStatus).toBe("pending");
  });

  it("join() adiciona o usuário à lista de participantes da partida", () => {
    const { result } = renderHook(() => useMatchParticipation("t-open-no-approval", guilherme), {
      wrapper,
    });
    act(() => result.current.join());
    const participant = result.current.match?.participants.find((p) => p.user.id === guilherme.id);
    expect(participant).toBeDefined();
    expect(participant?.status).toBe("confirmed");
  });

  it("join() não faz nada quando matchId não existe", () => {
    const { result } = renderHook(() => useMatchParticipation("nao-existe", guilherme), {
      wrapper,
    });
    expect(() => act(() => result.current.join())).not.toThrow();
  });
});

describe("useMatchParticipation — cancel()", () => {
  it("cancel() abre Alert de confirmação", () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    const { result } = renderHook(() => useMatchParticipation("t-confirmed", guilherme), {
      wrapper,
    });
    act(() => result.current.cancel());
    expect(alertSpy).toHaveBeenCalledWith(
      "Cancelar participação",
      "Tem certeza que deseja cancelar?",
      expect.any(Array)
    );
    alertSpy.mockRestore();
  });

  it("confirmar cancel define status como cancelled e normaliza para null", () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation((_t, _m, buttons) => {
      const confirm = (buttons as { onPress?: () => void }[]).find((b) => b.onPress);
      confirm?.onPress?.();
    });
    const { result } = renderHook(() => useMatchParticipation("t-confirmed", guilherme), {
      wrapper,
    });
    act(() => result.current.cancel());
    expect(result.current.userStatus).toBeNull();
    alertSpy.mockRestore();
  });
});
