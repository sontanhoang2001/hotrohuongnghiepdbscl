'use strict';
const { Model } = require('sequelize');
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
  }
  User.init(
    {
      account_type: DataTypes.INTEGER,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      passWord: DataTypes.STRING,
      active: DataTypes.INTEGER,
      authCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'User',
    },
  );
  return User;
};
