import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer, openAPI } from "better-auth/plugins";
import { db } from "../db/drizzle.ts";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    emailAndPassword: { 
      enabled: true
    },
    plugins: [
        bearer({
            requireSignature: true,
        }),
        openAPI(), 
    ]
});