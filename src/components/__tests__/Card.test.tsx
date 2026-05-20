import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import Card from "../Card";

describe("Card", () => {
  it("renders children", () => {
    render(
      <Card>
        <Text>Conteúdo do card</Text>
      </Card>
    );
    expect(screen.getByText("Conteúdo do card")).toBeTruthy();
  });

  it("calls onPress when pressable card is pressed", () => {
    const onPress = jest.fn();
    render(
      <Card onPress={onPress}>
        <Text>Card clicável</Text>
      </Card>
    );
    fireEvent.press(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders as non-pressable when onPress is not provided", () => {
    render(
      <Card>
        <Text>Card estático</Text>
      </Card>
    );
    expect(screen.queryByRole("button")).toBeNull();
  });
});
