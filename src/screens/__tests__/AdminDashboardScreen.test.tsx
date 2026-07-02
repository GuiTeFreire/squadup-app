import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

import { MOCK_REPORTS } from "../../mocks/reports";
import AdminDashboardScreen from "../AdminDashboardScreen";

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockUseReportsContext = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ goBack: mockGoBack, navigate: mockNavigate }),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

jest.mock("../../contexts/ReportsContext", () => ({
  useReportsContext: () => mockUseReportsContext(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockUseReportsContext.mockReturnValue({ reports: MOCK_REPORTS });
});

describe("AdminDashboardScreen — renderização", () => {
  it("exibe a contagem de denúncias pendentes", () => {
    render(<AdminDashboardScreen />);
    // MOCK_REPORTS tem 2 denúncias "pending" (report-1, report-2)
    expect(screen.getByText("2 denúncias pendentes")).toBeTruthy();
  });

  it("lista os usuários denunciados", () => {
    render(<AdminDashboardScreen />);
    expect(screen.getByLabelText("Denúncia contra Rafael Souza")).toBeTruthy();
    expect(screen.getByLabelText("Denúncia contra Juliana Costa")).toBeTruthy();
  });

  it("exibe estado vazio quando não há denúncias", () => {
    mockUseReportsContext.mockReturnValue({ reports: [] });
    render(<AdminDashboardScreen />);
    expect(screen.getByText("Sem denúncias")).toBeTruthy();
    expect(screen.getByText("Nenhuma denúncia pendente")).toBeTruthy();
  });
});

describe("AdminDashboardScreen — ordenação", () => {
  it("exibe denúncias pendentes antes das já tratadas", () => {
    render(<AdminDashboardScreen />);
    const items = screen
      .getAllByRole("button")
      .filter((el) => String(el.props.accessibilityLabel ?? "").startsWith("Denúncia contra"));
    expect(items[0].props.accessibilityLabel).toBe("Denúncia contra Rafael Souza");
  });
});

describe("AdminDashboardScreen — navegação", () => {
  it("ao pressionar uma denúncia, navega para ReportDetail com o id correto", () => {
    render(<AdminDashboardScreen />);
    fireEvent.press(screen.getByLabelText("Denúncia contra Rafael Souza"));
    expect(mockNavigate).toHaveBeenCalledWith("ReportDetail", { reportId: "report-1" });
  });

  it("botão Voltar chama goBack", () => {
    render(<AdminDashboardScreen />);
    fireEvent.press(screen.getByLabelText("Voltar"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
