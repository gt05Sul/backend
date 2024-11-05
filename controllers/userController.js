const { User, Address } = require('../models');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    // auth: {
    //     user: ,
    //     pass:
    // }
})

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

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: `Seja bem vindo ${name}` });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário" })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios!" })
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Senha inválida" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' })

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Erro ao fazer login" });
    }
}

const getUserWithAddress = async (req, res) => {
    try {
        const user = await User.findByPk( req.params.id, {
            include: [{ model: Address, as: 'addresses' }]
        });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" })
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuário com endereços" })
    }
}

module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    getUserWithAddress
}