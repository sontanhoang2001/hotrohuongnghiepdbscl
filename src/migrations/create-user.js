'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_type: {
        type: Sequelize.INTEGER(1)
      },
      email: {
        type: Sequelize.STRING(320)
      },
      phone: {
        type: Sequelize.STRING(10)
      },
      password: {
        type: Sequelize.STRING(100)
      },
      fullname: {
        type: Sequelize.STRING(100)
      },
      avatar: {
        type: Sequelize.STRING(300)
      },
      birthday: {
        type: Sequelize.DATEONLY
      },
      gender: {
        type: Sequelize.INTEGER(1)
      },
      address: {
        type: Sequelize.STRING(255)
      },
      address_detail: {
        type: Sequelize.STRING(255)
      },
      role: {
        type: Sequelize.INTEGER(1)
      },
      status: {
        type: Sequelize.INTEGER(1)
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
    await queryInterface.dropTable('User');
  }
};