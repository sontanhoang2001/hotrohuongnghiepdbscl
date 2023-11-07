'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('University_Detail', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING(555),
      },
      address: {
        type: Sequelize.STRING(255),
      },
      province: {
        type: Sequelize.STRING(255),
      },
      email: {
        type: Sequelize.STRING(100),
      },
      phone: {
        type: Sequelize.STRING(15),
      },
      lat: {
        type: Sequelize.STRING(255),
      },
      long: {
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.TEXT,
      },
      url: {
        type: Sequelize.STRING(555),
      },
      rank: {
        type: Sequelize.INTEGER,
      },
      universityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'University',
          key: 'id',
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('University_Detail');
  },
};
