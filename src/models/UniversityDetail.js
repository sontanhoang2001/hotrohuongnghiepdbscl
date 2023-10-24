'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UniversityDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UniversityDetail.init(
    {
      name: DataTypes.STRING,
      province: DataTypes.STRING,
      lat: DataTypes.STRING,
      long: DataTypes.STRING,
      content: DataTypes.STRING,
      url: DataTypes.STRING,
      rank: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UniversityDetail',
      tableName: 'UniversityDetail',
    },
  );
  return UniversityDetail;
};
