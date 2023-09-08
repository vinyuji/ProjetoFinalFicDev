'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      Cpf: {
        type: Sequelize.UUID,
        defaultValeu: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      Nome: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Cep: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Senha: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Email: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      FormacaoAcademica: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      TempoDeCurso: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Especializacao: {
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  }
};

