"use client";

import { createAuthClient } from "better-auth/react";

/**
 * Frontend e API vivem em domínios diferentes (erick-frontend-v2.vercel.app x
 * erick-backend-v2.vercel.app), então nada de cookie de sessão: o token de sessão
 * é guardado no localStorage e enviado como `Authorization: Bearer <token>`.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const TOKEN_STORAGE_KEY = "better-auth.session_token";

export function getSessionToken(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return window.localStorage.getItem(TOKEN_STORAGE_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

function setSessionToken(token: string) {
  try {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch {}
}

function clearSessionToken() {
  try {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {}
}

export const authClient = createAuthClient({
  baseURL: API_URL,
  fetchOptions: {
    // Sem cookies: a autenticação é 100% via header Bearer.
    credentials: "omit",
    auth: {
      type: "Bearer",
      token: () => getSessionToken(),
    },
    onSuccess: (ctx) => {
      // O plugin `bearer` da API devolve o token novo neste header (já exposto via CORS).
      const token = ctx.response.headers.get("set-auth-token");
      if (token) setSessionToken(token);
    },
  },
});

export type Session = typeof authClient.$Infer.Session;

/** Encerra a sessão na API e descarta o token local. */
export async function signOut() {
  try {
    await authClient.signOut();
  } finally {
    clearSessionToken();
  }
}

// --- Login social em popup -------------------------------------------------
// O redirect clássico não serve aqui: ele terminaria com o token em um cookie do
// domínio da API, inacessível para o frontend. O plugin `oauthPopup` roda o fluxo
// OAuth em um popup ancorado no domínio da API e devolve o token via postMessage.

const POPUP_MESSAGE_TYPE = "better-auth:oauth-popup";
const POPUP_TIMEOUT_MS = 5 * 60 * 1000;

type PopupMessage = {
  type: typeof POPUP_MESSAGE_TYPE;
  nonce?: string;
  token?: string;
  error?: { code: string; description?: string };
};

function popupFeatures() {
  const width = 500;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  return `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no`;
}

function waitForToken(popup: Window, authOrigin: string, nonce: string) {
  return new Promise<{ token: string } | { error: string }>((resolve) => {
    let settled = false;
    const settle = (result: { token: string } | { error: string }) => {
      if (settled) return;
      settled = true;
      window.removeEventListener("message", onMessage);
      clearInterval(closedPoll);
      clearTimeout(timeout);
      try {
        if (!popup.closed) popup.close();
      } catch {}
      resolve(result);
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== authOrigin) return;
      const data = event.data as PopupMessage | undefined;
      if (data?.type !== POPUP_MESSAGE_TYPE || data.nonce !== nonce) return;
      if (data.error) {
        settle({ error: data.error.description || data.error.code });
      } else if (data.token) {
        settle({ token: data.token });
      }
    };

    const closedPoll = setInterval(() => {
      if (popup.closed) settle({ error: "Janela de login fechada antes de concluir." });
    }, 500);
    const timeout = setTimeout(() => settle({ error: "Tempo esgotado ao aguardar o login." }), POPUP_TIMEOUT_MS);

    window.addEventListener("message", onMessage);
  });
}

/**
 * Abre o popup do Google e, no sucesso, guarda o token de sessão.
 * Retorna `{ error }` quando o login não se completa.
 */
export async function signInWithGoogle(): Promise<{ error?: string }> {
  const authOrigin = new URL(API_URL, window.location.origin).origin;

  const nonce = crypto.randomUUID();
  const startUrl = new URL(`${API_URL}/api/auth/oauth-popup/start`);
  startUrl.searchParams.set("provider", "google");
  startUrl.searchParams.set("popupOrigin", window.location.origin);
  startUrl.searchParams.set("popupNonce", nonce);
  startUrl.searchParams.set("callbackURL", `${window.location.origin}/`);

  const popup = window.open(startUrl.toString(), "better-auth-oauth", popupFeatures());
  if (!popup) {
    return { error: "O navegador bloqueou a janela de login. Libere popups para este site." };
  }

  const result = await waitForToken(popup, authOrigin, nonce);
  if ("error" in result) return { error: result.error };

  setSessionToken(result.token);
  return {};
}
