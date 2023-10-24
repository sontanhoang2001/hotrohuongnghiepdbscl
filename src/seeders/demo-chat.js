'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Chat',
      [
        {
          topic: 'ESTJ',
          text: 'Minim ipsum commodo quis ipsum eiusmod reprehenderit deserunt non pariatur do cupidatat est.',
          time: '2023-10-24',
        },
        {
          topic: 'ESTJ',
          text: 'Minim ipsum commodo quis ipsum eiusmod reprehenderit deserunt non pariatur do cupidatat est.',
          time: '2023-10-24',
        },
        {
          topic: 'ESTJ',
          text: 'Minim ipsum commodo quis ipsum eiusmod reprehenderit deserunt non pariatur do cupidatat est.',
          time: '2023-10-24',
        },
        {
          topic: 'ESTJ',
          text: 'Minim ipsum commodo quis ipsum eiusmod reprehenderit deserunt non pariatur do cupidatat est.',
          time: '2023-10-24',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Chat', null, {});
  },
};
