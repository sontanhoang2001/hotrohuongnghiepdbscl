'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Major_MBTI', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255)
      },
      link: {
        type: Sequelize.JSON
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Major_MBTI');
  }
};