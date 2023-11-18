'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostsOrganization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostsOrganization.belongsTo(models.Organization);
      PostsOrganization.belongsTo(models.User);
      PostsOrganization.belongsTo(models.PostsCategory);
    }
  }
  PostsOrganization.init(
    {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      content: DataTypes.STRING,
      status: DataTypes.INTEGER,
      displayDate: DataTypes.DATE,
      organizationId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      postsCategoryId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'PostsOrganization',
      tableName: 'posts_organization',
      paranoid: true
    },
  );
  return PostsOrganization;
};
