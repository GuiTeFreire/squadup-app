import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import React from "react";

import RegisterScreen from "../RegisterScreen";
import { calculateAge, parseBirthDate } from "../../utils/date";

const mockRegister = jest.fn();
const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: jest.fn() }),
}));

jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    register: mockRegister,
    isAuthenticated: false,
    user: null,
    pendingName: "",
  }),
}));

// Nascimento fixo em 1990 garante 18+ por décadas — evita depender do relógio real do teste.
const ADULT_BIRTH_DATE = "15/03/1990";
const CHILD_BIRTH_DATE = "01/01/2015";

function fillValidForm() {
  fireEvent.changeText(screen.getByLabelText("Nome completo"), "Ana Souza");
  fireEvent.changeText(screen.getByLabelText("E-mail"), "ana@email.com");
  fireEvent.changeText(screen.getByLabelText("Senha"), "senha123");
  fireEvent.changeText(screen.getByLabelText("Data de nascimento"), ADULT_BIRTH_DATE);
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("RegisterScreen", () => {
  it("renderiza o campo de data de nascimento", () => {
    render(<RegisterScreen />);
    expect(screen.getByLabelText("Data de nascimento")).toBeTruthy();
  });

  it("exibe erro quando a data de nascimento está vazia", () => {
    render(<RegisterScreen />);
    fireEvent.changeText(screen.getByLabelText("Nome completo"), "Ana Souza");
    fireEvent.changeText(screen.getByLabelText("E-mail"), "ana@email.com");
    fireEvent.changeText(screen.getByLabelText("Senha"), "senha123");
    fireEvent.press(screen.getByText("Criar conta"));
    expect(screen.getByText("Informe uma data de nascimento válida (DD/MM/AAAA)")).toBeTruthy();
  });

  it("exibe erro quando a data de nascimento não é uma data real", () => {
    render(<RegisterScreen />);
    fillValidForm();
    fireEvent.changeText(screen.getByLabelText("Data de nascimento"), "31/02/1990");
    fireEvent.press(screen.getByText("Criar conta"));
    expect(screen.getByText("Informe uma data de nascimento válida (DD/MM/AAAA)")).toBeTruthy();
  });

  it("exibe erro quando o usuário tem menos de 18 anos", () => {
    render(<RegisterScreen />);
    fillValidForm();
    fireEvent.changeText(screen.getByLabelText("Data de nascimento"), CHILD_BIRTH_DATE);
    fireEvent.press(screen.getByText("Criar conta"));
    expect(screen.getByText("Você precisa ter pelo menos 18 anos para se cadastrar")).toBeTruthy();
  });

  it("chama register com a idade calculada a partir da data de nascimento", async () => {
    render(<RegisterScreen />);
    fillValidForm();
    fireEvent.press(screen.getByText("Criar conta"));

    const expectedAge = calculateAge(parseBirthDate(ADULT_BIRTH_DATE)!);
    await waitFor(
      () =>
        expect(mockRegister).toHaveBeenCalledWith(
          "Ana Souza",
          "ana@email.com",
          "senha123",
          expectedAge
        ),
      { timeout: 1500 }
    );
  });

  it("navega para ProfileSetup após o registro", async () => {
    render(<RegisterScreen />);
    fillValidForm();
    fireEvent.press(screen.getByText("Criar conta"));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("ProfileSetup"), {
      timeout: 1500,
    });
  });

  it("não chama register quando o formulário tem erros", () => {
    render(<RegisterScreen />);
    fireEvent.press(screen.getByText("Criar conta"));
    expect(mockRegister).not.toHaveBeenCalled();
  });
});
