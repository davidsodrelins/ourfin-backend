// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send('Não autorizado');
    }
};

module.exports = authMiddleware;
