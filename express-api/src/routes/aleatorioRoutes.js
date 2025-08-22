import express from "express";
import TesteController from "../controller/TesteController.js";

const router = express.Router();

router.get("/teste/aleatorio", TesteController.gerarNumero );

router.get("/teste/mensagem", TesteController.mensagem );

router.get("/teste/dormir", TesteController.dormir );

router.get("/teste/info", TesteController.info );

export default router;