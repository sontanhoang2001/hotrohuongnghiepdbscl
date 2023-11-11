'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrganizationType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrganizationType.hasMany(models.Organization);
    }
  }
  OrganizationType.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'OrganizationType',
      tableName: 'Organization_Type',
    },
  );
  return OrganizationType;
};
