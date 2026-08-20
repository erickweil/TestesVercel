import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    casing: "snake_case",
    // Tells drizzle-kit to track your custom schema instead of defaulting only to public
    schemaFilter: ["testes_vercel"],
    migrations: {
        schema: "testes_vercel",             // moves __drizzle_migrations to 'my_app' schema
    },
    dbCredentials: {
        url: process.env.POSTGRES_URL!,
    },
});