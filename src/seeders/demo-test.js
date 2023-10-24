'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Test',
      [
        {
          name: 1,
        },
        {
          name: 1,
        },
        {
          name: 1,
        },
        {
          name: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Test', null, {});
  },
};
