"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MBTIDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MBTIDetail.init(
    {
      Name: DataTypes.STRING,
      Description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MBTIDetail",
    }
  );
  return MBTIDetail;
};
