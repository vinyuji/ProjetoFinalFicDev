const { Router } = require('express');
const routes = Router();

// Fazendo as require

// User
const CreateUserController = require('./controller/UsuarioController/CreateUserController');
const GetUserController = require('./controller/UsuarioController/FindUserController');
const DeleteUserController = require('./controller/UsuarioController/DeleteUserController');
const UpdateUserDadosController = require('./controller/UsuarioController/UpdateUserDadosController');
const UpdateUserFormacaoController = require('./controller/UsuarioController/UpdateUserFormacaoController');
const UpdateUserSenhaController = require('./controller/UsuarioController/UpdateUserSenhaController');
const LoginUserController = require('./controller/UsuarioController/LoginUserController');

// Reserva
const CreateReservaController = require('./controller/ReservaController/CreateReservaController');
const GetReservaController = require('./controller/ReservaController/FindReservaController');
const DeleteReservaController = require('./controller/ReservaController/DeleteReservaController');
const UpdateReservaController = require('./controller/ReservaController/UpdateReservaController');

// Sala
const CreateSalaController = require('./controller/SalaController/CreateSalaController');
const GetSalaController = require('./controller/SalaController/FindSalaController');
const DeleteSalaController = require('./controller/SalaController/DeleteSalaController');
const UpdateSalaController = require('./controller/SalaController/UpdateSalaController');

const { authMiddleware } = require('./middleware/auth-middleware');
// Criando Rotas

// User
routes.post('/createUser', CreateUserController.CreateUser);
routes.post('/findUser', authMiddleware, GetUserController.GetUser);
routes.delete('/delUser', authMiddleware, DeleteUserController.DeleteUser);
routes.post('/upDadosUser', authMiddleware, UpdateUserDadosController.UpdateUserDados);
routes.post('/upFormacaoUser', authMiddleware, UpdateUserFormacaoController.UpdateUserFormacao);
routes.post('/upSenhaUser', authMiddleware,  UpdateUserSenhaController.UpdatePassword);
routes.post('/LoginUser', LoginUserController.LoginUser);

// Reserva
routes.post('/createReserva', authMiddleware, CreateReservaController.CreateReserva);
routes.post('/findReserva', authMiddleware,  GetReservaController.GetReserva);
routes.delete('/delReserva', authMiddleware, DeleteReservaController.DeleteReserva);
routes.post('/upReserva', authMiddleware, UpdateReservaController.UpdateReserva);

// Sala
routes.post('/createSala', authMiddleware, CreateSalaController.CreateSala);
routes.post('/findSala', authMiddleware, GetSalaController.GetSala);
routes.delete('/delSala', authMiddleware, DeleteSalaController.DeleteSala);
routes.post('/upSala', authMiddleware, UpdateSalaController.UpdateSala);


module.exports = { routes };