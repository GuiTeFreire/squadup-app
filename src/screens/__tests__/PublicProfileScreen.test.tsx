import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

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

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PublicProfileScreen — usuário com avaliações (Ana Lima, user-2)", () => {
  beforeEach(() => {
    mockUseRoute.mockReturnValue({ params: { userId: "user-2" } });
  });

  it("exibe o nome do usuário no header", () => {
    render(<PublicProfileScreen />);
    expect(screen.getAllByText("Ana Lima").length).toBeGreaterThan(0);
  });

  it("exibe o ícone de verificado quando usuário é verificado", () => {
    render(<PublicProfileScreen />);
    // Badge "Verificado" vem do TrustBadges
    expect(screen.getByText("Verificado")).toBeTruthy();
  });

  it("exibe a bio do usuário", () => {
    render(<PublicProfileScreen />);
    expect(
      screen.getByText("Jogo vôlei desde o colégio. Adoro conhecer novas pessoas pelo esporte!")
    ).toBeTruthy();
  });

  it("exibe a localização do usuário", () => {
    render(<PublicProfileScreen />);
    expect(screen.getByText("Ipanema, Rio de Janeiro")).toBeTruthy();
  });

  it("exibe os esportes favoritos como badges", () => {
    render(<PublicProfileScreen />);
    expect(screen.getByText("🏐 Vôlei")).toBeTruthy();
    expect(screen.getByText("🏀 Basquete")).toBeTruthy();
  });

  it("exibe o nível de experiência", () => {
    render(<PublicProfileScreen />);
    expect(screen.getByText("Intermediário")).toBeTruthy();
  });

  it("exibe avaliações recebidas quando existem", () => {
    render(<PublicProfileScreen />);
    // Ana tem ratings 3 e 4 — rating-3 tem comentário
    expect(
      screen.getByText("Ana organiza tudo com muita competência. Pelada fluiu muito bem.")
    ).toBeTruthy();
  });

  it("exibe cabeçalho de avaliações com contagem", () => {
    render(<PublicProfileScreen />);
    expect(screen.getByText("Avaliações recebidas (2)")).toBeTruthy();
  });
});

describe("PublicProfileScreen — usuário sem avaliações (Juliana Costa, user-4)", () => {
  beforeEach(() => {
    mockUseRoute.mockReturnValue({ params: { userId: "user-4" } });
  });

  it("exibe mensagem de ausência de avaliações", () => {
    render(<PublicProfileScreen />);
    expect(screen.getByText("Nenhuma avaliação ainda.")).toBeTruthy();
  });

  it("não exibe badge Verificado quando usuário não é verificado", () => {
    render(<PublicProfileScreen />);
    expect(screen.queryByText("Verificado")).toBeNull();
  });
});

describe("PublicProfileScreen — navegação", () => {
  beforeEach(() => {
    mockUseRoute.mockReturnValue({ params: { userId: "user-3" } });
  });

  it("botão Voltar chama goBack", () => {
    render(<PublicProfileScreen />);
    fireEvent.press(screen.getByLabelText("Voltar"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("botão Denunciar navega para ReportUser", () => {
    render(<PublicProfileScreen />);
    // Dois elementos com esse label: ícone no header e botão no rodapé — qualquer um funciona
    fireEvent.press(screen.getAllByLabelText("Denunciar usuário")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("ReportUser", { userId: "user-3" });
  });
});

describe("PublicProfileScreen — userId inválido", () => {
  it("exibe mensagem de erro para userId inexistente", () => {
    mockUseRoute.mockReturnValue({ params: { userId: "user-nao-existe" } });
    render(<PublicProfileScreen />);
    expect(screen.getByText("Usuário não encontrado.")).toBeTruthy();
  });
});
