const { where } = require('sequelize');
const { User } = require('../models');
const validator = require('validator');

const getAllUsers = async (_req, res) => {
    const users = await User.findAll();
    res.json(users);
}

const createUser = async (req, res) => {
    if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({error: "Nome, email e senha são obrigatórios"})
    }
    const {name, email, password} = req.body;
    
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Formato do e-mail inválido." })
    }
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "e-mail já cadastrado" })
        }
        const newUser = await User.create({ name, email, password });
        res.status(201).json({ message: `Seja bem vindo ${name}` });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário" })
    }
}

module.exports = {
    getAllUsers,
    createUser
}