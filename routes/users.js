const userController = require("../controllers/userController");
var express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
var router = express.Router();

/**
 * @swagger
 * tags:
 *  name: API da Geração Tech
 *  description: Documentação de refência da API dos bunito da GT SUL
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *    get:
 *      summary: Retorna um usuário com endereços cadastrados
 *      tags: [Usuários]
 *      security:
 *         - bearerToken: [] # Esta rota é protegida por JWT
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID do usuário
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *            description: Dados do usuário com endereços
 *          401:
 *            description: Token inválido ou ausente
 *          404:
 *            description: Usuário não encontrado
 */
router.get("/:id", authenticateToken, userController.getUserWithAddress);

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);

module.exports = router;
