import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";

import CreateMatchScreen from "../CreateMatchScreen";

const mockNavigate = jest.fn();
const mockAddMatch = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock("../../contexts/MatchesContext", () => ({
  useMatchesContext: () => ({ addMatch: mockAddMatch, matches: [] }),
}));

jest.spyOn(Alert, "alert");

beforeEach(() => {
  jest.clearAllMocks();
});

// ─── Helpers ────────────────────────────────────────────────────────────────

function fillValidForm() {
  fireEvent.press(screen.getByLabelText("Futebol"));
  fireEvent.changeText(
    screen.getByPlaceholderText("Ex: Pelada de domingo na arena"),
    "Pelada de teste no parque"
  );
  fireEvent.changeText(
    screen.getByPlaceholderText("Ex: Arena Botafogo — Rua Gen. Polidoro"),
    "Parque Ibirapuera"
  );
  fireEvent.changeText(screen.getByPlaceholderText("DD/MM/AAAA"), "01/06/2026");
  fireEvent.changeText(screen.getByPlaceholderText("HH:MM"), "18:00");
  fireEvent.changeText(screen.getByPlaceholderText("Ex: 10"), "10");
}

// ─── Renderização ────────────────────────────────────────────────────────────

describe("CreateMatchScreen — renderização", () => {
  it("exibe o título da tela", () => {
    render(<CreateMatchScreen />);
    expect(screen.getByText("Criar Partida")).toBeTruthy();
  });

  it("exibe o campo de título", () => {
    render(<CreateMatchScreen />);
    expect(screen.getByPlaceholderText("Ex: Pelada de domingo na arena")).toBeTruthy();
  });

  it("exibe o campo de local", () => {
    render(<CreateMatchScreen />);
    expect(screen.getByPlaceholderText("Ex: Arena Botafogo — Rua Gen. Polidoro")).toBeTruthy();
  });

  it("exibe os chips de esporte", () => {
    render(<CreateMatchScreen />);
    expect(screen.getByLabelText("Futebol")).toBeTruthy();
    expect(screen.getByLabelText("Basquete")).toBeTruthy();
    expect(screen.getByLabelText("Vôlei")).toBeTruthy();
  });

  it("exibe os chips de nível", () => {
    render(<CreateMatchScreen />);
    expect(screen.getByLabelText("Iniciante")).toBeTruthy();
    expect(screen.getByLabelText("Intermediário")).toBeTruthy();
    expect(screen.getByLabelText("Avançado")).toBeTruthy();
  });

  it("exibe os toggles de opções", () => {
    render(<CreateMatchScreen />);
    expect(screen.getByLabelText("Permitir iniciantes")).toBeTruthy();
    expect(screen.getByLabelText("Exigir aprovação do organizador")).toBeTruthy();
  });

  it("exibe o botão de submissão", () => {
    render(<CreateMatchScreen />);
    expect(screen.getByText("Criar partida")).toBeTruthy();
  });
});

// ─── Validação ───────────────────────────────────────────────────────────────

describe("CreateMatchScreen — validação", () => {
  it("exibe erro de esporte ao submeter sem selecionar modalidade", () => {
    render(<CreateMatchScreen />);
    fireEvent.press(screen.getByText("Criar partida"));
    expect(screen.getByText("Selecione uma modalidade esportiva")).toBeTruthy();
  });

  it("exibe erro de título muito curto", () => {
    render(<CreateMatchScreen />);
    fireEvent.changeText(screen.getByPlaceholderText("Ex: Pelada de domingo na arena"), "AB");
    fireEvent.press(screen.getByText("Criar partida"));
    expect(screen.getByText("Título deve ter ao menos 3 caracteres")).toBeTruthy();
  });

  it("exibe erro de local vazio", () => {
    render(<CreateMatchScreen />);
    fireEvent.press(screen.getByText("Criar partida"));
    expect(screen.getByText("Informe o local da partida")).toBeTruthy();
  });

  it("exibe erro de data inválida", () => {
    render(<CreateMatchScreen />);
    fireEvent.changeText(screen.getByPlaceholderText("DD/MM/AAAA"), "abc");
    fireEvent.press(screen.getByText("Criar partida"));
    expect(screen.getByText("Use o formato DD/MM/AAAA")).toBeTruthy();
  });

  it("exibe erro de horário inválido", () => {
    render(<CreateMatchScreen />);
    fireEvent.changeText(screen.getByPlaceholderText("HH:MM"), "25:00");
    fireEvent.press(screen.getByText("Criar partida"));
    expect(screen.getByText("Use o formato HH:MM")).toBeTruthy();
  });

  it("exibe erro de participantes abaixo do mínimo", () => {
    render(<CreateMatchScreen />);
    fireEvent.changeText(screen.getByPlaceholderText("Ex: 10"), "1");
    fireEvent.press(screen.getByText("Criar partida"));
    expect(screen.getByText("Mínimo de 2 participantes")).toBeTruthy();
  });

  it("exibe erro de participantes quando campo está vazio", () => {
    render(<CreateMatchScreen />);
    fireEvent.press(screen.getByText("Criar partida"));
    expect(screen.getByText("Mínimo de 2 participantes")).toBeTruthy();
  });

  it("não chama addMatch quando o formulário é inválido", () => {
    render(<CreateMatchScreen />);
    fireEvent.press(screen.getByText("Criar partida"));
    expect(mockAddMatch).not.toHaveBeenCalled();
  });
});

