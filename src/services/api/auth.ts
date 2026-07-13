import type { Sport } from "../../types";
import type { TokenPair } from "../storage/tokenStorage";
import { apiClient } from "./client";

interface ApiTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  age: number;
  location: string;
  bio?: string;
  favorite_sports: Sport[];
}

function toTokenPair(body: ApiTokenResponse): TokenPair {
  return { accessToken: body.access_token, refreshToken: body.refresh_token };
}

export async function registerRequest(payload: RegisterPayload): Promise<void> {
  await apiClient.post("/auth/register", payload);
}

export async function loginRequest(email: string, password: string): Promise<TokenPair> {
  const body = await apiClient.post<ApiTokenResponse>("/auth/login", { email, password });
  return toTokenPair(body);
}

export async function refreshRequest(refreshToken: string): Promise<TokenPair> {
  const body = await apiClient.post<ApiTokenResponse>("/auth/refresh", {
    refresh_token: refreshToken,
  });
  return toTokenPair(body);
}

export async function logoutRequest(refreshToken: string): Promise<void> {
  await apiClient.post("/auth/logout", { refresh_token: refreshToken });
}
