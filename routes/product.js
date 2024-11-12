const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Produto X"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 19.99
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
router.post('/', ProductController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna a lista de todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Produto X"
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 19.99
 *                   categoryId:
 *                     type: integer
 *                     example: 1
 */
router.get('/', ProductController.getAllProducts);

module.exports = router;
