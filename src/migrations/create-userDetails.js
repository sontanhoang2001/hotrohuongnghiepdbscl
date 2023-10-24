'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING(100)
      },
      gender: {
        type: Sequelize.INTEGER(1)
      },
      avatar: {
        type: Sequelize.STRING(255)
      },
      birthday: {
        type: Sequelize.DATE
      },
      address: {
        type: Sequelize.STRING(255)
      },
      addressDetail: {
        type: Sequelize.STRING(255)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userDetails');
  }
};