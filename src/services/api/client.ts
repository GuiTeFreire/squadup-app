/**
 * Cliente HTTP central para a API do SquadUp.
 * Backend responde erros como `{ detail: { code, message } }` (ver .status/backend-contract.md §3).
 */

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000";

export interface ApiErrorPayload {
  code: string;
  message: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, payload: ApiErrorPayload) {
    super(payload.message);
    this.name = "ApiError";
    this.status = status;
    this.code = payload.code;
  }
}

let authToken: string | null = null;

/** Chamado pelo AuthContext/storage seguro após login, refresh ou logout (Fase 13.4). */
export function setAuthToken(token: string | null): void {
  authToken = token;
}

export function getAuthToken(): string | null {
  return authToken;
}

/**
 * Chamado em um 401 para tentar renovar a sessão. Deve devolver o novo access token (já
 * aplicado via `setAuthToken`) em caso de sucesso, ou `null` se o refresh falhou (sessão
 * encerrada). Registrado pelo `AuthContext` no boot — o cliente HTTP não conhece storage
 * de token nem estado de autenticação, só delega a decisão de "tentar renovar" para quem
 * registrou o handler, evitando um import circular com `services/storage/tokenStorage.ts`.
 */
type UnauthorizedHandler = () => Promise<string | null>;
let onUnauthorized: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null): void {
  onUnauthorized = handler;
}

const AUTH_PATHS_WITHOUT_RETRY = new Set([
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/auth/logout",
]);

export type ApiRequestOptions = Omit<RequestInit, "body" | "method"> & {
  body?: unknown;
};

async function parseErrorPayload(response: Response): Promise<ApiErrorPayload> {
  const json = await response.json().catch(() => null);
  if (json?.detail?.code && json?.detail?.message) {
    return json.detail as ApiErrorPayload;
  }
  return { code: "UNKNOWN_ERROR", message: "Erro inesperado ao comunicar com o servidor." };
}

async function request<T>(
  method: string,
  path: string,
  options: ApiRequestOptions = {},
  isRetry = false
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  const hasBody = options.body !== undefined;
  if (hasBody) headers.set("Content-Type", "application/json");
  if (authToken) headers.set("Authorization", `Bearer ${authToken}`);

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    method,
    headers,
    body: hasBody ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const canRetry = response.status === 401 && !isRetry && onUnauthorized;
    if (canRetry && !AUTH_PATHS_WITHOUT_RETRY.has(path)) {
      const newToken = await onUnauthorized!();
      if (newToken) {
        return request<T>(method, path, options, true);
      }
    }
    throw new ApiError(response.status, await parseErrorPayload(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, options?: ApiRequestOptions) => request<T>("GET", path, options),
  post: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>("POST", path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>("PATCH", path, { ...options, body }),
  delete: <T>(path: string, options?: ApiRequestOptions) => request<T>("DELETE", path, options),
};
