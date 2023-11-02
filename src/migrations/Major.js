'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Major', {
      M_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING(255)
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Major');
  }
};