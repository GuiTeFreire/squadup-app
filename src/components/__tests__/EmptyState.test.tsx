import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import EmptyState from "../EmptyState";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="Nenhuma partida encontrada" />);
    expect(screen.getByText("Nenhuma partida encontrada")).toBeTruthy();
  });

  it("renders default icon", () => {
    render(<EmptyState title="Vazio" />);
    expect(screen.getByText("🔍")).toBeTruthy();
  });

  it("renders custom icon", () => {
    render(<EmptyState icon="⚽" title="Sem partidas" />);
    expect(screen.getByText("⚽")).toBeTruthy();
  });

  it("renders description when provided", () => {
    render(
      <EmptyState title="Sem partidas" description="Crie uma nova partida ou ajuste os filtros." />
    );
    expect(screen.getByText("Crie uma nova partida ou ajuste os filtros.")).toBeTruthy();
  });

  it("does not render description when not provided", () => {
    render(<EmptyState title="Sem partidas" />);
    expect(screen.queryByText("Crie uma nova partida ou ajuste os filtros.")).toBeNull();
  });

  it("renders action element when provided", () => {
    render(<EmptyState title="Vazio" action={<Text>Criar partida</Text>} />);
    expect(screen.getByText("Criar partida")).toBeTruthy();
  });
});
