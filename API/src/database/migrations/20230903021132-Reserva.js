'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Reserva', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true,
      },
      
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Reserva');
  }
};
