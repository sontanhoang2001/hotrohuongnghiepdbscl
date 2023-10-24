'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'TestDetail',
      [
        {
          chooseAnswer: 1,
        },
        {
          chooseAnswer: 2,
        },
        {
          chooseAnswer: 1,
        },
        {
          chooseAnswer: 1,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TestDetail', null, {});
  },
};
