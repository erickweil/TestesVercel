import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerUIDist from "swagger-ui-dist";
import swaggerJsDoc from "swagger-jsdoc";
import getSwaggerOptions from "../docs/head.js";

// NA Vercel o Swagger não funciona direito...
// Veja:
// https://github.com/vercel/vercel/issues/10412
// https://github.com/swagger-api/swagger-ui/issues/8461

const router = express.Router();

/*
Com versões antigas:
• express: ^4.18.2
• swagger-ui-express: ^4.6.3”
router.use(swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(getSwaggerOptions()), {
		customCssUrl: [ "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css" ]
}));
*/

// Versões novas:

const swaggerUiOptions = {
    customCss: ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
	customCssUrl: [ "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css" ]
};

const swaggerUiDistPath = swaggerUIDist.getAbsoluteFSPath();

// Só carrega o Swagger quando for necessário, para não carregar desnecessariamente 
let swaggerDocs;
let swaggerUISetup;
const loadSwaggerDocs = (req, res, next) => {
	if(!swaggerDocs) {
		console.log("Carregando Swagger Docs...");
		swaggerDocs = swaggerJsDoc(getSwaggerOptions());
		swaggerUISetup = swaggerUI.setup(swaggerDocs, swaggerUiOptions);
	}
	next();
};

router.get("/",(req, res) => {
	res.status(200).redirect("docs.html"); // redirecionando para documentação
});

// Para poder acessar o JSON do Swagger diretamente
router.get("/swagger.json", loadSwaggerDocs, (req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.send(swaggerDocs);
});

router.use(express.static(swaggerUiDistPath));
router.use(loadSwaggerDocs, swaggerUI.serve, (req, res, next) => { swaggerUISetup(req, res, next); });

export default router;