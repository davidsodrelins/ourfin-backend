// middlewares/adminMiddleware.js
const isAdmin = (req, res, next) => {

    if (req.user && req.user.profile === 'Administrator') {
        next();
    } else {
        res.status(403).send('Acesso negado');
    }
};

module.exports = isAdmin;
