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
          name: "UNIVERSITY",
          description: "Trường học"
        },
        {
          name: "CONPANY",
          description: "Doanh nghiệp - Công ty"
        },
        {
          name: "ADVISER",
          description: "Tư vấn viên - Cố vấn"
        },
        {
          name: "STUDENT",
          description: "Quyền học sinh - sinh viên - người dùng bình thường"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Role", null, {});
  },
};
