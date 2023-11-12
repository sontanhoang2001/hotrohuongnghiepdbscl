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
    }
  }
  PostsOrganization.init(
    {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      content: DataTypes.STRING,
      organizationId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'PostsOrganization',
      tableName: 'Posts_Organization',
      paranoid: true
    },
  );
  return PostsOrganization;
};
