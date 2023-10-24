'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TestDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TestDetail.init(
    {
      chooseAnswer: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TestDetail',
      tableName: 'Test_Detail',
    },
  );
  return TestDetail;
};
