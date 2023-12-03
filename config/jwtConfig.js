require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET || 'default_secret_key',
    expiresIn: '23h'
};
