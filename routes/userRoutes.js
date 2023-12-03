// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.get('/', authMiddleware, userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/name/:name', authMiddleware, userController.findUsersByName);
router.get('/cpf/:cpf', authMiddleware, userController.findUserByCPF);
router.get('/email', authMiddleware, userController.findUsersByEmail);
router.get('/:id', authMiddleware, userController.findUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.put('/status/:id', adminMiddleware, userController.changeUserStatus);

module.exports = router;
