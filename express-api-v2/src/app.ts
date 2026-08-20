// Use "type: module" in package.json to use ES modules
import express from 'express';
import cors from 'cors';
import compression from "compression";
import { db } from '../db.ts';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.ts';
import routes from './routes/index.ts';

const app = express();
app.set("trust proxy", 1);
app.use(compression());

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

app.all('/api/auth/{*any}', toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app);

export default app;