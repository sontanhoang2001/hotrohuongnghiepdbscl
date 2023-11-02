'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UniversityDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UniversityDetail.belongsTo(models.University);
    }
  }
  UniversityDetail.init(
    {
      image: DataTypes.STRING,
      address: DataTypes.STRING,
      province: DataTypes.STRING,
      email : DataTypes.STRING,
      phone : DataTypes.STRING,
      lat: DataTypes.STRING,
      long: DataTypes.STRING,
      description: DataTypes.TEXT,
      url: DataTypes.STRING,
      rank: DataTypes.INTEGER,
      universityId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UniversityDetail',
      tableName: 'University_Detail',
    },
  );
  return UniversityDetail;
};
