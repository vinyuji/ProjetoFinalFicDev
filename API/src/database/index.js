const { Sequelize } = require ('sequelize');
const configdatabase = require('./config/config');

// Exportando os models criados
const { UserModel } = require('../model/UsuarioModel');
const { ReservaModel } = require('../model/ReservaModel');
const { SalaModel } = require('../model/SalaModel');


// Iniciando a conexão ao banco de dados
const database = new Sequelize('postgres://postgres:120521batata@localhost:5432/projetoFinal');

// Iniciando os models
UserModel.init(database);
ReservaModel.init(database);
SalaModel.init(database);

// Iniciando os relacionamentos
UserModel.associate(database.models);
ReservaModel.associate(database.models);
SalaModel.associate(database.models);



module.exports = database;
