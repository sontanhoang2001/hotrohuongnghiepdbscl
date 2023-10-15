"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Role",
      [
        {
          role: "ADMIN",
          description: "Admin"
        },
        {
          role: "CONPANY",
          description: "Doanh nghiệp"
        },
        {
          role: "STUDENT",
          description: "Học sinh"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Role", null, {});
  },
};
