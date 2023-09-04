'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    Usuario: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Cpf: {
      type:Sequelize.INTEGER,
      allowNull: false,
      unique:true,
    },
    Cep: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
