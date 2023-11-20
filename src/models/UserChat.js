'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserChat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserChat.belongsTo(models.Chat);
      UserChat.belongsTo(models.User);
    }
  }
  UserChat.init(
    {
      userId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      chatId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'UserChat',
      tableName: 'user_chat',
      paranoid: true
    },
  );
  return UserChat;
};
