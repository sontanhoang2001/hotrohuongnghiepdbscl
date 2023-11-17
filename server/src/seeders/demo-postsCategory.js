"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Posts_Category",
      [
        {
          name: "Tuyển sinh",
          description: "Tuyển sinh đại học",
        },
        {
          name: "Tuyển dụng",
          description: "Tuyển dụng việc làm",
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Posts_Category", null, {});
  },
};
