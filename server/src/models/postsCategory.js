'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostsCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostsCategory.hasMany(models.PostsOrganization);
    }
  }
  PostsCategory.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      organizationId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'PostsCategory',
      tableName: 'posts_category',
      paranoid: true
    },
  );
  return PostsCategory;
};
