'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reserva', {
      IdReserva: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      Sala: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      FuncaoSala: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      NumeroSala: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      DataReserva: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Capacidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      PessoaReservista: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Status: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reserva');
  }
};
