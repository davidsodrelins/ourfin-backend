// controllers/userController.js
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// Salt rounds for bcrypt
const saltRounds = 10;

// Helper function to remove password from user objects
const removePassword = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

// Get all users with pagination
exports.getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const users = await userModel.getAllUsers(limit, offset);
        const usersWithoutPasswords = users.map(removePassword);

        res.json(usersWithoutPasswords);
    } catch (err) {
        res.status(500).send('Error accessing the database: ' + err.message);
    }
};

// Create user
exports.createUser = async (req, res) => {
    try {
        const { email, login, cpf, name, password } = req.body;

        // Verificações de dados
        if (!email || !login || !password || !cpf || !name) {
            return res.status(400).send('All fields are required');
        }
        if (email.length > 255 || name.length > 255 || login.length > 255) {
            return res.status(400).send('Email, name, and login must not exceed 255 characters');
        }
        if (cpf.length > 14) {
            return res.status(400).send('CPF must not exceed 14 characters');
        }

        // Verificar se usuário já existe
        const existingUser = await userModel.findUserByLoginOrEmail(login, email);
        if (existingUser) {
            return res.status(400).send('User with the given email or login already exists');
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Dados do usuário com senha criptografada
        const userData = { email, login, cpf, name, password: hashedPassword, status: 'Active' };

        const userId = await userModel.createUser(userData);
        res.status(201).json({ message: 'User successfully created', userId });
    } catch (err) {
        res.status(500).send('Error creating user: ' + err.message);
    }
};


// Find users by name (or part of the name) with pagination
exports.findUsersByName = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const users = await userModel.findUsersByName(req.params.name, limit, offset);
        const usersWithoutPasswords = users.map(removePassword);

        res.json(usersWithoutPasswords);
    } catch (err) {
        res.status(500).send('Error searching users by name: ' + err.message);
    }
};

// Find user by CPF
exports.findUserByCPF = async (req, res) => {
    try {
        const user = await userModel.findUserByCPF(req.params.cpf);
        user ? res.json(removePassword(user)) : res.status(404).send('User not found');
    } catch (err) {
        res.status(500).send('Error searching user by CPF: ' + err.message);
    }
};

// Find user by email with pagination
exports.findUsersByEmail = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const users = await userModel.findUsersByEmail(req.params.email, limit, offset);
        const usersWithoutPasswords = users.map(removePassword);

        res.json(usersWithoutPasswords);
    } catch (err) {
        res.status(500).send('Error searching users by email: ' + err.message);
    }
};

// Find user by ID
exports.findUserById = async (req, res) => {
    try {
        const user = await userModel.findUserById(req.params.id);
        user ? res.json(removePassword(user)) : res.status(404).send('User not found');
    } catch (err) {
        res.status(500).send('Error searching user by ID: ' + err.message);
    }
};

// Update user data
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        let userData = req.body;

        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, saltRounds);
        }

        await userModel.updateUser(id, userData);
        res.status(200).send('User successfully updated');
    } catch (err) {
        res.status(500).send('Error updating user: ' + err.message);
    }
};

// Activate/Deactivate user
exports.changeUserStatus = async (req, res) => {
    try {
        const newStatus = req.body.status; // Should be "Active" or "Inactive"
        await userModel.changeUserStatus(req.params.id, newStatus);
        res.status(200).send(`User successfully ${newStatus === 'Active' ? 'activated' : 'deactivated'}`);
    } catch (err) {
        res.status(500).send('Error changing user status');
    }
};