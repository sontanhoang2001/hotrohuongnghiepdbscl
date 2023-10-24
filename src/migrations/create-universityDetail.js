'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('University_Detail', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(250)
      },
      province: {
        type: Sequelize.STRING(255)
      },
      lat: {
        type: Sequelize.STRING(255)
      },
      long: {
        type: Sequelize.STRING(255)
      },
      content: {
        type: Sequelize.STRING(255)
      },
      url: {
        type: Sequelize.STRING(555)
      },
      rank: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('University_Detail');
  }
};