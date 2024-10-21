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