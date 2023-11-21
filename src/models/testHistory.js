'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TestHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TestHistory.belongsTo(models.User);
      TestHistory.belongsTo(models.MBTI);
    }
  }
  TestHistory.init(
    {
      userId: DataTypes.INTEGER,
      mbtiId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TestHistory',
      tableName: 'test_history',
      paranoid: true,
    },
  );
  return TestHistory;
};