// tests/user.test.js
const supertest = require('supertest');
const app = require('../src/index');

const request = supertest(app);

describe('User API Endpoints', () => {
    // Teste para listar todos os usuários
    it('GET /api/users - Lista todos os usuários', async () => {
        const response = await request.get('/api/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    // Teste para criar um usuário
    it('POST /api/users - Cria um novo usuário', async () => {
        const newUser = {
            name: 'Test User',
            email: 'test@example.com',
            cpf: '123.456.789-01',
            login: 'testuser',
            password: 'password'
        };
        const response = await request.post('/api/users').send(newUser);
        expect(response.status).toBe(201);
    });



});