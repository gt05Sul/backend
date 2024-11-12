const express = require('express');
const CartController = require('../controllers/cartController');
const router = express.Router();

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Cria um carrinho
 *     tags: [Carrinhos]
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
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Carrinho criado com sucesso
 */
router.post('/', CartController.createCart);

/**
 * @swagger
 * /cart/item:
 *   post:
 *     summary: Adiciona item ao carrinho
 *     tags: [Carrinhos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: integer
 *                 example: 1
 *               productId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item adicionado ao carrinho com sucesso
 */
router.post('/item', CartController.addItemToCart);

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     summary: Retorna os itens de um carrinho
 *     tags: [Carrinhos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do carrinho
 *     responses:
 *       200:
 *         description: Itens do carrinho
 *       404:
 *         description: Carrinho não encontrado
 */
router.get('/:id', CartController.getCartItems);

module.exports = router;