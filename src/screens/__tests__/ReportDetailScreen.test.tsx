import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";

import { MOCK_REPORTS } from "../../mocks/reports";
import ReportDetailScreen from "../ReportDetailScreen";

const mockGoBack = jest.fn();
const mockUseRoute = jest.fn();
const mockUpdateReportStatus = jest.fn();
const mockUseReportsContext = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
  useRoute: () => mockUseRoute(),
}));

jest.mock("../../contexts/ReportsContext", () => ({
  useReportsContext: () => mockUseReportsContext(),
}));

jest.spyOn(Alert, "alert");

beforeEach(() => {
  jest.clearAllMocks();
  mockUseRoute.mockReturnValue({ params: { reportId: "report-1" } }); // Rafael Souza, pending
  mockUseReportsContext.mockReturnValue({
    reports: MOCK_REPORTS,
    updateReportStatus: mockUpdateReportStatus,
  });
});

describe("ReportDetailScreen — renderização", () => {
  it("exibe usuário denunciado e denunciante", () => {
    render(<ReportDetailScreen />);
    expect(screen.getByText("Rafael Souza")).toBeTruthy();
    expect(screen.getByText("Guilherme Freire")).toBeTruthy();
  });

  it("exibe motivo, descrição e status atual", () => {
    render(<ReportDetailScreen />);
    expect(screen.getByText("Comportamento inadequado")).toBeTruthy();
    expect(
      screen.getByText("Ficou discutindo com outros jogadores durante a pelada.")
    ).toBeTruthy();
    expect(screen.getByText("Pendente")).toBeTruthy();
  });

  it("exibe partida relacionada quando existe", () => {
    render(<ReportDetailScreen />);
    expect(screen.getByText("Pelada de domingo na arena")).toBeTruthy();
  });

  it("exibe mensagem para reportId inexistente", () => {
    mockUseRoute.mockReturnValue({ params: { reportId: "report-inexistente" } });
    render(<ReportDetailScreen />);
    expect(screen.getByText("Denúncia não encontrada.")).toBeTruthy();
  });
});

describe("ReportDetailScreen — ações administrativas", () => {
  it("exibe as 3 ações disponíveis", () => {
    render(<ReportDetailScreen />);
    expect(screen.getByText("Arquivar denúncia")).toBeTruthy();
    expect(screen.getByText("Advertir usuário")).toBeTruthy();
    expect(screen.getByText("Banir usuário")).toBeTruthy();
  });

  it("ao confirmar arquivar, atualiza status e volta", () => {
    (Alert.alert as jest.Mock).mockImplementationOnce((_title, _msg, buttons) => {
      buttons[1].onPress?.();
    });
    render(<ReportDetailScreen />);
    fireEvent.press(screen.getByText("Arquivar denúncia"));
    expect(mockUpdateReportStatus).toHaveBeenCalledWith("report-1", "archived");
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("ao confirmar banir, atualiza status para banned", () => {
    (Alert.alert as jest.Mock).mockImplementationOnce((_title, _msg, buttons) => {
      buttons[1].onPress?.();
    });
    render(<ReportDetailScreen />);
    fireEvent.press(screen.getByText("Banir usuário"));
    expect(mockUpdateReportStatus).toHaveBeenCalledWith("report-1", "banned");
  });

  it("cancelar a ação não atualiza o status", () => {
    (Alert.alert as jest.Mock).mockImplementationOnce(() => {});
    render(<ReportDetailScreen />);
    fireEvent.press(screen.getByText("Advertir usuário"));
    expect(mockUpdateReportStatus).not.toHaveBeenCalled();
  });
});

describe("ReportDetailScreen — navegação", () => {
  it("botão Voltar chama goBack", () => {
    render(<ReportDetailScreen />);
    fireEvent.press(screen.getByLabelText("Voltar"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
