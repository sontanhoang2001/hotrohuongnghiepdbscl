'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Question',
      [
        {
          question: 'Do incididunt voluptate exercitation eiusmod.',
        },
        {
          question: 'Do incididunt voluptate exercitation eiusmod.',
        },
        {
          question: 'Do incididunt voluptate exercitation eiusmod.',
        },
        {
          question: 'Do incididunt voluptate exercitation eiusmod.',
        },
        {
          question: 'Do incididunt voluptate exercitation eiusmod.',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Question', null, {});
  },
};
