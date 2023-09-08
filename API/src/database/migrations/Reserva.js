'use strict';


/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reserva', {
      IdReserva: {
        type: Sequelize.UUID,
        defaultValeu: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      Sala: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      FuncaoSala: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      NumeroSala: {
        type: Sequelize.TEXT,
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
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Status: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Cpf: {
        type: Sequelize.TEXT,
      },
      IdSala: {
        type: Sequelize.UUID,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reserva');
  }
};
