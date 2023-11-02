'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.QuestionGroup);
      Question.hasMany(models.TestDetail);
      Question.hasMany(models.Answer);
    }
  }
  Question.init(
    {
      question: DataTypes.STRING,
      questionGroupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Question',
      tableName: 'Question',
    },
  );
  return Question;
};
