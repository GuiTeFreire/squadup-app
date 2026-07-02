import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

import Header from "../Header";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

describe("Header", () => {
  it("renders the title", () => {
    render(<Header title="Minhas Partidas" />);
    expect(screen.getByText("Minhas Partidas")).toBeTruthy();
  });

  it("does not render back button when onBack is not provided", () => {
    render(<Header title="Home" />);
    expect(screen.queryByLabelText("Voltar")).toBeNull();
  });

  it("renders back button when onBack is provided", () => {
    render(<Header title="Detalhes" onBack={() => {}} />);
    expect(screen.getByLabelText("Voltar")).toBeTruthy();
  });

  it("calls onBack when back button is pressed", () => {
    const onBack = jest.fn();
    render(<Header title="Detalhes" onBack={onBack} />);
    fireEvent.press(screen.getByLabelText("Voltar"));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
