"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "User",
      [
        {
          account_type: 0,
          email: "admin@gmail.com",
          phone: '19001087',
          password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",
          authCode: null,
          roleId: 1,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          account_type: 0,
          email: "user@gmail.com",
          phone: '0973827831',
          password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",
          authCode: null,
          roleId: 5,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("User", null, {});
  },
};