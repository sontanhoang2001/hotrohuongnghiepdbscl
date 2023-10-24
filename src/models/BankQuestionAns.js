'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankQuestionAns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BankQuestionAns.init(
    {},
    {
      sequelize,
      modelName: 'BankQuestionAns',
      tableName: 'Bank_QuestionAns',
    },
  );
  return BankQuestionAns;
};
