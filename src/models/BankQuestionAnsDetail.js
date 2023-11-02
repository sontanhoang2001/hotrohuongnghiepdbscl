"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BankQuestionAnsDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BankQuestionAnsDetail.init(
    {
      Question: DataTypes.STRING,
      Answer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BankQuestionAnsDetail",
    }
  );
  return BankQuestionAnsDetail;
};
