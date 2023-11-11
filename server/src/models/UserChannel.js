'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserChannel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserChannel.belongsTo(models.Channel);
      UserChannel.belongsTo(models.User);
    }
  }
  UserChannel.init(
    {
      userId: DataTypes.INTEGER,
      status: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'UserChannel',
      tableName: 'User_Channel',
    },
  );
  return UserChannel;
};
