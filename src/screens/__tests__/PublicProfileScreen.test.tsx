import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import React from "react";

import { createQueryWrapper } from "../../test-utils/queryClientWrapper";
import PublicProfileScreen from "../PublicProfileScreen";

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockUseRoute = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ goBack: mockGoBack, navigate: mockNavigate }),
  useRoute: () => mockUseRoute(),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

// useUserRatings (usado internamente para as avaliações do perfil) chama useAuth() por baixo —
// não relevante para o que esta tela testa, então um stub sem sessão basta.
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({ user: null }),
}));

const GUILHERME = {
  id: "user-1",
  name: "Guilherme Freire",
  photo_url: null,
  age: 28,
  location: "Botafogo, Rio de Janeiro",
  bio: null,
  favorite_sports: ["football"],
  level: "intermediate",
  is_verified: true,
  average_rating: 4.7,
  matches_played: 42,
};

const BEATRIZ = { ...GUILHERME, id: "user-6", name: "Beatriz Rocha" };

const ANA = {
  id: "user-2",
  name: "Ana Lima",
  photo_url: null,
  age: 24,
  location: "Ipanema, Rio de Janeiro",
  bio: "Jogo vôlei desde o colégio. Adoro conhecer novas pessoas pelo esporte!",
  favorite_sports: ["volleyball", "basketball"],
  level: "intermediate",
  is_verified: true,
  average_rating: 4.9,
  matches_played: 31,
};

const JULIANA = {
  id: "user-4",
  name: "Juliana Costa",
  photo_url: null,
  age: 21,
  location: "Barra da Tijuca, Rio de Janeiro",
  bio: "Iniciante no basquete, mas determinada! Aceito dicas com prazer.",
  favorite_sports: ["basketball", "volleyball"],
  level: "beginner",
  is_verified: false,
  average_rating: 4.3,
  matches_played: 8,
};

const RAFAEL = {
  id: "user-3",
  name: "Rafael Souza",
  photo_url: null,
  age: 32,
  location: "Leblon, Rio de Janeiro",
  bio: "Bom de bola, melhor ainda na resenha pós-jogo.",
  favorite_sports: ["football"],
  level: "advanced",
  is_verified: true,
  average_rating: 4.5,
  matches_played: 87,
};

const MATCH_REF = {
  id: "match-13",
  title: "Pelada de maio",
  sport: "football",
  date: "2026-05-10",
};

const ANA_RATINGS = [
  {
    id: "rating-3",
    match: MATCH_REF,
    rated_user: ANA,
    rater: GUILHERME,
    punctuality: 5,
    respect: 5,
    behavior: 5,
    presence: 5,
    overall: 5,
    comment: "Ana organiza tudo com muita competência. Pelada fluiu muito bem.",
    created_at: "2026-05-10T16:00:00Z",
  },
  {
    id: "rating-4",
    match: MATCH_REF,
    rated_user: ANA,
    rater: BEATRIZ,
    punctuality: 5,
    respect: 5,
    behavior: 4,
    presence: 5,
    overall: 5,
    created_at: "2026-05-11T09:00:00Z",
  },
];

function mockFetchByUrl(handlers: Record<string, { status?: number; body: unknown }>) {
  globalThis.fetch = jest.fn(async (url: string) => {
    const match = Object.entries(handlers).find(([pattern]) => url.includes(pattern));
    if (!match) throw new Error(`Unexpected fetch: ${url}`);
    const [, { status = 200, body }] = match;
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => body,
    };
  }) as jest.Mock;
}

