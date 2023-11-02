'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Answer', {
      A_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Answer: {
        type: Sequelize.INTEGER
      },
      Value: {
        type: Sequelize.STRING(255)
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Answer');
  }
};