// tests/user.test.js
const supertest = require('supertest');
const app = require('../src/index');
const request = supertest(app);

describe('User API Endpoints', () => {
    it('GET /api/users - should list all users', async () => {
        const response = await request.get('/api/users');
        expect(response.status).toBe(200);
    });

    it('POST /api/users - should create a new user', async () => {
        const newUser = {
            // Dados do novo usuário
        };
        const response = await request.post('/api/users').send(newUser);
        expect(response.status).toBe(201);
    });

    // Testes para buscar usuários por nome
    it('GET /api/users/name/:name - should find users by name', async () => {
        const response = await request.get('/api/users/name/John');
        expect(response.status).toBe(200);
    });

    // Testes para buscar usuário por CPF
    it('GET /api/users/cpf/:cpf - should find a user by CPF', async () => {
        const response = await request.get('/api/users/cpf/12345678901');
        expect(response.status).toBe(200);
    });

    // Testes para buscar usuários por e-mail
    it('GET /api/users/email/:email - should find users by email', async () => {
        const response = await request.get('/api/users/email/test@example.com');
        expect(response.status).toBe(200);
    });

    // Testes para buscar usuário por ID
    it('GET /api/users/:id - should find a user by ID', async () => {
        const response = await request.get('/api/users/1');
        expect(response.status).toBe(200);
    });

    // Testes para atualizar dados do usuário
    it('PUT /api/users/:id - should update user data', async () => {
        const updatedData = {
            // Dados atualizados do usuário
        };
        const response = await request.put('/api/users/1').send(updatedData);
        expect(response.status).toBe(200);
    });

    // Testes para ativar/desativar usuário
    it('PUT /api/users/status/:id - should change user status', async () => {
        const response = await request.put('/api/users/status/1').send({ status: 'Inactive' });
        expect(response.status).toBe(200);
    });
});
