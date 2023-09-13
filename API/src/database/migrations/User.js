'use strict';


/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      Cpf: {
        type: Sequelize.TEXT,
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
      },
      TempoDeCurso: {
        type: Sequelize.TEXT,
      },
      Especializacao: {
        type: Sequelize.TEXT,
      },
      fk_Reserva_IdReserva: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Reserva',
          key: 'IdReserva',
        },
        onDelete: 'CASCADE',
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