import swaggerJSDoc from "swagger-jsdoc";

import express from "express";
import { apiReference } from "@scalar/express-api-reference";
import { getSwaggerDefinition } from "../docs/head.ts";
import { auth } from "../lib/auth.ts";


export const getDocsRouter = () => {
    const router = express.Router();

    router.get("/",(req, res) => {
        res.status(200).redirect("/docs/"); // redirecionando para documentação
	});

    let swaggerDocs: object | null = null;
    router.get("/docs/openapi.json", (req, res) => {
        if (!swaggerDocs) {
            swaggerDocs = swaggerJSDoc({
                swaggerDefinition: {
                    ...getSwaggerDefinition()
                },
                apis: []
            });
        }
        res.json(swaggerDocs);
    });

    let swaggerDocsBetterAuth: object | null = null;
    router.get("/docs/better-auth.json", async (req, res) => {
        swaggerDocsBetterAuth = await auth.api.generateOpenAPISchema();
        res.json(swaggerDocsBetterAuth);
    });
    
    router.use(
        "/docs",
        apiReference({
            // Put your OpenAPI url here:
            //url: "/docs/openapi.json",
            sources: [
                {
                    title: "API Testes Vercel",
                    url: "/docs/openapi.json"
                },
                // Better auth
                {
                    title: "Better Auth",
                    url: "/docs/better-auth.json"
                }
            ]
        }),
    );

    return router;
};