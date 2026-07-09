import { act, renderHook } from "@testing-library/react-native";
import React from "react";

import { AuthProvider, useAuth } from "../AuthContext";

function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(AuthProvider, null, children);
}

describe("AuthContext", () => {
  it("register guarda nome/email/idade como pendentes sem autenticar ainda", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.register("Ana Souza", "ana@email.com", "senha123", 28);
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.pendingName).toBe("Ana Souza");
  });

  it("completeProfile usa a idade informada no register (não hardcoda 25 — regressão D15)", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.register("Ana Souza", "ana@email.com", "senha123", 28);
    });
    act(() => {
      result.current.completeProfile({
        favoriteSports: ["football"],
        level: "beginner",
        location: "São Paulo, SP",
      });
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.age).toBe(28);
    expect(result.current.user?.name).toBe("Ana Souza");
    expect(result.current.user?.email).toBe("ana@email.com");
  });

  it("logout limpa o usuário e o estado pendente", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.register("Ana Souza", "ana@email.com", "senha123", 28);
      result.current.completeProfile({
        favoriteSports: [],
        level: "beginner",
        location: "São Paulo, SP",
      });
    });
    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.pendingName).toBe("");
  });
});
