import { act, renderHook, waitFor } from "@testing-library/react-native";

import { createQueryWrapper } from "../../test-utils/queryClientWrapper";
import { useCreateReport, useReports, useUpdateReportAction } from "../useReports";

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
    match: null,
    reason: "bad_behavior",
    description: "Comportamento agressivo.",
    status: "pending",
    created_at: "2026-05-26T14:00:00Z",
    ...overrides,
  };
}

function mockFetchOnce(body: unknown, status = 200) {
  globalThis.fetch = jest.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  })) as jest.Mock;
}

describe("useReports", () => {
  it("busca GET /reports e converte para o shape camelCase", async () => {
    mockFetchOnce([apiReport()]);

    const { result } = renderHook(() => useReports(), { wrapper: createQueryWrapper() });

    await waitFor(() => expect(result.current.reports).toHaveLength(1));
    expect(result.current.reports[0].reportedUser.name).toBe("Rafael Souza");
    expect(result.current.reports[0].reporterUser.name).toBe("Guilherme Freire");
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/reports"),
      expect.objectContaining({ method: "GET" })
    );
  });
});

describe("useCreateReport", () => {
  it("envia POST /reports com o payload esperado", async () => {
    mockFetchOnce(apiReport(), 201);

    const { result } = renderHook(() => useCreateReport(), { wrapper: createQueryWrapper() });
    const onSuccess = jest.fn();

    act(() => {
      result.current.submitReport(
        {
          reported_user_id: "user-3",
          reason: "bad_behavior",
          description: "Comportamento agressivo.",
        },
        { onSuccess }
      );
    });

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/reports"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          reported_user_id: "user-3",
          reason: "bad_behavior",
          description: "Comportamento agressivo.",
        }),
      })
    );
  });

  it("chama onError quando o POST falha", async () => {
    mockFetchOnce({ detail: { code: "SERVER_ERROR", message: "Erro" } }, 500);

    const { result } = renderHook(() => useCreateReport(), { wrapper: createQueryWrapper() });
    const onError = jest.fn();

    act(() => {
      result.current.submitReport(
        { reported_user_id: "user-3", reason: "spam", description: "" },
        { onError }
      );
    });

    await waitFor(() => expect(onError).toHaveBeenCalled());
  });
});

describe("useUpdateReportAction", () => {
  it("envia PATCH /reports/{id} com a ação escolhida", async () => {
    mockFetchOnce(apiReport({ status: "archived" }));

    const { result } = renderHook(() => useUpdateReportAction(), {
      wrapper: createQueryWrapper(),
    });
    const onSuccess = jest.fn();

    act(() => {
      result.current.updateReportAction("report-1", "archive", { onSuccess });
    });

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/reports/report-1"),
      expect.objectContaining({ method: "PATCH", body: JSON.stringify({ action: "archive" }) })
    );
  });
});
