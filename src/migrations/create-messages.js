'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderId: {
        type: Sequelize.INTEGER
      },
      reciverId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      content: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      chatId: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messages');
  }
};