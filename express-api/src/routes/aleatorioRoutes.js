import express from "express";
import TesteController from "../controller/TesteController.js";

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
 * /teste/aleatorio:
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
router.get("/teste/aleatorio", TesteController.gerarNumero );


/**
 * @swagger
 * components:
 *   schemas:
 *     TesteResposta:
 *       type: object 
 *       required:
 *         - message
 *         - body
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de status da rota
 *         body:
 *           type: object
 *           description: Resposta
 *       example:
 *         count: 2
 *         body:
 *           teste: Teste
 */

/**
 * @swagger
 * tags:
 *   name: Teste
 *   description: Rota que apenas testa o funcionamento das respostas
 */

/**
 * @swagger
 * /teste/mensagem:
 *   get:
 *     summary: Apenas para testar
 *     tags: [Teste]
 *     parameters:
 *     - in: query
 *       name: teste
 *       required: false
 *       schema:
 *         type: string
 *         example: "Teste de mensagem"
 *       description: Envie uma mensagem para testar
 *     responses:
 *       200:
 *         description: Retorna a query que foi enviada no GET request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TesteResposta'
 */
router.get("/teste/mensagem", TesteController.mensagem );

/**
 * @swagger
 * /teste/dormir:
 *   get:
 *     summary: Dorme um número X de milissegundos
 *     tags: [Teste]
 *     parameters:
 *     - in: query
 *       name: ms
 *       required: true
 *       schema:
 *         type: integer
 *         example: 1000
 *       description: Número de milissegundos que a API deve "dormir" antes de responder
 *     responses:
 *       200:
 *         description: Retorna a mensagem de quantos milissegundos dormiu
 */
router.get("/teste/dormir", TesteController.dormir );



/**
 * @swagger
 * /teste/info:
 *   get:
 *     summary: Exibe informações do servidor
 *     tags: [Teste]
 *     responses:
 *       200:
 *         description: Retorna informações do servidor, como conexão com o banco de dados, headers e variáveis de ambiente
 */
router.get("/teste/info", TesteController.info );

export default router;