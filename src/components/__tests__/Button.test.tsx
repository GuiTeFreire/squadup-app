import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

import Button from "../Button";

describe("Button", () => {
  it("renders the label", () => {
    render(<Button label="Entrar" onPress={() => {}} />);
    expect(screen.getByText("Entrar")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    render(<Button label="Salvar" onPress={onPress} />);
    fireEvent.press(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    render(<Button label="Salvar" onPress={onPress} disabled />);
    fireEvent.press(screen.getByRole("button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("does not call onPress when loading", () => {
    const onPress = jest.fn();
    render(<Button label="Carregando" onPress={onPress} loading />);
    fireEvent.press(screen.getByRole("button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("shows loading indicator when loading is true", () => {
    render(<Button label="Aguarde" onPress={() => {}} loading />);
    expect(screen.getByLabelText("Carregando")).toBeTruthy();
    expect(screen.queryByText("Aguarde")).toBeNull();
  });

  it("renders all variants without crashing", () => {
    const { rerender } = render(<Button label="Teste" onPress={() => {}} variant="primary" />);
    rerender(<Button label="Teste" onPress={() => {}} variant="secondary" />);
    rerender(<Button label="Teste" onPress={() => {}} variant="ghost" />);
    expect(screen.getByText("Teste")).toBeTruthy();
  });

  it("renders all sizes without crashing", () => {
    const { rerender } = render(<Button label="Teste" onPress={() => {}} size="sm" />);
    rerender(<Button label="Teste" onPress={() => {}} size="md" />);
    rerender(<Button label="Teste" onPress={() => {}} size="lg" />);
    expect(screen.getByText("Teste")).toBeTruthy();
  });
});
