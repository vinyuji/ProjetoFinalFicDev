'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sala', {
      IdSala: {
        type: Sequelize.UUID,
        defaultValeu: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      NomeSala: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Funcao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      TipoSala: {
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
    await queryInterface.dropTable('Sala');
  }
};
