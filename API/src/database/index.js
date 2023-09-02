const { Sequelize } = require("sequelize");

const database = new Sequelize('postgres://postgres:120521batata@localhost:5432/projetoFinal');

// criar tabela 

/*(async () => {
  try {
      await database.query(`CREATE TABLE API (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        cep CHAR(8) NOT NULL
        );`);
      console.log("CRIADO");
  } catch (error) {
      console.error('Error create database:', error);
  }
})();
*/

module.exports = {database};