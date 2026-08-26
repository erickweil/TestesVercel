import { getSessionToken } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** `fetch` da API com o token Bearer anexado e erros normalizados. */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getSessionToken();

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    // Sem cookies entre domínios: quem autentica é o header Bearer.
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = (body as { error?: string } | null)?.error ?? `Erro ${response.status} ao chamar ${path}`;
    throw new ApiError(message, response.status);
  }

  return (await response.json()) as T;
}
