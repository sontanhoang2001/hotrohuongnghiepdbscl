'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Messages.belongsTo(models.User);
      Messages.belongsTo(models.Channel);
    }
  }
  Messages.init(
    {
      sender_id: DataTypes.INTEGER,
      reciver_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Messages',
      tableName: 'messages',
    },
  );
  return Messages;
};
