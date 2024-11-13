const { Product } = require('../models');

// Método para buscar todos os produtos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return res.status(500).json({ error: 'Falha ao buscar produtos.' });
    }
};

// Método para criar um produto
const createProduct = async (req, res) => {
    const { name, price, categoryId } = req.body;

    if (!name || !price || !categoryId) {
        return res.status(400).json({ error: "Nome e preço são obrigatórios." });
    }

    try {
        const newProduct = await Product.create({ name, price, categoryId });
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        return res.status(500).json({ error: 'Falha ao criar produto.' });
    }
};

// Método para atualizar um produto
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        const updatedProduct = await product.update({ name, price });
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        return res.status(500).json({ error: 'Erro ao atualizar produto.' });
    }
};

// Método para excluir um produto
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        await product.destroy();
        return res.status(200).json({ message: 'Produto excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        return res.status(500).json({ error: 'Falha ao excluir produto.' });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};