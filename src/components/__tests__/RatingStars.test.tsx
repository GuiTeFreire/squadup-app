import { render, screen } from "@testing-library/react-native";
import React from "react";

import RatingStars from "../RatingStars";

describe("RatingStars", () => {
  it("shows the numeric value by default", () => {
    render(<RatingStars rating={4.7} />);
    expect(screen.getByText("4.7")).toBeTruthy();
  });

  it("hides the numeric value when showValue is false", () => {
    render(<RatingStars rating={4.7} showValue={false} />);
    expect(screen.queryByText("4.7")).toBeNull();
  });

  it("clamps rating above max to max", () => {
    render(<RatingStars rating={10} max={5} />);
    expect(screen.getByText("5.0")).toBeTruthy();
  });

  it("clamps negative rating to 0", () => {
    render(<RatingStars rating={-1} />);
    expect(screen.getByText("0.0")).toBeTruthy();
  });

  it("renders without crashing for all sizes", () => {
    const { rerender } = render(<RatingStars rating={3} size="sm" />);
    rerender(<RatingStars rating={3} size="md" />);
    rerender(<RatingStars rating={3} size="lg" />);
    expect(screen.getByText("3.0")).toBeTruthy();
  });

  it("renders correct value for half-star rating", () => {
    render(<RatingStars rating={3.5} />);
    expect(screen.getByText("3.5")).toBeTruthy();
  });
});