// ─── Submissão válida ─────────────────────────────────────────────────────────

describe("CreateMatchScreen — submissão válida", () => {
  it("chama addMatch com os dados corretos", () => {
    render(<CreateMatchScreen />);
    fillValidForm();
    fireEvent.press(screen.getByText("Criar partida"));

    expect(mockAddMatch).toHaveBeenCalledTimes(1);
    const match = mockAddMatch.mock.calls[0][0];
    expect(match.sport).toBe("football");
    expect(match.title).toBe("Pelada de teste no parque");
    expect(match.location).toBe("Parque Ibirapuera");
    expect(match.date).toBe("2026-06-01");
    expect(match.time).toBe("18:00");
    expect(match.maxParticipants).toBe(10);
    expect(match.status).toBe("open");
    expect(match.level).toBe("intermediate");
  });

  it("converte data DD/MM/AAAA para YYYY-MM-DD corretamente", () => {
    render(<CreateMatchScreen />);
    fillValidForm();
    fireEvent.press(screen.getByText("Criar partida"));

    const match = mockAddMatch.mock.calls[0][0];
    expect(match.date).toBe("2026-06-01");
  });

  it("exibe Alert de sucesso após submissão válida", () => {
    render(<CreateMatchScreen />);
    fillValidForm();
    fireEvent.press(screen.getByText("Criar partida"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Partida criada!",
      expect.stringContaining("Pelada de teste no parque"),
      expect.any(Array)
    );
  });

  it("inclui o esporte e a data no Alert de sucesso", () => {
    render(<CreateMatchScreen />);
    fillValidForm();
    fireEvent.press(screen.getByText("Criar partida"));

    const message = (Alert.alert as jest.Mock).mock.calls[0][1] as string;
    expect(message).toContain("Futebol");
    expect(message).toContain("01/06/2026");
    expect(message).toContain("18:00");
  });
});

// ─── Interações ───────────────────────────────────────────────────────────────

describe("CreateMatchScreen — interações", () => {
  it("toggle 'Permitir iniciantes' altera o estado visualmente", () => {
    render(<CreateMatchScreen />);
    const toggle = screen.getByLabelText("Permitir iniciantes");
    expect(toggle.props.accessibilityState.checked).toBe(false);
    fireEvent.press(toggle);
    expect(toggle.props.accessibilityState.checked).toBe(true);
  });

  it("toggle 'Exigir aprovação' altera o estado visualmente", () => {
    render(<CreateMatchScreen />);
    const toggle = screen.getByLabelText("Exigir aprovação do organizador");
    expect(toggle.props.accessibilityState.checked).toBe(false);
    fireEvent.press(toggle);
    expect(toggle.props.accessibilityState.checked).toBe(true);
  });

  it("selecionar um esporte remove o erro de modalidade", () => {
    render(<CreateMatchScreen />);
    fireEvent.press(screen.getByText("Criar partida"));
    expect(screen.getByText("Selecione uma modalidade esportiva")).toBeTruthy();
    fireEvent.press(screen.getByLabelText("Vôlei"));
    expect(screen.queryByText("Selecione uma modalidade esportiva")).toBeNull();
  });

  it("addMatch recebe allowBeginners=true quando toggle ativado", () => {
    render(<CreateMatchScreen />);
    fillValidForm();
    fireEvent.press(screen.getByLabelText("Permitir iniciantes"));
    fireEvent.press(screen.getByText("Criar partida"));

    const match = mockAddMatch.mock.calls[0][0];
    expect(match.allowBeginners).toBe(true);
  });

  it("addMatch recebe requiresApproval=true quando toggle ativado", () => {
    render(<CreateMatchScreen />);
    fillValidForm();
    fireEvent.press(screen.getByLabelText("Exigir aprovação do organizador"));
    fireEvent.press(screen.getByText("Criar partida"));

    const match = mockAddMatch.mock.calls[0][0];
    expect(match.requiresApproval).toBe(true);
  });
});
