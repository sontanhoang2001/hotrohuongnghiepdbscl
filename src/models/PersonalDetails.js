"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PersonalDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PersonalDetails.init(
    {
      AccountType: DataTypes.INTEGER,
      FullName: DataTypes.STRING,
      Avatar: DataTypes.STRING,
      Email: DataTypes.STRING,
      Birthday: DataTypes.DATE,
      Phone: DataTypes.INTEGER,
      Address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PersonalDetails",
    }
  );
  return PersonalDetails;
};
