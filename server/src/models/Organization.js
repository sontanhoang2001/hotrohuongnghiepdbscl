'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.belongsTo(models.User);
      Organization.belongsTo(models.Channel);
      Organization.belongsTo(models.VerifyOrganization);
      Organization.belongsTo(models.OrganizationType);
      Organization.hasOne(models.OrganizationDetail);
      Organization.hasMany(models.FAQs);
      Organization.hasMany(models.PostsOrganization);
    }
  }
  Organization.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      organizationTypeId: DataTypes.INTEGER,
      verifyOrganizationId: DataTypes.INTEGER,
      channelId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Organization',
      tableName: 'organization',
      paranoid: true
    },
  );
  return Organization;
};