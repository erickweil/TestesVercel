import type { RequestHandler } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.ts";

export type AuthSession = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;

declare module "express-serve-static-core" {
    interface Request {
        auth?: AuthSession;
    }
}

/** Resolve a sessão (via cookie ou header Bearer) e anexa em `req.auth` quando existir. */
export const withSession: RequestHandler = async (req, res, next) => {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (session) {
        req.auth = session;
    }
    next();
};

/** Bloqueia a requisição quando não há sessão válida. Use depois de `withSession`. */
export const requireAuth: RequestHandler = (req, res, next) => {
    if (!req.auth) {
        res.status(401).json({ error: "Não autenticado" });
        return;
    }
    next();
};
