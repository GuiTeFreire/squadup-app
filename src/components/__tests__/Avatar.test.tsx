import { render, screen } from "@testing-library/react-native";
import React from "react";

import Avatar from "../Avatar";

describe("Avatar", () => {
  it("renders initials when no photoUrl is provided", () => {
    render(<Avatar name="Guilherme Freire" />);
    expect(screen.getByText("GF")).toBeTruthy();
  });

  it("renders single initial for one-word name", () => {
    render(<Avatar name="Guilherme" />);
    expect(screen.getByText("G")).toBeTruthy();
  });

  it("renders image when photoUrl is provided", () => {
    render(<Avatar name="Ana Lima" photoUrl="https://example.com/photo.jpg" />);
    expect(screen.getByLabelText("Foto de Ana Lima")).toBeTruthy();
  });

  it("renders all sizes without crashing", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Avatar name="Teste" size={size} />);
      expect(screen.getByText("T")).toBeTruthy();
      unmount();
    });
  });
});
