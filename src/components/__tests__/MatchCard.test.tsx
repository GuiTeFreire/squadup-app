import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

import MatchCard from "../MatchCard";
import type { MatchSummary } from "../../types";

const BASE_MATCH: MatchSummary = {
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
  availableSlots: 8,
  status: "open",
  allowBeginners: false,
  requiresApproval: false,
  latitude: null,
  longitude: null,
  distanceKm: null,
};

describe("MatchCard", () => {
  it("renderiza o título da partida", () => {
    render(<MatchCard match={BASE_MATCH} />);
    expect(screen.getByText("Pelada de domingo")).toBeTruthy();
  });

  it("renderiza o local da partida", () => {
    render(<MatchCard match={BASE_MATCH} />);
    expect(screen.getByText("Arena Botafogo")).toBeTruthy();
  });

  it("renderiza o horário", () => {
    render(<MatchCard match={BASE_MATCH} />);
    expect(screen.getByText(/09:00/)).toBeTruthy();
  });

  it("renderiza informação de vagas confirmadas", () => {
    render(<MatchCard match={BASE_MATCH} />);
    expect(screen.getByText(/2\/10 confirmados/)).toBeTruthy();
  });

  it("mostra vagas disponíveis corretamente", () => {
    render(<MatchCard match={BASE_MATCH} />);
    expect(screen.getByText(/8 vagas disponíveis/)).toBeTruthy();
  });

  it("exibe badge 'Lotada' quando status é full", () => {
    render(<MatchCard match={{ ...BASE_MATCH, status: "full" }} />);
    expect(screen.getByText("Lotada")).toBeTruthy();
  });

  it("exibe badge 'Cancelada' quando status é cancelled", () => {
    render(<MatchCard match={{ ...BASE_MATCH, status: "cancelled" }} />);
    expect(screen.getByText("Cancelada")).toBeTruthy();
  });

  it("exibe badge 'Aprovação' quando requiresApproval é true", () => {
    render(<MatchCard match={{ ...BASE_MATCH, requiresApproval: true }} />);
    expect(screen.getByText("Aprovação")).toBeTruthy();
  });

  it("exibe 'Iniciantes OK' quando allowBeginners é true", () => {
    render(<MatchCard match={{ ...BASE_MATCH, allowBeginners: true }} />);
    expect(screen.getByText("Iniciantes OK")).toBeTruthy();
  });

  it("chama onPress ao pressionar o card", () => {
    const onPress = jest.fn();
    render(<MatchCard match={BASE_MATCH} onPress={onPress} />);
    fireEvent.press(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("exibe 'Sem vagas' quando partida está lotada", () => {
    render(<MatchCard match={{ ...BASE_MATCH, confirmedCount: 10, availableSlots: 0 }} />);
    expect(screen.getByText(/Sem vagas/)).toBeTruthy();
  });

  it("exibe a distância quando distanceKm está disponível", () => {
    render(<MatchCard match={{ ...BASE_MATCH, distanceKm: 3.2 }} />);
    expect(screen.getByText(/3,2 km/)).toBeTruthy();
  });

  it("não exibe distância quando distanceKm é null", () => {
    render(<MatchCard match={BASE_MATCH} />);
    expect(screen.queryByText(/km/)).toBeNull();
  });
});
