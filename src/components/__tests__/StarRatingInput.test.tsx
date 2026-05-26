import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

import StarRatingInput from "../StarRatingInput";

describe("StarRatingInput", () => {
  describe("renderização", () => {
    it("renderiza o label quando fornecido", () => {
      render(<StarRatingInput value={0} onChange={jest.fn()} label="Pontualidade" />);
      expect(screen.getByText("Pontualidade")).toBeTruthy();
    });

    it("não renderiza label quando não fornecido", () => {
      render(<StarRatingInput value={0} onChange={jest.fn()} />);
      expect(screen.queryByText("Pontualidade")).toBeNull();
    });

    it("renderiza exatamente 5 botões de estrela", () => {
      render(<StarRatingInput value={0} onChange={jest.fn()} />);
      expect(screen.getAllByRole("button")).toHaveLength(5);
    });
  });

  describe("interação", () => {
    it("chama onChange com 1 ao pressionar a primeira estrela", () => {
      const onChange = jest.fn();
      render(<StarRatingInput value={0} onChange={onChange} />);
      fireEvent.press(screen.getByLabelText("1 estrela"));
      expect(onChange).toHaveBeenCalledWith(1);
    });

    it("chama onChange com 3 ao pressionar a terceira estrela", () => {
      const onChange = jest.fn();
      render(<StarRatingInput value={0} onChange={onChange} />);
      fireEvent.press(screen.getByLabelText("3 estrelas"));
      expect(onChange).toHaveBeenCalledWith(3);
    });

    it("chama onChange com 5 ao pressionar a quinta estrela", () => {
      const onChange = jest.fn();
      render(<StarRatingInput value={0} onChange={onChange} />);
      fireEvent.press(screen.getByLabelText("5 estrelas"));
      expect(onChange).toHaveBeenCalledWith(5);
    });

    it("chama onChange mesmo quando a estrela já está selecionada", () => {
      const onChange = jest.fn();
      render(<StarRatingInput value={4} onChange={onChange} />);
      fireEvent.press(screen.getByLabelText("4 estrelas"));
      expect(onChange).toHaveBeenCalledWith(4);
    });
  });
});
