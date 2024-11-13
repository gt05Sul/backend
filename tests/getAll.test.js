const { User }  = require('../models');
const { getAllUsers } = require('../controllers/userController');

jest.mock('../models');

const mockUser = [{id: 1, name: 'Carlos', email: 'carlos@email.com', active: true}];

describe('getAll Users', () => {
    it('Deve retornar todos os usuários ativos', async () => {
        User.findAll.mockResolvedValue(mockUser);
    
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        await getAllUsers(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('Deve retornar erro 500 em caso de falha', async () => {
        User.findAll.mockRejectedValue(new Error('Erro interno'));

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Falha ao buscar usuários.' })
    })
})