import "dotenv/config";

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from "./schema.ts";
//import { users } from './drizzle/schema'

const connectionString = process.env.POSTGRES_URL;

if(!connectionString) {
    throw new Error("POSTGRES_URL environment variable is not set");
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client, { 
    schema: schema,
    logger: true,
});
export type DatabaseType = typeof db;

export async function desconectarBanco() {
    await client.end({ timeout: 5 });
}
