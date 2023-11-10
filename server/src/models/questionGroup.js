'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuestionGroup.hasMany(models.Question);
    }
  }
  QuestionGroup.init(
    {
      name: DataTypes.STRING,
      value: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'QuestionGroup',
      tableName: 'Question_Group',
    },
  );
  return QuestionGroup;
};
