import { act, renderHook, waitFor } from "@testing-library/react-native";
import * as SecureStore from "expo-secure-store";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "../../contexts/AuthContext";
import { useHasRatedMap, useSubmitRating, useUserRatings } from "../useRatings";

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

const RATER = {
  id: "user-me",
  name: "Guilherme Freire",
  photo_url: null,
  age: 28,
  location: "Rio de Janeiro, RJ",
  bio: null,
  favorite_sports: ["football"],
  level: "intermediate",
  is_verified: false,
  average_rating: null,
  matches_played: 12,
  email: "guilherme@email.com",
  role: "user",
};

const RATED_USER = { ...RATER, id: "user-rated", name: "Ana Souza" };

function apiRating(overrides: Record<string, unknown> = {}) {
  return {
    id: "rating-1",
    match: { id: "match-1", title: "Pelada", sport: "football", date: "2026-05-25" },
    rated_user: RATED_USER,
    rater: RATER,
    punctuality: 5,
    respect: 5,
    behavior: 5,
    presence: 5,
    overall: 5,
    comment: null,
    created_at: "2026-05-25T20:00:00Z",
    ...overrides,
  };
}

interface RouteResponseSpec {
  status: number;
  body: unknown;
}

/**
 * `AuthProvider` dispara `GET /users/me` no boot ao mesmo tempo em que o hook sob teste
 * dispara suas próprias queries — não há garantia de qual delas chega primeiro no mock
 * global de `fetch`. Por isso as respostas são resolvidas por rota, não por ordem de chamada.
 */
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

function mockLoggedInSession() {
  (SecureStore.getItemAsync as jest.Mock).mockImplementation(async (key: string) => {
    if (key === "squadup.accessToken") return "token-abc";
    if (key === "squadup.refreshToken") return "refresh-abc";
    return null;
  });
}

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 } },
  });
  return function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    );
  };
}

describe("useUserRatings", () => {
  it("busca GET /users/{id}/ratings e converte para o shape camelCase", async () => {
    mockLoggedInSession();
    mockFetchByRoute({
      "/users/me": { status: 200, body: RATER },
      "/users/user-rated/ratings": { status: 200, body: [apiRating()] },
    });

    const { result } = renderHook(() => useUserRatings("user-rated"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.ratings).toHaveLength(1));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.ratings[0].raterUser.id).toBe("user-me");
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/users/user-rated/ratings"),
      expect.objectContaining({ method: "GET" })
    );
  });

  it("hasRated identifica quando o usuário logado já avaliou o alvo naquela partida", async () => {
    mockLoggedInSession();
    mockFetchByRoute({
      "/users/me": { status: 200, body: RATER },
      "/users/user-rated/ratings": {
        status: 200,
        body: [
          apiRating({
            match: { id: "match-1", title: "Pelada", sport: "football", date: "2026-05-25" },
          }),
        ],
      },
    });

    const { result } = renderHook(() => useUserRatings("user-rated"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.hasRated("match-1", "user-rated")).toBe(true));
    expect(result.current.hasRated("match-2", "user-rated")).toBe(false);
  });
});

describe("useSubmitRating", () => {
  it("envia POST /matches/{id}/ratings/{userId} com os critérios achatados", async () => {
    mockLoggedInSession();
    mockFetchByRoute({
      "/users/me": { status: 200, body: RATER },
      "/matches/match-1/ratings/user-rated": { status: 201, body: apiRating() },
    });

    const { result } = renderHook(() => useSubmitRating(), { wrapper: createWrapper() });
    const onSuccess = jest.fn();

    act(() => {
      result.current.submitRating(
        "match-1",
        "user-rated",
        { punctuality: 5, respect: 5, behavior: 5, presence: 5, overall: 5 },
        "Ótimo parceiro",
        { onSuccess }
      );
    });

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/matches/match-1/ratings/user-rated"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          punctuality: 5,
          respect: 5,
          behavior: 5,
          presence: 5,
          overall: 5,
          comment: "Ótimo parceiro",
        }),
      })
    );
  });

  it("chama onError quando o POST falha", async () => {
    mockLoggedInSession();
    mockFetchByRoute({
      "/users/me": { status: 200, body: RATER },
      "/matches/match-1/ratings/user-rated": { status: 500, body: { detail: null } },
    });

    const { result } = renderHook(() => useSubmitRating(), { wrapper: createWrapper() });
    const onError = jest.fn();

    act(() => {
      result.current.submitRating(
        "match-1",
        "user-rated",
        { punctuality: 5, respect: 5, behavior: 5, presence: 5, overall: 5 },
        undefined,
        { onError }
      );
    });

    await waitFor(() => expect(onError).toHaveBeenCalled());
  });
});

describe("useHasRatedMap", () => {
  it("retorna um mapa userId -> já avaliado para vários participantes de uma vez", async () => {
    mockLoggedInSession();
    mockFetchByRoute({
      "/users/me": { status: 200, body: RATER },
      "/users/user-rated/ratings": { status: 200, body: [apiRating()] },
      "/users/user-other/ratings": { status: 200, body: [] },
    });

    const { result } = renderHook(() => useHasRatedMap("match-1", ["user-rated", "user-other"]), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current["user-rated"]).toBe(true));
    expect(result.current["user-other"]).toBe(false);
  });
});
