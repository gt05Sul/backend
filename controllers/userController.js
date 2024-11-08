const { Address, User } = require('../models');
require('dotenv').config(); 
const validator = require('validator'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const nodemailer = require('nodemailer'); 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // email admin
        pass: process.env.EMAIL_PASS, // senha admin
    },
});

const sendEmail = (to, subject, text, res) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Remetente
        to: to, // Destinatário, agora passado como argumento
        subject, // Assunto
        text, // Corpo do e-mail
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar e-mail:', error);
            return res.status(500).json({ error: 'Falha no envio de e-mail.' }); // Usando o "res" corretamente
        } else {
            console.log('E-mail enviado:', info.response);
            return res.status(200).json({ message: 'Usuário criado e e-mail enviado com sucesso.' }); // Retorna a resposta correta
        }
    });
};

const getAllUsers = async (_req, res) => {
    try {
        const users = await User.findAll({
          where: {
            active: true, 
          },
        });
    
        return res.status(200).json(users);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({ error: 'Falha ao buscar usuários.' });
      }
};

const createUser = async (req, res) => {
    console.log("Corpo da requisição:", req.body); // Log para debug

    // Verifica se o corpo da requisição contém os campos necessários
    if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
    }

    const { name, email, password } = req.body;

    // Valida o formato do e-mail
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Formato de e-mail inválido." });
    }

    try {
        // Verifica se o e-mail já está cadastrado
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "E-mail já cadastrado." }); // Conflito: e-mail já existe
        }

        // Faz hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o novo usuário com a senha hashada
        const newUser = await User.create({ name, email, password: hashedPassword });
        sendEmail(email, 'Bem-vindo à aplicação', `Olá ${name}, sua conta foi criada com sucesso!`, res);
        res.status(201).json(email); // Retorna o novo usuário com status 201
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário." });
    }
};

const loginUser = async (req, res) => {
    console.log("Corpo da requisição de login:", req.body); // Log para debug

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        // Verifica a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Senha inválida." });
        }

        // Gera um token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY , { expiresIn: '1h' });

        res.status(200).json({ token }); // Retorna o token
    } catch (error) {
        res.status(500).json({ error: "Erro ao fazer login." });
    }
};

const getUserWithAddresses = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [{ model: Address, as: 'addresses' }]
        });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
        res.json(user);
    } catch (error) {
        console.log("Erro ao buscar usuário:", error); // Log do erro para debug
        res.status(500).json({ error: "Erro ao buscar usuário com endereços." });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
  
      const updatedUser = await User.update(
        { active: false },
        { where: { id } }
      );
      console.log('Resultado da atualização:', updatedUser);
      
      if (updatedUser[0] === 0) {
        return res.status(400).json({ error: 'Falha ao excluir usuário.' });
      }
  
      return res.status(200).json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      return res.status(500).json({ error: 'Falha ao excluir usuário.' });
    }
  };


module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    getUserWithAddresses,
    deleteUser,
};
