// userModel.js
const db = require('../config/db');

exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

exports.findUserByLoginOrEmail = (login, email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE login = ? OR email = ? LIMIT 1';
        db.query(query, [login, email], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
};

// Cadastrar usuário
exports.createUser = (userData) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users SET ?';
        db.query(query, userData, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.insertId);
            }
        });
    });
};

// Listar usuários por nome (ou parte do nome)
exports.findUsersByName = (name, limit, offset) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE name LIKE ? LIMIT ? OFFSET ?';
        db.query(query, [`%${name}%`, limit, offset], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Buscar usuário por CPF
exports.findUserByCPF = (cpf) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE cpf = ?';
        db.query(query, [cpf], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
};

// Listar usuários por email (ou parte do email)
exports.findUsersByEmail = (email, limit, offset) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email LIKE ? LIMIT ? OFFSET ?';
        db.query(query, [`%${email}%`, limit, offset], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


exports.findUsersByLogin = (login, limit, offset) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE login = ? LIMIT ? OFFSET ?';
        db.query(query, [login, limit, offset], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Buscar usuário por ID
exports.findUserById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
};

// Editar dados do usuário
exports.updateUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET ? WHERE id = ?';
        db.query(query, [userData, id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Ativar/Desativar usuário
exports.changeUserStatus = (id, status) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET status = ? WHERE id = ?';
        db.query(query, [status, id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
