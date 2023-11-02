'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UniversityDetail', {
      UND_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING(250)
      },
      Province: {
        type: Sequelize.STRING(255)
      },
      Lat: {
        type: Sequelize.STRING(255)
      },
      Long: {
        type: Sequelize.STRING(255)
      },
      Content: {
        type: Sequelize.STRING(255)
      },
      Rank: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UniversityDetail');
  }
};