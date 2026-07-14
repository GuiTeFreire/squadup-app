import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";

import { createQueryWrapper } from "../../test-utils/queryClientWrapper";
import ReportUserScreen from "../ReportUserScreen";

const mockGoBack = jest.fn();
const mockUseRoute = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
  useRoute: () => mockUseRoute(),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

jest.spyOn(Alert, "alert");

function mockFetchOnce(body: unknown, status = 201) {
  globalThis.fetch = jest.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  })) as jest.Mock;
}

function renderWithQueryClient() {
  return render(<ReportUserScreen />, { wrapper: createQueryWrapper() });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockUseRoute.mockReturnValue({ params: { userId: "user-3" } }); // Rafael Santos
});

// ─── Renderização ─────────────────────────────────────────────────────────────

describe("ReportUserScreen — renderização", () => {
  it("exibe o nome do usuário sendo denunciado no card", () => {
    renderWithQueryClient();
    expect(screen.getByText("Rafael Souza")).toBeTruthy();
  });

  it("exibe todos os 7 motivos de denúncia", () => {
    renderWithQueryClient();
    expect(screen.getByLabelText("Comportamento inadequado")).toBeTruthy();
    expect(screen.getByLabelText("Violência ou agressão")).toBeTruthy();
    expect(screen.getByLabelText("Não compareceu")).toBeTruthy();
    expect(screen.getByLabelText("Discurso de ódio")).toBeTruthy();
    expect(screen.getByLabelText("Spam ou publicidade")).toBeTruthy();
    expect(screen.getByLabelText("Informações falsas")).toBeTruthy();
    expect(screen.getByLabelText("Outro")).toBeTruthy();
  });

  it("exibe campo de descrição com contador de caracteres", () => {
    renderWithQueryClient();
    expect(screen.getByLabelText("Descrição da denúncia")).toBeTruthy();
    expect(screen.getByText("0/500")).toBeTruthy();
  });

  it("exibe aviso sobre denúncias falsas", () => {
    renderWithQueryClient();
    expect(screen.getByText(/revisadas pela equipe do SquadUp/)).toBeTruthy();
  });

  it("não exibe seção de partida relacionada (D23 — sem endpoint de partidas em comum)", () => {
    renderWithQueryClient();
    expect(screen.queryByLabelText("Nenhuma partida")).toBeNull();
  });
});

// ─── Validação ────────────────────────────────────────────────────────────────

describe("ReportUserScreen — validação", () => {
  it("exibe erro ao tentar enviar sem motivo selecionado", () => {
    renderWithQueryClient();
    fireEvent.press(screen.getByText("Enviar denúncia"));
    expect(screen.getByText("Selecione o motivo da denúncia.")).toBeTruthy();
  });

  it("selecionar um motivo remove o erro", () => {
    renderWithQueryClient();
    fireEvent.press(screen.getByText("Enviar denúncia"));
    expect(screen.getByText("Selecione o motivo da denúncia.")).toBeTruthy();
    fireEvent.press(screen.getByLabelText("Comportamento inadequado"));
    expect(screen.queryByText("Selecione o motivo da denúncia.")).toBeNull();
  });
});

// ─── Submissão ────────────────────────────────────────────────────────────────

describe("ReportUserScreen — submissão", () => {
  it("envia POST /reports com o payload esperado e exibe Alert com nome do usuário", async () => {
    mockFetchOnce({
      id: "report-99",
      reported_user: { id: "user-3" },
      reporter: { id: "user-1" },
      match: null,
      reason: "bad_behavior",
      description: "",
      status: "pending",
      created_at: "2026-07-14T10:00:00Z",
    });
    renderWithQueryClient();
    fireEvent.press(screen.getByLabelText("Comportamento inadequado"));
    fireEvent.press(screen.getByText("Enviar denúncia"));
    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        "Denúncia enviada!",
        expect.stringContaining("Rafael Souza"),
        expect.any(Array)
      )
    );
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/reports"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          reported_user_id: "user-3",
          match_id: undefined,
          reason: "bad_behavior",
          description: "",
        }),
      })
    );
  });

  it("botão OK do alert chama goBack", async () => {
    mockFetchOnce({
      id: "report-99",
      reported_user: { id: "user-3" },
      reporter: { id: "user-1" },
      match: null,
      reason: "spam",
      description: "",
      status: "pending",
      created_at: "2026-07-14T10:00:00Z",
    });
    (Alert.alert as jest.Mock).mockImplementationOnce((_title, _msg, buttons) => {
      buttons[0].onPress?.();
    });
    renderWithQueryClient();
    fireEvent.press(screen.getByLabelText("Spam ou publicidade"));
    fireEvent.press(screen.getByText("Enviar denúncia"));
    await waitFor(() => expect(mockGoBack).toHaveBeenCalledTimes(1));
  });

  it("exibe erro quando o envio falha", async () => {
    mockFetchOnce({ detail: { code: "SERVER_ERROR", message: "Erro" } }, 500);
    renderWithQueryClient();
    fireEvent.press(screen.getByLabelText("Comportamento inadequado"));
    fireEvent.press(screen.getByText("Enviar denúncia"));
    await waitFor(() =>
      expect(screen.getByText("Não foi possível enviar a denúncia. Tente novamente.")).toBeTruthy()
    );
  });
});

// ─── Navegação ────────────────────────────────────────────────────────────────

describe("ReportUserScreen — navegação", () => {
  it("botão Voltar chama goBack", () => {
    renderWithQueryClient();
    fireEvent.press(screen.getByLabelText("Voltar"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});

// ─── userId inválido ──────────────────────────────────────────────────────────

describe("ReportUserScreen — userId inválido", () => {
  it("exibe mensagem de erro para userId inexistente", () => {
    mockUseRoute.mockReturnValue({ params: { userId: "user-nao-existe" } });
    renderWithQueryClient();
    expect(screen.getByText("Usuário não encontrado.")).toBeTruthy();
  });
});
