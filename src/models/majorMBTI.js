'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MajorMBTI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MajorMBTI.belongsTo(models.MBTI);
    }
  }
  MajorMBTI.init(
    {
      name: DataTypes.STRING,
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'MajorMBTI',
      tableName: 'major_mbti',
      paranoid: true
    },
  );
  return MajorMBTI;
};