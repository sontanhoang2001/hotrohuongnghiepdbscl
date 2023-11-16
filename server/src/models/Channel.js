'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Channel.belongsTo(models.User);
      Channel.hasMany(models.Organization);
      Channel.hasMany(models.UserChannel);
    }
  }
  Channel.init(
    {
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      description: DataTypes.STRING,
      content: DataTypes.STRING,
      status: DataTypes.INTEGER,
      organizationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Channel',
      tableName: 'channel',
      paranoid: true
    },
  );
  return Channel;
};