'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Major',
      [
        {
          name: 'ESTJ',
          link: 'https://www.youtube.com/',
        },
        {
          name: 'aaaa',
          link: 'https://www.youtube.com/',
        },
        {
          name: 'asdas',
          link: 'https://www.youtube.com/',
        },
        {
          name: 'bbb',
          link: 'https://www.youtube.com/',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Major', null, {});
  },
};
