'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Mbti',
      [
        {
          fullName: 'Nguyen Minh Nhut',
          gender: '1',
          avatar: 'avatar.jpg',
          birthday: '2023-10-10',
          address: 'Can tho',
          addressDetail: 'Ea incididunt adipisicing amet nisi mollit sunt.',
        },
        {
          fullName: 'Nguyen thi thuy linh',
          gender: '1',
          avatar: 'avatar.jpg',
          birthday: '2023-10-10',
          address: 'Can tho',
          addressDetail: 'Ea incididunt adipisicing amet nisi mollit sunt.',
        },
        {
          fullName: 'Tran Hoai Bao',
          gender: '1',
          avatar: 'avatar.jpg',
          birthday: '2023-10-10',
          address: 'Can tho',
          addressDetail: 'Ea incididunt adipisicing amet nisi mollit sunt.',
        },
        {
          fullName: 'Lai Van Sam',
          gender: '1',
          avatar: 'avatar.jpg',
          birthday: '2023-10-10',
          address: 'Can tho',
          addressDetail: 'Ea incididunt adipisicing amet nisi mollit sunt.',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Mbti', null, {});
  },
};
