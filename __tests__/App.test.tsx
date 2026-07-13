import { render } from "@testing-library/react-native";
import React from "react";

jest.mock("../global.css", () => ({}));

import App from "../App";

jest.mock("react-native-safe-area-context", () => {
  const actual = jest.requireActual("react-native-safe-area-context");
  return {
    ...actual,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

describe("App", () => {
  it("renderiza sem quebrar com o QueryClientProvider por fora dos Contexts existentes", () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
