const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

/**
 * @swagger
 * /address:
 *   post:
 *     summary: Cria um novo endereço para um usuário
 *     tags: [Endereços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               street:
 *                 type: string
 *                 example: "Rua dos developers"
 *               city:
 *                 type: string
 *                 example: "Fortaleza"
 *               state:
 *                 type: string
 *                 example: "CE"
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso
 */
router.post('/', addressController.createAddress);

module.exports = router;