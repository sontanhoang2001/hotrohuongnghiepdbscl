'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'User_Detail',
      [
        {
          fullName: 'Nguyen Minh Nhut',
          gender: '1',
          avatar: 'https://media.licdn.com/dms/image/C4E03AQEmIVL2LZyMmA/profile-displayphoto-shrink_200_200/0/1604397377631?e=1698883200&v=beta&t=tOpg8aUYYaQWYC5fxm3arrWLunBBULdQOD_W7aKjxxc',
          birthday: '2023-10-10',
          address: 'Can tho',
          addressDetail: 'Ea incididunt adipisicing amet nisi mollit sunt.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: 'Nguyễn Thị B',
          gender: '2',
          avatar: 'https://media.licdn.com/dms/image/C4E03AQEmIVL2LZyMmA/profile-displayphoto-shrink_200_200/0/1604397377631?e=1698883200&v=beta&t=tOpg8aUYYaQWYC5fxm3arrWLunBBULdQOD_W7aKjxxc',
          birthday: '2023-10-10',
          address: 'Cần Thơ',
          addressDetail: 'Ea incididunt adipisicing amet nisi mollit sunt.',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User_Detail', null, {});
  },
};
