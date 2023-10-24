'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'BankQuestionAnsDetail',
      [
        {
          question: 'ESTJ',
          answer: 'SDHKFKHJSDAHFKJSDJKAHF',
        },
        {
          question: 'ISTP',
          answer: 'SD FDSF DSF ASFJGKLJSD',
        },
        {
          question: 'ESTP',
          answer: 'SD G SAG SDAG ASFGFDG',
        },
        {
          question: 'INTJ',
          answer: 'DF SG DFG DFSG DF GFD ',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('BankQuestionAnsDetail', null, {});
  },
};
