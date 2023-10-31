'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Question_Group', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(1)
      },
      value: {
        type: Sequelize.STRING(2)
      },
      description: {
        type: Sequelize.STRING(255)
      },
      image : {
        type: Sequelize.STRING(555)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Question_Group');
  }
};