'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Test', {
      T_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING(250)
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Test');
  }
};