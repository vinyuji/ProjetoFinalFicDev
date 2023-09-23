'use strict';


/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reserva', {
      IdReserva: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      Sala: {
        type: Sequelize.TEXT,
      },
      FuncaoSala: {
        type: Sequelize.TEXT,
      },
      NumeroSala: {
        type: Sequelize.TEXT,
      },
      DataReserva: {
        type: Sequelize.DATE,
      },
      Capacidade: {
        type: Sequelize.INTEGER,
      },
      PessoaReservista: {
        type: Sequelize.TEXT,

      },
      Status: {
        type: Sequelize.TEXT,

      },
      Cpf: {
        type: Sequelize.TEXT,
      },
      IdSala: {
        type: Sequelize.INTEGER,

      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reserva');
  }
};
