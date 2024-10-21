import { readFile } from "fs/promises";
// When deploying swagger on vercel on nodejs it does not show UI #8461
// https://github.com/swagger-api/swagger-ui/issues/8461#issuecomment-2002404091
const css = await readFile("./node_modules/swagger-ui-dist/swagger-ui.css", "utf8");

const getSwaggerOptions = () => {
	return {
		swaggerDefinition: {
			openapi: "3.0.0",
			info: {
				title: "NodeJS Simples API",
				version: "1.0",
				description: "API Simples, veja a página https://gitlab.fslab.dev/fslab/modelo-ci-cd/-/tree/master/nodejs-simples para o código fonte",
				contact: {
					name: "Erick Leonardo Weil",
					email: "erick.weil@ifro.edu.br",
				},
			},
			servers: [
				{
					url: process.env.SWAGGER_URL || "Necessário configurar URL",
				},
				{
					url: "http://127.0.0.1:"+(process.env.PORT || 3000),
				}
			]
		},
		paths: {},
		apis: ["./src/routes/*.js"],
		customCss: css
	};
};

export default getSwaggerOptions;