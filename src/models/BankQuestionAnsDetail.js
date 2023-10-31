'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankQuestionAnsDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BankQuestionAnsDetail.belongsTo(models.BankQuestionAns);
      BankQuestionAnsDetail.belongsToMany(models.University, {through: 'CollectionUniversity'})
    }
  }
  BankQuestionAnsDetail.init(
    {
      question: DataTypes.STRING,
      answer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'BankQuestionAnsDetail',
      tableName: 'Bank_QuestionAns_Detail',
    },
  );
  return BankQuestionAnsDetail;
};
