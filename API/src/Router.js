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
routes.get('/findUser', GetUserController.GetUser);
routes.delete('/delUser', authMiddleware, DeleteUserController.DeleteUser);
routes.put('/upDadosUser/:Cpf', authMiddleware, UpdateUserDadosController.UpdateUserDados);
routes.put('/upFormacaoUser/:Cpf', authMiddleware, UpdateUserFormacaoController.UpdateUserFormacao);
routes.put('/upSenhaUser/:Cpf', authMiddleware,  UpdateUserSenhaController.UpdatePassword);
routes.post('/LoginUser', LoginUserController.LoginUser);

// Reserva
routes.post('/createReserva', authMiddleware, CreateReservaController.CreateReserva);
routes.get('/findReserva/:IdReserva', authMiddleware,  GetReservaController.GetReserva);
routes.delete('/delReserva', authMiddleware, DeleteReservaController.DeleteReserva);
routes.put('/upReserva', authMiddleware, UpdateReservaController.UpdateReserva);

// Sala
routes.post('/createSala', CreateSalaController.CreateSala);
routes.get('/findSala/:Id', GetSalaController.GetSala);
routes.delete('/delSala', authMiddleware, DeleteSalaController.DeleteSala);
routes.put('/upSala', authMiddleware, UpdateSalaController.UpdateSala);


module.exports = { routes };