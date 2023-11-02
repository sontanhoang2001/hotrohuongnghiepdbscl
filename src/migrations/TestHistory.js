'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TestHistory', {
      TH_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StartTime: {
        type: Sequelize.DATE
      },
      EndTime: {
        type: Sequelize.DATE
      },
      Complete: {
        type: Sequelize.INTEGER
      },
      CreateAt: {
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TestHistory');
  }
};