import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

import { setAuthToken } from "../api/client";

const ACCESS_TOKEN_KEY = "squadup.accessToken";
const REFRESH_TOKEN_KEY = "squadup.refreshToken";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * `expo-secure-store` é um no-op em `react-native-web` (keychain/keystore não existem no
 * browser). Fallback para `sessionStorage` no web — limpa ao fechar a aba, suficiente para a
 * demo acadêmica; no nativo (Expo Go/EAS) o token vai para o keychain/keystore de verdade.
 * Checado a cada chamada (não cacheado num const de módulo) para ficar testável sem reset de módulo.
 */
function isWeb(): boolean {
  return Platform.OS === "web";
}

async function getItem(key: string): Promise<string | null> {
  if (isWeb()) return sessionStorage.getItem(key);
  return SecureStore.getItemAsync(key);
}

async function setItem(key: string, value: string): Promise<void> {
  if (isWeb()) {
    sessionStorage.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function removeItem(key: string): Promise<void> {
  if (isWeb()) {
    sessionStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

export async function saveTokens({ accessToken, refreshToken }: TokenPair): Promise<void> {
  await Promise.all([
    setItem(ACCESS_TOKEN_KEY, accessToken),
    setItem(REFRESH_TOKEN_KEY, refreshToken),
  ]);
  setAuthToken(accessToken);
}

export async function getAccessToken(): Promise<string | null> {
  return getItem(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  return getItem(REFRESH_TOKEN_KEY);
}

export async function clearTokens(): Promise<void> {
  await Promise.all([removeItem(ACCESS_TOKEN_KEY), removeItem(REFRESH_TOKEN_KEY)]);
  setAuthToken(null);
}

/** Restaura no cliente HTTP o access token salvo. Chamar no boot, antes de `GET /auth/me` (Fase 13.4). */
export async function restoreAuthToken(): Promise<string | null> {
  const token = await getAccessToken();
  setAuthToken(token);
  return token;
}
