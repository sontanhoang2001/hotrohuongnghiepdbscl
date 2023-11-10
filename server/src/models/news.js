'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.University);
      News.belongsTo(models.User);
    }
  }
  News.init(
    {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      universityId:DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'News',
      tableName: 'News',
      paranoid: true,
    },
  );
  return News;
};