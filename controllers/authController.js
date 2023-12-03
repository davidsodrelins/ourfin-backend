// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwtConfig = require('../config/jwtConfig');
const { ACTIVE, INACTIVE } = require('../utils/constants');

/**
 * Authenticate a user based on username/email and password.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
exports.authenticate = async (req, res) => {
    const { login, email, password } = req.body;

    try {
        const user = await userModel.findUserByLoginOrEmail(login, email);

        
        if (!user) {
            res.status(201).send('User Invalid');
        }

        if (user.status === INACTIVE) {
            res.status(401).send('User Inactived');
        }


        if (user && user?.status === ACTIVE && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
            const { password, cpf, ...userResponse } = user;

            res.json({ message: 'Authentication successful!', token, user: userResponse });
        } else {
            res.status(401).send('Authentication failed');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
