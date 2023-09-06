const { Sequelize } = require("sequelize");

const database = new Sequelize('postgres://postgres:123@localhost:5432/projetoFinal');

module.exports = {database};