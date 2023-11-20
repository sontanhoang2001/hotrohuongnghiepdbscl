'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.hasMany(models.Messages);
      Chat.hasMany(models.UserChat);
      Chat.belongsTo(models.Organization);
    }
  }
  Chat.init(
    {
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.INTEGER,
      organizationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Chat',
      tableName: 'Chat',
      paranoid: true
    },
  );
  return Chat;
};