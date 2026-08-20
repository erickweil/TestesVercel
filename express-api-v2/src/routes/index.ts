import { Router, type Express, type ErrorRequestHandler } from "express";
import { getTesteRouter } from "./teste.ts";
import { getDocsRouter } from "./docsRoutes.ts";

const routes = (app: Express) => {
    // Log all requests
    app.use((req,res,next) => {
        let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
        console.log(new Date().toISOString()+" "+ip+" "+req.protocol + "://" + req.get("host") + " " + req.method + " " + req.originalUrl);

        next();
    });

    app.use(
        getDocsRouter(),
        getTesteRouter()
    );

    // Se não é nenhuma rota válida, produz 404
    app.use((req, res, next) => {
        res.sendStatus(404);
    });

    // Por último o middleware de tratamento de erros
	app.use(((error, req, res, next) => {
        console.error(error);
		// if(error instanceof JogoError) {
		// 	res.status(400).json({ ok: true, message: error.message });
		// }

		if(!res.headersSent) {
			res.status(500).json({ error: "Erro interno do servidor", message: error.message });
		}
    }) as ErrorRequestHandler);
}

export default routes;