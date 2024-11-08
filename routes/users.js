const userController = require('../controllers/userController');
var express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: API Geração Tech
 *   description: Documentação de referência da API de demonstração para o trabalho final da geração Tech
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Desativa um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário desativado
 */
router.put('/:id', userController.deleteUser);

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
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação JWT
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', userController.loginUser);


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário com seus endereços
 *     tags: [Usuários]
 *     security:
 *       - bearerToken: []  # Esta rota é protegida por token JWT, não use comentário inline aqui
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário com endereços
 *       401:
 *         description: Token inválido ou ausente
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', authenticateToken, userController.getUserWithAddresses);

module.exports = router;
