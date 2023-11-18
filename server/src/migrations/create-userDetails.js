'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Detail', {
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
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Detail');
  }
};