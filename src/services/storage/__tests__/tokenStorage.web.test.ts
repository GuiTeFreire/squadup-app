import { Platform } from "react-native";

import { getAuthToken } from "../../api/client";
import { clearTokens, getAccessToken, saveTokens } from "../tokenStorage";

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe("tokenStorage (web — fallback para sessionStorage)", () => {
  const originalOS = Platform.OS;

  beforeEach(() => {
    Platform.OS = "web";

    const store = new Map<string, string>();
    globalThis.sessionStorage = {
      getItem: jest.fn((key: string) => store.get(key) ?? null),
      setItem: jest.fn((key: string, value: string) => {
        store.set(key, value);
      }),
      removeItem: jest.fn((key: string) => {
        store.delete(key);
      }),
      clear: jest.fn(() => store.clear()),
      key: jest.fn(() => null),
      length: 0,
    } as unknown as Storage;
  });

  afterEach(() => {
    Platform.OS = originalOS;
  });

  it("saveTokens grava no sessionStorage em vez do SecureStore", async () => {
    await saveTokens({ accessToken: "access-1", refreshToken: "refresh-1" });

    expect(sessionStorage.setItem).toHaveBeenCalledWith("squadup.accessToken", "access-1");
    expect(sessionStorage.setItem).toHaveBeenCalledWith("squadup.refreshToken", "refresh-1");
    expect(getAuthToken()).toBe("access-1");
    await expect(getAccessToken()).resolves.toBe("access-1");
  });

  it("clearTokens remove do sessionStorage", async () => {
    await saveTokens({ accessToken: "access-1", refreshToken: "refresh-1" });
    await clearTokens();

    expect(sessionStorage.removeItem).toHaveBeenCalledWith("squadup.accessToken");
    expect(sessionStorage.removeItem).toHaveBeenCalledWith("squadup.refreshToken");
    await expect(getAccessToken()).resolves.toBeNull();
  });
});
