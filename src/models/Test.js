'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Test.belongsTo(models.User);
      Test.hasMany(models.TestDetail);
      Test.hasOne(models.TestHistory);
    }
  }
  Test.init(
    {
    },
    {
      sequelize,
      modelName: 'Test',
      tableName: 'Test',
    },
  );
  return Test;
};
