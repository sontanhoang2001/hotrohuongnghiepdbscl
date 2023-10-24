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
      User.hasOne(models.UserDetail);
      User.belongsTo(models.Role);
    }
  }
  User.init(
    {
      account_type: DataTypes.INTEGER,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      passWord: DataTypes.STRING,
      authCode: DataTypes.STRING,
      role: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'User',
    },
  );
  return User;
};
