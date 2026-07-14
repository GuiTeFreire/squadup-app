import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";

import { createQueryWrapper } from "../../test-utils/queryClientWrapper";
import ReportDetailScreen from "../ReportDetailScreen";

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

const REPORTED_USER = {
  id: "user-3",
  name: "Rafael Souza",
  photo_url: null,
  age: 30,
  location: "Rio de Janeiro, RJ",
  bio: null,
  favorite_sports: ["football"],
  level: "intermediate",
  is_verified: true,
  average_rating: 4.2,
  matches_played: 20,
};

const REPORTER = { ...REPORTED_USER, id: "user-1", name: "Guilherme Freire" };

function apiReport(overrides: Record<string, unknown> = {}) {
  return {
    id: "report-1",
    reported_user: REPORTED_USER,
    reporter: REPORTER,
    match: {
      id: "match-1",
      title: "Pelada de domingo na arena",
      sport: "football",
      date: "2026-05-25",
    },
    reason: "bad_behavior",
    description: "Ficou discutindo com outros jogadores durante a pelada.",
    status: "pending",
    created_at: "2026-05-26T14:00:00Z",
    ...overrides,
  };
}

interface RouteResponseSpec {
  status: number;
  body: unknown;
}

function mockFetchByRoute(routes: Record<string, RouteResponseSpec | RouteResponseSpec[]>) {
  const queues = new Map(
    Object.entries(routes).map(([path, spec]) => [path, Array.isArray(spec) ? [...spec] : [spec]])
  );
  globalThis.fetch = jest.fn(async (url: string, options: RequestInit = {}) => {
    const method = options.method ?? "GET";
    const matchedPath = [...queues.keys()].find((path) => url.includes(path));
    const queue = matchedPath ? queues.get(matchedPath) : undefined;
    const next = queue?.shift();
    if (!next) {
      throw new Error(`fetch sem mock para ${method} ${url}`);
    }
    return {
      ok: next.status >= 200 && next.status < 300,
      status: next.status,
      json: async () => next.body,
    } as Response;
  }) as jest.Mock;
}

function renderWithQueryClient() {
  return render(<ReportDetailScreen />, { wrapper: createQueryWrapper() });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockUseRoute.mockReturnValue({ params: { reportId: "report-1" } });
});

describe("ReportDetailScreen — renderização", () => {
  it("exibe usuário denunciado e denunciante", async () => {
    mockFetchByRoute({ "/reports": { status: 200, body: [apiReport()] } });
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByText("Rafael Souza")).toBeTruthy());
    expect(screen.getByText("Guilherme Freire")).toBeTruthy();
  });

  it("exibe motivo, descrição e status atual", async () => {
    mockFetchByRoute({ "/reports": { status: 200, body: [apiReport()] } });
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByText("Comportamento inadequado")).toBeTruthy());
    expect(
      screen.getByText("Ficou discutindo com outros jogadores durante a pelada.")
    ).toBeTruthy();
    expect(screen.getByText("Pendente")).toBeTruthy();
  });

  it("exibe partida relacionada quando existe", async () => {
    mockFetchByRoute({ "/reports": { status: 200, body: [apiReport()] } });
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByText("Pelada de domingo na arena")).toBeTruthy());
  });

  it("exibe mensagem para reportId inexistente", async () => {
    mockUseRoute.mockReturnValue({ params: { reportId: "report-inexistente" } });
    mockFetchByRoute({ "/reports": { status: 200, body: [apiReport()] } });
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByText("Denúncia não encontrada.")).toBeTruthy());
  });
});

describe("ReportDetailScreen — ações administrativas", () => {
  it("exibe as 3 ações disponíveis", async () => {
    mockFetchByRoute({ "/reports": { status: 200, body: [apiReport()] } });
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByText("Arquivar denúncia")).toBeTruthy());
    expect(screen.getByText("Advertir usuário")).toBeTruthy();
    expect(screen.getByText("Banir usuário")).toBeTruthy();
  });

  it("ao confirmar arquivar, envia PATCH com action archive e volta", async () => {
    mockFetchByRoute({
      "/reports/report-1": { status: 200, body: apiReport({ status: "archived" }) },
      "/reports": { status: 200, body: [apiReport()] },
    });
    (Alert.alert as jest.Mock).mockImplementationOnce((_title, _msg, buttons) => {
      buttons[1].onPress?.();
    });
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByText("Arquivar denúncia")).toBeTruthy());
    fireEvent.press(screen.getByText("Arquivar denúncia"));
    await waitFor(() => expect(mockGoBack).toHaveBeenCalledTimes(1));
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/reports/report-1"),
      expect.objectContaining({ method: "PATCH", body: JSON.stringify({ action: "archive" }) })
    );
  });

  it("ao confirmar banir, envia PATCH com action ban", async () => {
    mockFetchByRoute({
      "/reports/report-1": { status: 200, body: apiReport({ status: "banned" }) },
      "/reports": { status: 200, body: [apiReport()] },
    });
    (Alert.alert as jest.Mock).mockImplementationOnce((_title, _msg, buttons) => {
      buttons[1].onPress?.();
    });
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByText("Banir usuário")).toBeTruthy());
    fireEvent.press(screen.getByText("Banir usuário"));
    await waitFor(() =>
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/reports/report-1"),
        expect.objectContaining({ method: "PATCH", body: JSON.stringify({ action: "ban" }) })
      )
    );
  });

  it("cancelar a ação não envia PATCH", async () => {
    mockFetchByRoute({ "/reports": { status: 200, body: [apiReport()] } });
    (Alert.alert as jest.Mock).mockImplementationOnce(() => {});
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByText("Advertir usuário")).toBeTruthy());
    fireEvent.press(screen.getByText("Advertir usuário"));
    expect(mockGoBack).not.toHaveBeenCalled();
  });
});

describe("ReportDetailScreen — navegação", () => {
  it("botão Voltar chama goBack", async () => {
    mockFetchByRoute({ "/reports": { status: 200, body: [apiReport()] } });
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByLabelText("Voltar")).toBeTruthy());
    fireEvent.press(screen.getByLabelText("Voltar"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
