'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PersonalDetails', {
      PD_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AccountType: {
        type: Sequelize.INTEGER
      },
      FullName: {
        type: Sequelize.STRING(255)
      },
      Avatar: {
        type: Sequelize.STRING(255)
      },
      Email: {
        type: Sequelize.STRING(255)
      },
      Birthday: {
        type: Sequelize.DATE
      },
      Phone: {
        type: Sequelize.INTEGER
      },
      Address: {
        type: Sequelize.STRING(250)
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PersonalDetails');
  }
};