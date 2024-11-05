import express from "express";
import PostagemController from "../controller/PostagemController.js";
const router = express.Router();

router.get("/postagens", PostagemController.listarPostagens );
router.post("/postagens", PostagemController.realizarPostagem );

export default router;

