import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";

import { MOCK_MATCHES } from "../../mocks/matches";
import ReportUserScreen from "../ReportUserScreen";

const mockGoBack = jest.fn();
const mockUseRoute = jest.fn();
const mockUseMatchesContext = jest.fn();
const mockAddReport = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
  useRoute: () => mockUseRoute(),
}));

jest.mock("../../contexts/MatchesContext", () => ({
  useMatchesContext: () => mockUseMatchesContext(),
}));

jest.mock("../../contexts/ReportsContext", () => ({
  useReportsContext: () => ({ addReport: mockAddReport }),
}));

jest.spyOn(Alert, "alert");

beforeEach(() => {
  jest.clearAllMocks();
  mockUseRoute.mockReturnValue({ params: { userId: "user-3" } }); // Rafael Santos — está em match-1
  mockUseMatchesContext.mockReturnValue({ matches: MOCK_MATCHES });
});

// ─── Renderização ─────────────────────────────────────────────────────────────

describe("ReportUserScreen — renderização", () => {
  it("exibe o nome do usuário sendo denunciado no card", () => {
    render(<ReportUserScreen />);
    expect(screen.getByText("Rafael Souza")).toBeTruthy();
  });

  it("exibe todos os 7 motivos de denúncia", () => {
    render(<ReportUserScreen />);
    expect(screen.getByLabelText("Comportamento inadequado")).toBeTruthy();
    expect(screen.getByLabelText("Violência ou agressão")).toBeTruthy();
    expect(screen.getByLabelText("Não compareceu")).toBeTruthy();
    expect(screen.getByLabelText("Discurso de ódio")).toBeTruthy();
    expect(screen.getByLabelText("Spam ou publicidade")).toBeTruthy();
    expect(screen.getByLabelText("Informações falsas")).toBeTruthy();
    expect(screen.getByLabelText("Outro")).toBeTruthy();
  });

  it("exibe campo de descrição com contador de caracteres", () => {
    render(<ReportUserScreen />);
    expect(screen.getByLabelText("Descrição da denúncia")).toBeTruthy();
    expect(screen.getByText("0/500")).toBeTruthy();
  });

  it("exibe aviso sobre denúncias falsas", () => {
    render(<ReportUserScreen />);
    expect(screen.getByText(/revisadas pela equipe do SquadUp/)).toBeTruthy();
  });

  it("exibe seção de partida relacionada quando usuário tem partidas", () => {
    render(<ReportUserScreen />);
    // Rafael (user-3) está em match-1 "Pelada de domingo na arena"
    expect(screen.getByLabelText("Nenhuma partida")).toBeTruthy();
    expect(screen.getByLabelText("Pelada de domingo na arena")).toBeTruthy();
  });

  it("não exibe seção de partida relacionada quando usuário não tem partidas", () => {
    mockUseMatchesContext.mockReturnValueOnce({ matches: [] });
    render(<ReportUserScreen />);
    expect(screen.queryByLabelText("Nenhuma partida")).toBeNull();
  });
});

// ─── Validação ────────────────────────────────────────────────────────────────

describe("ReportUserScreen — validação", () => {
  it("exibe erro ao tentar enviar sem motivo selecionado", () => {
    render(<ReportUserScreen />);
    fireEvent.press(screen.getByText("Enviar denúncia"));
    expect(screen.getByText("Selecione o motivo da denúncia.")).toBeTruthy();
  });

  it("selecionar um motivo remove o erro", () => {
    render(<ReportUserScreen />);
    fireEvent.press(screen.getByText("Enviar denúncia"));
    expect(screen.getByText("Selecione o motivo da denúncia.")).toBeTruthy();
    fireEvent.press(screen.getByLabelText("Comportamento inadequado"));
    expect(screen.queryByText("Selecione o motivo da denúncia.")).toBeNull();
  });
});

// ─── Submissão ────────────────────────────────────────────────────────────────

describe("ReportUserScreen — submissão", () => {
  it("envia denúncia com motivo selecionado e exibe Alert com nome do usuário", () => {
    render(<ReportUserScreen />);
    fireEvent.press(screen.getByLabelText("Comportamento inadequado"));
    fireEvent.press(screen.getByText("Enviar denúncia"));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Denúncia enviada!",
      expect.stringContaining("Rafael Souza"),
      expect.any(Array)
    );
  });

  it("registra a denúncia no ReportsContext com status pendente", () => {
    render(<ReportUserScreen />);
    fireEvent.press(screen.getByLabelText("Comportamento inadequado"));
    fireEvent.press(screen.getByText("Enviar denúncia"));
    expect(mockAddReport).toHaveBeenCalledWith(
      expect.objectContaining({ reason: "bad_behavior", status: "pending" })
    );
  });

  it("botão OK do alert chama goBack", () => {
    (Alert.alert as jest.Mock).mockImplementationOnce((_title, _msg, buttons) => {
      buttons[0].onPress?.();
    });
    render(<ReportUserScreen />);
    fireEvent.press(screen.getByLabelText("Spam ou publicidade"));
    fireEvent.press(screen.getByText("Enviar denúncia"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});

// ─── Navegação ────────────────────────────────────────────────────────────────

describe("ReportUserScreen — navegação", () => {
  it("botão Voltar chama goBack", () => {
    render(<ReportUserScreen />);
    fireEvent.press(screen.getByLabelText("Voltar"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});

// ─── Partida relacionada ──────────────────────────────────────────────────────

describe("ReportUserScreen — partida relacionada", () => {
  it("chip Nenhuma está selecionado por padrão", () => {
    render(<ReportUserScreen />);
    const noneChip = screen.getByLabelText("Nenhuma partida");
    expect(noneChip.props.accessibilityState.selected).toBe(true);
  });

  it("selecionar uma partida marca o chip como selecionado", () => {
    render(<ReportUserScreen />);
    const matchChip = screen.getByLabelText("Pelada de domingo na arena");
    fireEvent.press(matchChip);
    expect(matchChip.props.accessibilityState.selected).toBe(true);
  });
});

// ─── userId inválido ──────────────────────────────────────────────────────────

describe("ReportUserScreen — userId inválido", () => {
  it("exibe mensagem de erro para userId inexistente", () => {
    mockUseRoute.mockReturnValue({ params: { userId: "user-nao-existe" } });
    render(<ReportUserScreen />);
    expect(screen.getByText("Usuário não encontrado.")).toBeTruthy();
  });
});
