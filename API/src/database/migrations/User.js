'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      Cpf: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false,
      },
      Nome: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      Cep: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      Senha: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      FormacaoAcademica: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      TempoDeCurso: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Especializacao: {
        type: Sequelize.STRING(255),
        allowNull: false,
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
    await queryInterface.dropTable('User');
  }
};

