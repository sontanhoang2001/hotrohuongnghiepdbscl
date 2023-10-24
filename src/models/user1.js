"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

     // Định nghĩa phương thức toJSON để loại bỏ trường password
    toJSON() {
      const values = { ...this.get() };
      delete values.password;
      return values;
    }
  }

  
  User.init(
    {
      account_type: DataTypes.INTEGER,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      fullname: DataTypes.STRING,
      avatar: DataTypes.STRING,
      birthday: DataTypes.DATE,
      gender:  DataTypes.INTEGER,
      address: DataTypes.STRING,
      address_detail: DataTypes.STRING,
      role: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User"
    }
  );
  return User;
};
