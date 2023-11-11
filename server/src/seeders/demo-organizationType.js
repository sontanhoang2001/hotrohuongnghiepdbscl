'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Organization_Type',
      [
        {
          name: 'University',
          description: 'Trường đại học',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'Company',
          description: 'Công ty - Danh nghiệp',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Organization_Type', null, {});
  },
};
