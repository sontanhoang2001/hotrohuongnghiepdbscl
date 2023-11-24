'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MajorMBTI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      MajorMBTI.belongsTo(models.MBTI);
      MajorMBTI.belongsTo(models.Organization);
    }
  }
  MajorMBTI.init(
    {
      majorName: DataTypes.STRING,
      link: DataTypes.STRING,
      organizationId: DataTypes.INTEGER,
      mbtiId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'MajorMBTI',
      tableName: 'major_mbti',
      paranoid: true,
    },
  );
  return MajorMBTI;
};
