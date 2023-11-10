'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class University extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      University.hasOne(models.UniversityDetail);
      University.belongsToMany(models.BankQuestionAnsDetail, {through: 'CollectionUniversity'})
    }
  }
  University.init(
    {
      name: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'University',
      tableName: 'University',
      paranoid: true
    },
  );
  return University;
};