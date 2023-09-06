'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sala', {
      IdSala: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      NomeSala: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      Funcao: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      TipoSala: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      NumeroSala: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      Capacidade: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Sala');
  }
};
