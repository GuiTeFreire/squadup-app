import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import React from "react";

import { createQueryWrapper } from "../../test-utils/queryClientWrapper";
import AdminDashboardScreen from "../AdminDashboardScreen";

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ goBack: mockGoBack, navigate: mockNavigate }),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

const REPORTED_1 = {
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

const REPORTED_2 = { ...REPORTED_1, id: "user-4", name: "Juliana Costa" };
const REPORTER = { ...REPORTED_1, id: "user-1", name: "Guilherme Freire" };

function apiReport(overrides: Record<string, unknown> = {}) {
  return {
    id: "report-1",
    reported_user: REPORTED_1,
    reporter: REPORTER,
    match: null,
    reason: "bad_behavior",
    description: "Ficou discutindo com outros jogadores durante a pelada.",
    status: "pending",
    created_at: "2026-05-26T14:00:00Z",
    ...overrides,
  };
}

const MOCK_REPORTS_API = [
  apiReport(),
  apiReport({
    id: "report-2",
    reported_user: REPORTED_2,
    reason: "no_show",
    description: "Confirmou presença e não apareceu.",
    created_at: "2026-05-25T09:30:00Z",
  }),
];

function mockFetchOnce(body: unknown, status = 200) {
  globalThis.fetch = jest.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  })) as jest.Mock;
}

function renderWithQueryClient() {
  return render(<AdminDashboardScreen />, { wrapper: createQueryWrapper() });
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("AdminDashboardScreen — renderização", () => {
  it("exibe a contagem de denúncias pendentes", async () => {
    mockFetchOnce(MOCK_REPORTS_API);
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByText("2 denúncias pendentes")).toBeTruthy());
  });

  it("lista os usuários denunciados", async () => {
    mockFetchOnce(MOCK_REPORTS_API);
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByLabelText("Denúncia contra Rafael Souza")).toBeTruthy());
    expect(screen.getByLabelText("Denúncia contra Juliana Costa")).toBeTruthy();
  });

  it("exibe estado vazio quando não há denúncias", async () => {
    mockFetchOnce([]);
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByText("Sem denúncias")).toBeTruthy());
    expect(screen.getByText("Nenhuma denúncia pendente")).toBeTruthy();
  });
});

describe("AdminDashboardScreen — ordenação", () => {
  it("exibe denúncias pendentes antes das já tratadas", async () => {
    mockFetchOnce([
      ...MOCK_REPORTS_API,
      apiReport({ id: "report-3", status: "archived", reported_user: REPORTED_2 }),
    ]);
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByLabelText("Denúncia contra Rafael Souza")).toBeTruthy());
    const items = screen
      .getAllByRole("button")
      .filter((el) => String(el.props.accessibilityLabel ?? "").startsWith("Denúncia contra"));
    expect(items[0].props.accessibilityLabel).toBe("Denúncia contra Rafael Souza");
  });
});

describe("AdminDashboardScreen — navegação", () => {
  it("ao pressionar uma denúncia, navega para ReportDetail com o id correto", async () => {
    mockFetchOnce(MOCK_REPORTS_API);
    renderWithQueryClient();
    await waitFor(() => expect(screen.getByLabelText("Denúncia contra Rafael Souza")).toBeTruthy());
    fireEvent.press(screen.getByLabelText("Denúncia contra Rafael Souza"));
    expect(mockNavigate).toHaveBeenCalledWith("ReportDetail", { reportId: "report-1" });
  });

  it("botão Voltar chama goBack", async () => {
    mockFetchOnce(MOCK_REPORTS_API);
    renderWithQueryClient();
    fireEvent.press(screen.getByLabelText("Voltar"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
