const User = require('../models').User;
const Role = require('../models').Role;
const UserDetail = require('../models').UserDetail;

const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const sequelize = require('../database/connection_database');

module.exports = {
  registerUser: async (payload) => {
    try {
      const transaction = await sequelize.transaction();
      const payloadUser = {
        account_type: payload.account_type,
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
        status: payload.status,
        roleId: payload.roleId,
      };

      const payloadUserDetail = {
        fullName: payload.fullName,
        gender: payload.gender,
        address: payload.address,
        avatar: payload.avatar,
      };

      // Tạo user
      const user = await User.create(payloadUser, { transaction });

      // Tạo user detail
      await UserDetail.create({ ...payloadUserDetail, userId: user.id }, { transaction });
      await transaction.commit(); // Sử dụng await ở đây để đảm bảo rằng commit đã hoàn thành
      return user; // Trả về user sau khi transaction đã được commit
    } catch (error) {
      if (transaction) {
        await transaction.rollback(); // Rollback transaction nếu có lỗi
      }
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },
  registerUserBySocialNetwork: async (payload) => {
    try {
      const transaction = await sequelize.transaction();
      const payloadUser = {
        account_type: payload.account_type,
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
        status: payload.status,
        roleId: payload.roleId,
      };

      const payloadUserDetail = {
        fullName: payload.fullName,
        gender: payload.gender,
        address: payload.address,
      };

      // Tạo user
      const user = await User.create(payloadUser, { transaction });

      // Tạo user detail
      await UserDetail.create({ ...payloadUserDetail, userId: user.id }, { transaction });
      await transaction.commit(); // Sử dụng await ở đây để đảm bảo rằng commit đã hoàn thành
      return user; // Trả về user sau khi transaction đã được commit
    } catch (error) {
      if (transaction) {
        await transaction.rollback(); // Rollback transaction nếu có lỗi
      }
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },
  existingUserByEmail: async (email) => {
    try {
      // Kiểm tra email
      return await User.findOne({ where: { email: email } });
    } catch (error) {
      throw error;
    }
  },
  existingUserByPhone: async (phone) => {
    try {
      // Kiểm tra email
      return await User.findOne({ where: { phone: phone } });
    } catch (error) {
      throw error;
    }
  },
  getUserEmailById: async (userId) => {
    try {
      // Kiểm tra email
      const user = await User.findOne({ where: { id: userId }, attributes: ['email'] });
      if (user) {
        return user.get({ plain: true });
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  },
  getUserPhoneById: async (phone) => {
    try {
      // Kiểm tra email
      const user = await User.findOne({ where: { id: userId }, attributes: ['phone'] });
      if (user) {
        return user.get({ plain: true });
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  },
  saveOTPForUser: async (userId, otpCode) => {
    try {
      const payload = { authCode: otpCode };
      // Update mã OTP cho user
      const user = await User.update(payload, { where: { id: userId } });
      return user;
    } catch (error) {
      throw error;
    }
  },
  authOTPByEmail: async (userId, otpCode) => {
    try {
      const [numberOfAffectedRows] = await User.update(
        {
          authCode: null,
          status: 1,
        },
        {
          where: {
            id: userId,
            authCode: otpCode,
          },
        },
      );

      let isSuccess = false;
      if (numberOfAffectedRows > 0) {
        isSuccess = true;
      }

      return isSuccess;
    } catch (error) {
      throw error;
    }
  },
  authOTPByPhone: async (userId) => {
    try {
      const user = await User.update(
        {
          authCode: null,
          status: 1,
        },
        {
          where: {
            id: userId,
          },
        },
      );

      return user[0];
    } catch (error) {
      throw error;
    }
  },
  loginUser: async (username) => {
    try {
      const user = await User.findOne({
        attributes: ['id', 'account_type', 'email', 'phone', 'password', 'status'],
        limit: 1,
        where: {
          [Op.or]: [{ email: username }, { phone: username }],
        },
        include: [
          {
            model: UserDetail,
            attributes: [
              'id',
              'fullName',
              'gender',
              'avatar',
              'birthday',
              'address',
              'addressDetail',
            ],
          },
          {
            model: Role,
            attributes: ['id', 'name'],
          },
        ],
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
  loginUserBySocialNetwork: async (payload) => {
    try {
      const user = await User.findOne({
        attributes: ['id', 'account_type', 'email', 'phone', 'password', 'status'],
        limit: 1,
        where: {
          [Op.or]: [
            { email: payload.email },
            payload.phoneNumber && { phone: payload.phoneNumber },
          ],
        },
        include: [
          {
            model: UserDetail,
            attributes: [
              'id',
              'fullName',
              'gender',
              'avatar',
              'birthday',
              'address',
              'addressDetail',
            ],
          },
          {
            model: Role,
            attributes: ['id', 'name'],
          },
        ],
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
