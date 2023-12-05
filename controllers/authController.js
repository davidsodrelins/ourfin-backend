// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwtConfig = require('../config/jwtConfig');
const { INACTIVE } = require('../utils/constants');

exports.authenticate = async (req, res) => {
    const { login, email, password } = req.body;

    try {
        const user = await userModel.findUserByLoginOrEmail(login, email);

        if (!user || user.status === INACTIVE) {
            // Usando JSON para enviar a mensagem de erro
            return res.status(401).json({
                message: "Authentication failed",
                code: 401
            });
        }

        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
            const { password, cpf, ...userResponse } = user;

            // Sucesso na autenticação
            return res.json({ message: 'Authentication successful!', token, user: userResponse });
        } 

        // Falha na autenticação
        return res.status(401).json({
            message: "Authentication failed",
            code: 401
        });
    } catch (error) {
        console.error(error);
        // Erro no servidor
        return res.status(500).json({
            message: "Internal Server Error",
            code: 500
        });
    }
};
