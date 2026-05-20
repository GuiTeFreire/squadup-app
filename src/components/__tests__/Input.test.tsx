import { render, screen } from "@testing-library/react-native";
import React from "react";

import Input from "../Input";

describe("Input", () => {
  it("renders without crashing", () => {
    render(<Input placeholder="Digite aqui" />);
    expect(screen.getByPlaceholderText("Digite aqui")).toBeTruthy();
  });

  it("renders the label when provided", () => {
    render(<Input label="E-mail" />);
    expect(screen.getByText("E-mail")).toBeTruthy();
  });

  it("does not render label when not provided", () => {
    render(<Input placeholder="Sem label" />);
    expect(screen.queryByText("E-mail")).toBeNull();
  });

  it("renders error message when provided", () => {
    render(<Input label="Senha" error="Campo obrigatório" />);
    expect(screen.getByText("Campo obrigatório")).toBeTruthy();
  });

  it("does not render error message when not provided", () => {
    render(<Input label="Senha" />);
    expect(screen.queryByText("Campo obrigatório")).toBeNull();
  });

  it("passes accessibilityLabel from label prop", () => {
    render(<Input label="Nome completo" />);
    expect(screen.getByLabelText("Nome completo")).toBeTruthy();
  });
});
