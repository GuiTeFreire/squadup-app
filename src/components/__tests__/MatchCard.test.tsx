import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

import MatchCard from "../MatchCard";
import type { Match } from "../../types";

const BASE_ORGANIZER = {
  id: "u1",
  name: "Ana Souza",
  age: 28,
  location: "Rio de Janeiro",
  favoriteSports: ["volleyball" as const],
  level: "intermediate" as const,
  averageRating: 4.5,
  matchesPlayed: 20,
  isVerified: true,
};

const BASE_MATCH: Match = {
  id: "m1",
  sport: "football",
  title: "Pelada de domingo",
  location: "Arena Botafogo",
  date: "2026-05-25",
  time: "09:00",
  maxParticipants: 10,
  level: "intermediate",
  organizer: BASE_ORGANIZER,
  participants: [
    { user: BASE_ORGANIZER, status: "confirmed" },
    { user: { ...BASE_ORGANIZER, id: "u2", name: "João Lima" }, status: "confirmed" },
  ],
  status: "open",
  allowBeginners: false,
  requiresApproval: false,
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

  it("renderiza o nome do organizador", () => {
    render(<MatchCard match={BASE_MATCH} />);
    expect(screen.getByText("Ana Souza")).toBeTruthy();
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
    const fullParticipants = Array.from({ length: 10 }, (_, i) => ({
      user: { ...BASE_ORGANIZER, id: `u${i}` },
      status: "confirmed" as const,
    }));
    render(<MatchCard match={{ ...BASE_MATCH, participants: fullParticipants }} />);
    expect(screen.getByText(/Sem vagas/)).toBeTruthy();
  });
});
