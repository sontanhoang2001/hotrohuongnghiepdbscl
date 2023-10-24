'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MBTI', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(4)
      },
      description: {
        type: Sequelize.JSON
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MBTI');
  }
};