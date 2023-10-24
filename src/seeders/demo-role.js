"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Role",
      [
        {
          name: "ADMIN",
          description: "Quyền cao nhất"
        },
        {
          name: "CONPANY",
          description: "Doanh nghiệp"
        },
        {
          name: "CONPANY2",
          description: "Doanh nghiệp"
        },
        {
          name: "CONPANY3",
          description: "Giáo Viên"
        },
        {
          name: "STUDENT",
          description: "Quyền học sinh/ sinh viên/ người dùng bình thường"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Role", null, {});
  },
};
