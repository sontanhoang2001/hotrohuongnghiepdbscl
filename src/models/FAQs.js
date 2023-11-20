'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FAQs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FAQs.belongsTo(models.User);
      FAQs.belongsTo(models.Organization);
    }
  }
  FAQs.init(
    {
      question: DataTypes.STRING,
      answer: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      organizationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'FAQs',
      tableName: 'fAQs',
      paranoid: true
    },
  );
  return FAQs;
};