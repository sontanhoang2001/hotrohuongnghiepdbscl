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
      Organization.belongsTo(models.VerifyOrganization);
      Organization.belongsTo(models.OrganizationType);
      Organization.hasOne(models.OrganizationDetail);
      Organization.hasOne(models.Chat);
      Organization.hasMany(models.FAQs);
      Organization.hasMany(models.PostsOrganization);
      
      Organization.belongsToMany(models.User, { through: models.UserOrganization });
    }
  }
  Organization.init(
    {
      name: DataTypes.STRING,
      organizationTypeId: DataTypes.INTEGER,
      verifyOrganizationId: DataTypes.INTEGER,
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