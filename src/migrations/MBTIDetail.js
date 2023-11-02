'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MBTIDetail', {
      MBTIDetail_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING(255)
      },
      Description: {
        type: Sequelize.STRING(255)
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MBTIDetail');
  }
};