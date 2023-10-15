const User = require("../models").User;
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

module.exports = {
  loginUser: async (username) => {
    try {
      const user = await User.findOne({
        attributes: ["id", "account_type", "username", "password", "fullname", "avatar", "email", "birthday", "phone", "address", "role"],
        limit: 1,
        where: {
          [Op.and]: [{ username: username }]
        },
      });
      return user.get({ plain: true });
    } catch (error) {
      throw error;
    }
  },
};
