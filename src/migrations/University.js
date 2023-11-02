'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('University', {
      UN_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Content: {
        type: Sequelize.STRING(250)
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('University');
  }
};