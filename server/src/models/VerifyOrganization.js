'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerifyOrganization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VerifyOrganization.belongsTo(models.User);
      VerifyOrganization.hasOne(models.Organization);
    }
  }
  VerifyOrganization.init(
    {
      fileAttached: DataTypes.STRING,
      status: DataTypes.INTEGER,
      organizationId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'VerifyOrganization',
      tableName: 'Verify_Organization',
    },
  );
  return VerifyOrganization;
};
