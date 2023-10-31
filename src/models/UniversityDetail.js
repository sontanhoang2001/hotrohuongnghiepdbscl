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
      UniversityDetail.belongsTo(models.University);
    }
  }
  UniversityDetail.init(
    {
      province: DataTypes.STRING,
      lat: DataTypes.STRING,
      long: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      rank: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UniversityDetail',
      tableName: 'University_Detail',
    },
  );
  return UniversityDetail;
};
