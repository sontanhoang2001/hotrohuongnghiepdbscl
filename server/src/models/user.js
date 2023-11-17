'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserDetail);
      User.belongsTo(models.Role);
      User.hasMany(models.Messages);
      User.hasMany(models.Channel);
      User.hasMany(models.UserChannel);
      User.hasOne(models.VerifyOrganization);
      User.belongsToMany(models.Organization, { through: models.UserOrganization });
    }

    // Định nghĩa phương thức toJSON để loại bỏ trường password
    toJSON() {
      const values = { ...this.get() };
      delete values.password;
      return values;
    }
  }
  User.init(
    {
      account_type: DataTypes.INTEGER,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      authCode: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'user',
    },
  );
  return User;
};
