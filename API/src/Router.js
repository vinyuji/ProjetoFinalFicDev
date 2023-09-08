const { Router } = require('express');
const routes = Router();

// Fazendo as require

// User
const CreateUserController = require('./controller/UsuarioController/CreateUserController');
const GetUserController = require('./controller/UsuarioController/FindUserController');
const DeleteUserController = require('./controller/UsuarioController/DeleteUserController');
const UpdateUserController = require('./controller/UsuarioController/UpdateUserController');

// Reserva
const CreateReservaController = require('./controller/ReservaController/CreateReservaController');
const GetReservaController = require('./controller/ReservaController/FindReservaController');
const DeleteReservaController = require('./controller/ReservaController/DeleteReservaController');
const UpdateReservaController = require('./controller/ReservaController/UpdateReservaController');

// Vendas
const CreateSalaController = require('./controller/SalaController/CreateSalaController');
const GetSalaController = require('./controller/SalaController/FindSalaController');
const DeleteSalaController = require('./controller/SalaController/DeleteSalaController');
const UpdateSalaController = require('./controller/SalaController/UpdateSalaController');


// Criando Rotas

// User
routes.post('/createUser', CreateUserController.CreateUser);
routes.post('/findUser', GetUserController.GetUser);
routes.delete('/delUser', DeleteUserController.DeleteUser);
routes.post('/upUser', UpdateUserController.UpdateUser);

// Reserva
routes.post('/createReserva', CreateReservaController.CreateReserva);
routes.post('/findReserva', GetReservaController.GetReserva);
routes.delete('/delReserva', DeleteReservaController.DeleteReserva);
routes.post('/upReserva', UpdateReservaController.UpdateReserva);

// Sala
routes.post('/createSala', CreateSalaController.CreateSala);
routes.post('/findSala', GetSalaController.GetSala);
routes.delete('/delSala', DeleteSalaController.DeleteSala);
routes.post('/upSala', UpdateSalaController.UpdateSala);


module.exports = { routes };