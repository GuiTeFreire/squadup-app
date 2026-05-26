import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

import MatchDetailScreen from "../MatchDetailScreen";

const mockGoBack = jest.fn();
const mockUseRoute = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
  useRoute: () => mockUseRoute(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("MatchDetailScreen — estado: aberta / não participa", () => {
  beforeEach(() => {
    // match-6: open, CURRENT_USER (Guilherme) não é participante
    mockUseRoute.mockReturnValue({ params: { matchId: "match-6" } });
  });

  it('exibe o botão "Participar"', () => {
    render(<MatchDetailScreen />);
    expect(screen.getByText("Participar")).toBeTruthy();
  });

  it('ao pressionar "Participar" sem aprovação obrigatória, exibe confirmação', () => {
    render(<MatchDetailScreen />);
    fireEvent.press(screen.getByText("Participar"));
    expect(screen.getByText("Você está confirmado")).toBeTruthy();
  });
});

describe("MatchDetailScreen — estado: participante confirmado", () => {
  beforeEach(() => {
    // match-4: open, CURRENT_USER confirmado
    mockUseRoute.mockReturnValue({ params: { matchId: "match-4" } });
  });

  it('exibe "Você está confirmado" e opção de cancelar', () => {
    render(<MatchDetailScreen />);
    expect(screen.getByText("Você está confirmado")).toBeTruthy();
    expect(screen.getByText("Cancelar participação")).toBeTruthy();
  });
});

describe("MatchDetailScreen — estado: aguardando aprovação (pending)", () => {
  beforeEach(() => {
    // match-2: open, CURRENT_USER pending
    mockUseRoute.mockReturnValue({ params: { matchId: "match-2" } });
  });

  it('exibe "Aguardando aprovação" e opção de cancelar solicitação', () => {
    render(<MatchDetailScreen />);
    // "Aguardando aprovação" aparece no banner e na ParticipantList
    expect(screen.getAllByText("Aguardando aprovação").length).toBeGreaterThan(0);
    expect(screen.getByText("Cancelar solicitação")).toBeTruthy();
  });
});

describe("MatchDetailScreen — estado: partida lotada (usuário fora)", () => {
  beforeEach(() => {
    // match-12: full, CURRENT_USER não é participante
    mockUseRoute.mockReturnValue({ params: { matchId: "match-12" } });
  });

  it('exibe o botão desabilitado "Partida lotada"', () => {
    render(<MatchDetailScreen />);
    expect(screen.getByText("Partida lotada")).toBeTruthy();
  });
});

describe("MatchDetailScreen — estado: encerrada / cancelada", () => {
  beforeEach(() => {
    // match-10: cancelled
    mockUseRoute.mockReturnValue({ params: { matchId: "match-10" } });
  });

  it('exibe o botão desabilitado "Partida encerrada"', () => {
    render(<MatchDetailScreen />);
    expect(screen.getByText("Partida encerrada")).toBeTruthy();
  });
});

describe("MatchDetailScreen — renderização geral", () => {
  beforeEach(() => {
    mockUseRoute.mockReturnValue({ params: { matchId: "match-1" } });
  });

  it("exibe o título da partida", () => {
    render(<MatchDetailScreen />);
    expect(screen.getByText("Pelada de domingo na arena")).toBeTruthy();
  });

  it("exibe o nome do organizador", () => {
    render(<MatchDetailScreen />);
    // Guilherme aparece como organizador e como participante confirmado
    expect(screen.getAllByText("Guilherme Freire").length).toBeGreaterThan(0);
  });

  it("exibe o local da partida", () => {
    render(<MatchDetailScreen />);
    expect(screen.getByText("Arena Pinheiros — Rua Teodoro Sampaio, 1400")).toBeTruthy();
  });

  it("exibe o botão Voltar acessível", () => {
    render(<MatchDetailScreen />);
    expect(screen.getByLabelText("Voltar")).toBeTruthy();
  });

  it("pressionar Voltar chama goBack", () => {
    render(<MatchDetailScreen />);
    fireEvent.press(screen.getByLabelText("Voltar"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("exibe mensagem de erro para matchId inexistente", () => {
    mockUseRoute.mockReturnValue({ params: { matchId: "match-nao-existe" } });
    render(<MatchDetailScreen />);
    expect(screen.getByText("Partida não encontrada.")).toBeTruthy();
  });
});
