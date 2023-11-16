'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserDetail.belongsTo(models.User)
    }
  }
  UserDetail.init(
    {
      fullName: DataTypes.STRING,
      gender: DataTypes.INTEGER,
      avatar: DataTypes.STRING,
      birthday: DataTypes.DATE,
      address: DataTypes.STRING,
      addressDetail: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserDetail',
      tableName: 'user_detail',
    },
  );
  return UserDetail;
};
