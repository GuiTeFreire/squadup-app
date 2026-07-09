import * as SecureStore from "expo-secure-store";

import { getAuthToken } from "../../api/client";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  restoreAuthToken,
  saveTokens,
} from "../tokenStorage";

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe("tokenStorage (nativo — Platform.OS !== 'web')", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("saveTokens grava os dois tokens no SecureStore e atualiza o client HTTP", async () => {
    await saveTokens({ accessToken: "access-1", refreshToken: "refresh-1" });

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith("squadup.accessToken", "access-1");
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith("squadup.refreshToken", "refresh-1");
    expect(getAuthToken()).toBe("access-1");
  });

  it("getAccessToken/getRefreshToken leem do SecureStore pela chave certa", async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce("access-1");
    await expect(getAccessToken()).resolves.toBe("access-1");
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith("squadup.accessToken");

    (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce("refresh-1");
    await expect(getRefreshToken()).resolves.toBe("refresh-1");
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith("squadup.refreshToken");
  });

  it("clearTokens remove os dois tokens do SecureStore e zera o client HTTP", async () => {
    await clearTokens();

    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith("squadup.accessToken");
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith("squadup.refreshToken");
    expect(getAuthToken()).toBeNull();
  });

  it("restoreAuthToken repõe no client HTTP o access token salvo (fluxo de boot)", async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce("access-persisted");

    const token = await restoreAuthToken();

    expect(token).toBe("access-persisted");
    expect(getAuthToken()).toBe("access-persisted");
  });

  it("restoreAuthToken zera o client HTTP quando não há token salvo", async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(null);

    const token = await restoreAuthToken();

    expect(token).toBeNull();
    expect(getAuthToken()).toBeNull();
  });
});
