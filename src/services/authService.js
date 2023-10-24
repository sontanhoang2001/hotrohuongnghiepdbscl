const User  = require("../models").User;
const Role = require("../models").Role;
const UserDetail = require("../models").UserDetail;

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
        attributes: ["id", "account_type", "email",  "phone",  "password", "status"],
        limit: 1,
        where: {
          [Op.or]: [
            {email: username},  
            {phone: username}
          ]
        },
        include: [{
          model: UserDetail,
          attributes: ['id', 'fullName', 'gender', 'avatar', 'birthday', 'address', 'addressDetail'] 
        },
        {
          model: Role,
          attributes: ['id', 'name'] 
        }]
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
