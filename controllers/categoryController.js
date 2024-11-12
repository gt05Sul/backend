const { Category } = require('../models');

// Método para buscar todas as categorias
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        return res.status(500).json({ error: 'Falha ao buscar categorias.' });
    }
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Categoria não encontrada.' });
        }

        return res.status(200).json(category);
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        return res.status(500).json({ error: 'Falha ao buscar categoria.' });
    }
}

// Método para criar uma categoria
const createCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Nome da categoria é obrigatório." });
    }

    try {
        const newCategory = await Category.create({ name });
        return res.status(201).json(newCategory);
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        return res.status(500).json({ error: 'Falha ao criar categoria.' });
    }
};

// Método para atualizar uma categoria
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Categoria não encontrada.' });
        }

        const updatedCategory = await category.update({ name });
        return res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        return res.status(500).json({ error: 'Erro ao atualizar categoria.' });
    }
};

// Método para excluir uma categoria
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Categoria não encontrada.' });
        }

        await category.destroy();
        return res.status(200).json({ message: 'Categoria excluída com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        return res.status(500).json({ error: 'Falha ao excluir categoria.' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};