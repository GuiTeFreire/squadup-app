import { render, screen } from "@testing-library/react-native";
import React from "react";

import Badge from "../Badge";

describe("Badge", () => {
  it("renders the label", () => {
    render(<Badge label="Futebol" />);
    expect(screen.getByText("Futebol")).toBeTruthy();
  });

  it("renders sport badge with emoji prefix", () => {
    render(<Badge label="Futebol" variant="sport" sport="football" />);
    expect(screen.getByText("⚽ Futebol")).toBeTruthy();
  });

  it("renders level badge", () => {
    render(<Badge label="Intermediário" variant="level" level="intermediate" />);
    expect(screen.getByText("Intermediário")).toBeTruthy();
  });

  it("renders status badge for open match", () => {
    render(<Badge label="Aberta" variant="status" status="open" />);
    expect(screen.getByText("Aberta")).toBeTruthy();
  });

  it("renders status badge for full match", () => {
    render(<Badge label="Lotada" variant="status" status="full" />);
    expect(screen.getByText("Lotada")).toBeTruthy();
  });

  it("renders custom badge without variant", () => {
    render(<Badge label="Novidade" />);
    expect(screen.getByText("Novidade")).toBeTruthy();
  });
});
