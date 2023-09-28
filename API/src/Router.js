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

//Sala
const SalaController = require ('./controller/Sala/SalaController');

//reserva
const ReservaController = require('./controller/Reserva/ReservaController');


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
routes.post('/userLogged', LoginUserController.GetLogin);

// Sala
routes.get('/sala', SalaController.FindSala);
routes.get('/sala/:IdSala', SalaController.GetSala);
routes.delete('/sala/:IdSala', SalaController.DeleteSala);
routes.put('/sala/:IdSala', SalaController.PutSala);
routes.post('/sala', SalaController.CreateSala);
routes.get('/sala/:NomeSala', SalaController.GetNomeSala);

// Reserva
routes.post('/reserva', ReservaController.CreateReserva);
routes.get('/reserva', ReservaController.FindReserva);
routes.get('/reserva/:IdReserva', ReservaController.GetReserva);
routes.put('/reserva/:IdReserva', ReservaController.PutReserva);
routes.delete('/reserva/:IdReserva', ReservaController.DeleteReserva);

module.exports = { routes };