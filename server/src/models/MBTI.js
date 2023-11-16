'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MBTI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MBTI.hasMany(models.MajorMBTI);
    }
  }
  MBTI.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'MBTI',
      tableName: 'mbti',
    },
  );
  return MBTI;
};