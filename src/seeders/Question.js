"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Question",
      [
        {
          name: "ESTJ",
          description: "SDHKFKHJSDAHFKJSDJKAHF",
        },
        {
          name: "ISTP",
          description: "SD FDSF DSF ASFJGKLJSD",
        },
        {
          name: "ESTP",
          description: "SD G SAG SDAG ASFGFDG",
        },
        {
          name: "INTJ",
          description: "DF SG DFG DFSG DF GFD ",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Question", null, {});
  },
};