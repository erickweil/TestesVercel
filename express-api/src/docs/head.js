// When deploying swagger on vercel on nodejs it does not show UI #8461
// https://github.com/swagger-api/swagger-ui/issues/8461#issuecomment-2002404091

// https://stackoverflow.com/questions/72133185/deploy-an-express-server-that-uses-express-static-to-serve-a-build-folder-to-ver

// https://github.com/vercel/ncc/issues/406

// https://github.com/scottie1984/swagger-ui-express/issues/114#issuecomment-2160925816

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
		apis: ["./src/routes/*.js"]
	};
};

export default getSwaggerOptions;