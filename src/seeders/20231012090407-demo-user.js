'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
  
      await queryInterface.bulkInsert('User', [{
        firstName: 'Hoàng',
        lastName: 'Tấn',
        email: 'tanhoang@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Minh',
        lastName: 'Doe',
        email: 'example1@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Anh',
        lastName: 'Doe',
        email: 'example2@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkDelete('User', null, {});
     
  }
};
