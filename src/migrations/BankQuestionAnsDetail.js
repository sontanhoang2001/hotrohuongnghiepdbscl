'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BankQuestionAnsDetail', {
      BQAD_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Question: {
        type: Sequelize.STRING(255)
      },
      Answer: {
        type: Sequelize.STRING(255)
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BankQuestionAnsDetail');
  }
};