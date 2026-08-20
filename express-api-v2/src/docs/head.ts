import { testeDocs } from "./testeDocs.ts";

// para ficar o url certo do swagger sem precisar mudar
const getServersInCorrectOrder = () => {
    const devUrl = { url: process.env.SWAGGER_DEV_URL || "http://localhost:" + process.env.PORT };
    const prodUrl = { url: process.env.SWAGGER_PROD_URL || devUrl.url };

    if (process.env.NODE_ENV === "production") return [prodUrl, devUrl];
    else return [devUrl, prodUrl];
};

export const getSwaggerDefinition = () => {
    return {
        openapi: "3.1.0",
        info: {
            title: "API Testes Vercel",
            version: "1.0.0",
            description: "API para testes de integração com Vercel, Express, Drizzle ORM e Better Auth",
            contact: {
                name: "Erick",
                email: "erick.weil@ifro.edu.br"
            },
        },
        security: [
            {bearerAuth: []}
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
        },
        servers: getServersInCorrectOrder(),
        tags: [
            { name: "Teste", description: "Rotas de teste para verificar a integração com Vercel, Express, Drizzle ORM e Better Auth" }
        ],

        paths: {
            ...testeDocs
        }
    };
};