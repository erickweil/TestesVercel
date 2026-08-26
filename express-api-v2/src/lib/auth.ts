import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer, oauthPopup, openAPI } from "better-auth/plugins";
import { db } from "../db/drizzle.ts";

// O frontend fica em outro domínio (erick-frontend-v2.vercel.app), então precisa
// ser declarado como origem confiável para o fluxo OAuth em popup e os callbackURL.
const trustedOrigins = process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? [];

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    trustedOrigins,
    emailAndPassword: { 
      enabled: true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    },
    plugins: [
        // Autenticação por header `Authorization: Bearer <token>`, já que front e API
        // estão em domínios diferentes e cookies de sessão não são compartilháveis.
        bearer({
            requireSignature: true,
        }),
        // Faz o login social acontecer em um popup ancorado no domínio da API e
        // devolve o token de sessão ao frontend via postMessage (sem depender de cookie).
        oauthPopup(),
        openAPI(), 
    ]
});