function renderScreen() {
  return render(<PublicProfileScreen />, { wrapper: createQueryWrapper() });
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PublicProfileScreen — usuário com avaliações (Ana Lima, user-2)", () => {
  beforeEach(() => {
    mockUseRoute.mockReturnValue({ params: { userId: "user-2" } });
    mockFetchByUrl({
      "/users/user-2/ratings": { body: ANA_RATINGS },
      "/users/user-2": { body: ANA },
    });
  });

  it("exibe o nome do usuário no header", async () => {
    renderScreen();
    await waitFor(() => expect(screen.getAllByText("Ana Lima").length).toBeGreaterThan(0));
  });

  it("exibe o ícone de verificado quando usuário é verificado", async () => {
    renderScreen();
    await waitFor(() => expect(screen.getByText("Verificado")).toBeTruthy());
  });

  it("exibe a bio do usuário", async () => {
    renderScreen();
    await waitFor(() =>
      expect(
        screen.getByText("Jogo vôlei desde o colégio. Adoro conhecer novas pessoas pelo esporte!")
      ).toBeTruthy()
    );
  });

  it("exibe a localização do usuário", async () => {
    renderScreen();
    await waitFor(() => expect(screen.getByText("Ipanema, Rio de Janeiro")).toBeTruthy());
  });

  it("exibe os esportes favoritos como badges", async () => {
    renderScreen();
    await waitFor(() => expect(screen.getByText("Vôlei")).toBeTruthy());
    expect(screen.getByText("Basquete")).toBeTruthy();
  });

  it("exibe o nível de experiência", async () => {
    renderScreen();
    await waitFor(() => expect(screen.getByText("Intermediário")).toBeTruthy());
  });

  it("exibe avaliações recebidas quando existem", async () => {
    renderScreen();
    await waitFor(() =>
      expect(
        screen.getByText("Ana organiza tudo com muita competência. Pelada fluiu muito bem.")
      ).toBeTruthy()
    );
  });

  it("exibe cabeçalho de avaliações com contagem", async () => {
    renderScreen();
    await waitFor(() => expect(screen.getByText("Avaliações recebidas (2)")).toBeTruthy());
  });
});

describe("PublicProfileScreen — usuário sem avaliações (Juliana Costa, user-4)", () => {
  beforeEach(() => {
    mockUseRoute.mockReturnValue({ params: { userId: "user-4" } });
    mockFetchByUrl({
      "/users/user-4/ratings": { body: [] },
      "/users/user-4": { body: JULIANA },
    });
  });

  it("exibe mensagem de ausência de avaliações", async () => {
    renderScreen();
    await waitFor(() => expect(screen.getByText("Nenhuma avaliação ainda.")).toBeTruthy());
  });

  it("não exibe badge Verificado quando usuário não é verificado", async () => {
    renderScreen();
    await waitFor(() => expect(screen.getAllByText("Juliana Costa").length).toBeGreaterThan(0));
    expect(screen.queryByText("Verificado")).toBeNull();
  });
});

describe("PublicProfileScreen — navegação", () => {
  beforeEach(() => {
    mockUseRoute.mockReturnValue({ params: { userId: "user-3" } });
    mockFetchByUrl({
      "/users/user-3/ratings": { body: [] },
      "/users/user-3": { body: RAFAEL },
    });
  });

  it("botão Voltar chama goBack", async () => {
    renderScreen();
    await waitFor(() => expect(screen.getByLabelText("Voltar")).toBeTruthy());
    fireEvent.press(screen.getByLabelText("Voltar"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("botão Denunciar navega para ReportUser", async () => {
    renderScreen();
    await waitFor(() =>
      expect(screen.getAllByLabelText("Denunciar usuário").length).toBeGreaterThan(0)
    );
    // Dois elementos com esse label: ícone no header e botão no rodapé — qualquer um funciona
    fireEvent.press(screen.getAllByLabelText("Denunciar usuário")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("ReportUser", { userId: "user-3" });
  });
});

describe("PublicProfileScreen — userId inválido", () => {
  it("exibe mensagem de erro para userId inexistente", async () => {
    mockUseRoute.mockReturnValue({ params: { userId: "user-nao-existe" } });
    mockFetchByUrl({
      "/users/user-nao-existe": {
        status: 404,
        body: { detail: { code: "USER_NOT_FOUND", message: "Usuário não encontrado." } },
      },
    });
    renderScreen();
    await waitFor(() => expect(screen.getByText("Usuário não encontrado.")).toBeTruthy());
  });
});
