import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import getSwaggerOptions from "../docs/head.js";

import usuarios from "./testeRoutes.js";
import aleatorio from "./aleatorioRoutes.js";
import postagem from "./postagemRoutes.js";

export const logRoutes = (req,res,next) => {
	const timestamp = new Date().toISOString();

	let ip = req.headers["x-forwarded-for"] ||
	req.socket.remoteAddress ||
	null;

	console.log(timestamp+" "+ip+" "+req.protocol + "://" + req.get("host") + req.originalUrl);
	// Log Headers
	//console.log(JSON.stringify(req.headers));
	next();
};

const routes = (app) => {

	// só fazer log das rotas se estiver em desenvolvimento, desativar em produção
	if(process.env.DEBUGLOG === "true") {
		app.use(logRoutes);
	}

	app.get("/",(req, res) => {
		res.status(200).redirect("docs"); // redirecionando para documentação
	});

	app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(getSwaggerOptions()), {
		customCssUrl: [ "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css" ]
	}));

	app.use(
		aleatorio,
		usuarios,
		postagem
	);

	app.use((req,res,next) => {
		res.sendStatus(404);
	});
};

export default routes;
