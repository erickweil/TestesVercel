
// Use "type: module" in package.json to use ES modules
import express from 'express';
import cors from 'cors';
import { db } from './db/drizzle.ts';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.ts';

const app = express();
app.set("trust proxy", 1);

// https://www.better-auth.com/docs/integrations/express#cors-configuration
const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];
app.use(cors({
    origin: (origin, callback) => {
        // https://www.npmjs.com/package/cors#configuring-cors-w-dynamic-origin
        if(!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS: Não permitido para esta origem: ${origin}`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    maxAge: 3600,
}));

app.all("/api/auth/*splat", toNodeHandler(auth)); // For ExpressJS v5 

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

const startTime = new Date();

// Define your routes
app.get('/', (req, res) => {
    res.status(200).send(`FUNCIONOU`);
});

app.get("/info", (req, res) => {
    res.status(200).json({
        startTime: startTime.toISOString()
    });
});

app.get("/contador", async (req, res) => {
    // Listar todas as tabelas do banco
    let linhas = await db.execute(`SELECT * FROM public.contador LIMIT 1`);

    res.status(200).json(linhas[0]);
});

app.post("/contador", async (req, res) => {
    // Incrementar o contador
    const linhas = await db.execute(`UPDATE public.contador SET count = count + 1 WHERE id = 1 RETURNING *`);

    res.status(200).json(linhas[0]);
});
 

export default app;