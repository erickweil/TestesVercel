import express from "express";
import PostagemController from "../controller/PostagemController.js";
import { middlewareConectarBanco } from "../middlewares/conectarBanco.js";
const router = express.Router();

router.get("/postagens", middlewareConectarBanco, PostagemController.listarPostagens );
router.post("/postagens", middlewareConectarBanco, PostagemController.realizarPostagem );

export default router;

