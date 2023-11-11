'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrganizationDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrganizationDetail.belongsTo(models.Organization);
    }
  }
  OrganizationDetail.init(
    {
      image: DataTypes.STRING,
      address: DataTypes.STRING,
      province: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      lat: DataTypes.STRING,
      long: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      rank: DataTypes.INTEGER,
      organizationId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'OrganizationDetail',
      tableName: 'Organization_Detail',
    },
  );
  return OrganizationDetail;
};
