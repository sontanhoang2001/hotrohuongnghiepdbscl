"use strict";
const { Model } = require("sequelize");
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
      Name: DataTypes.STRING,
      Province: DataTypes.STRING,
      Lat: DataTypes.STRING,
      Long: DataTypes.STRING,
      Content: DataTypes.STRING,
      Rank: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UniversityDetail",
    }
  );
  return UniversityDetail;
};
