const { Router } = require('express');
const routes = Router();

//modelos 
const { SalaModel } = require('./model/SalaModel');
const { ReservaModel } = require('./model/ReservaModel');

// Fazendo as require

// User
const CreateUserController = require('./controller/UsuarioController/CreateUserController');
const GetUserController = require('./controller/UsuarioController/FindUserController');
const DeleteUserController = require('./controller/UsuarioController/DeleteUserController');
const UpdateUserDadosController = require('./controller/UsuarioController/UpdateUserDadosController');
const UpdateUserFormacaoController = require('./controller/UsuarioController/UpdateUserFormacaoController');
const UpdateUserSenhaController = require('./controller/UsuarioController/UpdateUserSenhaController');
const LoginUserController = require('./controller/UsuarioController/LoginUserController');




const { authMiddleware } = require('./middleware/auth-middleware');
// Criando Rotas
// User
routes.post('/createUser', CreateUserController.CreateUser);
routes.get('/findUser', GetUserController.GetUser);
routes.delete('/delUser', authMiddleware, DeleteUserController.DeleteUser);
routes.put('/upDadosUser/:Cpf', authMiddleware, UpdateUserDadosController.UpdateUserDados);
routes.put('/upFormacaoUser/:Cpf', authMiddleware, UpdateUserFormacaoController.UpdateUserFormacao);
routes.put('/upSenhaUser/:Cpf', authMiddleware,  UpdateUserSenhaController.UpdatePassword);
routes.post('/LoginUser', LoginUserController.LoginUser);



// Sala
//Buscar Sala
routes.get('/sala', async (req, res) => {
    try {
        const salas = await SalaModel.findAll();
        return res.status(200).json(salas);
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

// Obter uma Sala por ID
routes.get('/sala/:IdSala', async (req, res) => {
    try {
        const { IdSala } = req.params;
        const sala = await SalaModel.findByPk(IdSala);
        if (!sala) {
            return res.status(404).json({
                error: 'Sala não foi encontrada!'
            });
        }
        return res.status(200).json(sala);
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

//deletetar Sala
routes.delete('/sala/:IdSala', async (req, res) => {
    try {
        const { IdSala } = req.params;
        const salaExiste = await SalaModel.findByPk(IdSala);
        if (!salaExiste) {
            return res.status(404).json({
                error: 'sala não foi econtrada!'
            });
        }
        await SalaModel.destroy({ where: { IdSala } });
        return res.status(200).json({
            message: 'sala removida com sucesso!'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

// Atualizar Sala
routes.put('/sala/:IdSala', async (req, res) => {
    try {
        const { IdSala } = req.params;
        const { NomeSala, Funcao } = req.body;
        const salaExistente = await SalaModel.findByPk(IdSala);
        if (!salaExistente) {
            return res.status(404).json({
                error: 'Sala não foi encontrada!'
            });
        }
        await salaExistente.update({
            NomeSala,
            Funcao,
        });
        return res.status(200).json(salaExistente);
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

// Criar Sala
routes.post('/sala', async (req, res) => {
    try {
        const { NomeSala, Funcao, TipoSala, NumeroSala, Capacidade, Criador } = req.body;
        const NovaSala = await SalaModel.create({
            NomeSala, 
            Funcao, 
            TipoSala, 
            NumeroSala, 
            Capacidade, 
            Criador 
        });
        return res.status(201).json(NovaSala);
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});


module.exports = { routes };