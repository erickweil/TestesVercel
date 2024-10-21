import express from "express";
import AleatorioController from "../controller/AleatorioController.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     TesteAleatorio:
 *       type: object 
 *       required:
 *         - message
 *         - body
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de status da rota
 *         numero:
 *           type: object
 *           description: Número gerado
 *       example:
 *         message: Número aleatório gerado.
 *         numero: 12
 */

/**
 * @swagger
 * /aleatorio:
 *   get:
 *     summary: Exibe um número aleatório
 *     tags: [Teste]
 *     responses:
 *       200:
 *         description: Gera um número entre 0 e 100
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TesteAleatorio'
 */
router.get("/aleatorio", AleatorioController.gerarNumero );

export default router;