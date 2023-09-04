'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Salas', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement: true,
      },
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Salas');
  }
};
