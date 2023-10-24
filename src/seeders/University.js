"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "University",
      [
        {
          Content: "SDHKFKHJSDAHFKJSDJKAHF",
        },
        {
          Content: "SDHKFKHJSDAHFKJSDJKAHF",
        },
        {
          Content: "SDHKFKHJSDAHFKJSDJKAHF",
        },
        {
          Content: "SDHKFKHJSDAHFKJSDJKAHF",
        },
        {
          Content: "SDHKFKHJSDAHFKJSDJKAHF",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("University", null, {});
  },
};