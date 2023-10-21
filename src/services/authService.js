const User = require("../models").User;
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

module.exports = {
  registerUser: async (payload) => {
    try {
      // Create a new user
      const result = await User.create(payload);
      return result;
    } catch (error) {
      throw error;
    }
  },
  existingUserByEmail : async (email) => {
    try {
      // Kiểm tra email
      return await User.findOne({ where: {email: email}});
    } catch (error) {
      throw error;
    }
  },
  existingUserByPhone: async (phone) => {
    try {
      // Kiểm tra email
      return await User.findOne({ where: {phone: phone}});
    } catch (error) {
      throw error;
    }
  },

  loginUser: async (username) => {
    try {
      const user = await User.findOne({
        attributes: ["id", "account_type", "password", "fullname", "avatar", "email", "birthday", "phone", "address", "role", "status"],
        limit: 1,
        where: {
          [Op.or]: [
            {email: username},  
            {phone: username}
          ]
        }  
      });
      if (user) {
        return user.get({ plain: true });
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  },
};
