'use strict';


/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sala', {
      IdSala: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NomeSala: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Funcao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      NumeroSala: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Capacidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Criador: {
        type: Sequelize.TEXT,
        allowNull: false,
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
      fk_Reserva_IdReserva: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Reserva',
          key: 'IdReserva',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sala');
  }
};