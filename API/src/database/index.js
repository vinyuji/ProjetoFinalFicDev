const { Sequelize } = require("sequelize");

const database = new Sequelize('postgres://postgres:120521batata@localhost:5432/projetoFinal');


module.exports = {database};