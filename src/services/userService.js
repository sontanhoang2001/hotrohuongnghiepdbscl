const User = require('../models').User;
const UserDetail = require('../models').UserDetail;
const Role = require('../models').Role;

const bcrypt = require('bcrypt');
const { where } = require('sequelize');

module.exports = {
  createNew: async (userObj) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(userObj.password, salt);

    try {
      // console.log("user", db);
      // const result = await db.User.create({
      //   userName: userObj.username,
      //   password: hashed,
      //   firstName: userObj.firstName,
      //   lastName: userObj.lastName,
      //   email: userObj.email,
      //   role_code: userObj.role_code,
      // });
      // console.log("Insert result:", result);
    } catch (error) {
      throw error;
    }
  },
  getAll: async (page, size) => {
    // return User.findAll({
    //   attributes: ["id", "firstName", "lastName", "email"],
    //   limit: 5,
    //   order: [["id", "DESC"]],
    // })

    // try {
      // Tính offset
      const offset = (page - 1) * size;

      const { count, rows } = await User.findAndCountAll({
        offset,
        limit: size,
      });

      // Chuẩn bị dữ liệu phân trang
      const pagination = {
        total: count,
        page,
        size,
        data: rows,
      };

      console.log("pagination", pagination);
      return pagination;
    // } catch (error) {
    //   throw error;
    // }
  },
  getUserByUserId: async (userId) => {
    try {
      const user = await User.findByPk(userId, {
        attributes: ['id', 'account_type', 'email', 'phone', 'password', 'status'],
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

      if (user instanceof User) {
        return user.get();
      }

      return user;
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (payload) => {
    try {
      const userId = payload.userId;
      const payloadUserDetail = {
        fullName: payload.fullName,
        gender: payload.gender,
        avatar: payload.avatar,
        birthday: payload.birthday,
        address: payload.address,
        addressDetail: payload.addressDetail,
      };

      const user = await User.findByPk(userId, {
        include: [
          {
            model: UserDetail,
            attributes: ['id'],
          },
        ],
      });

      // Update user detail
      if (user) {
        const [numberOfAffectedRows] = await UserDetail.update(payloadUserDetail, {
          where: { id: user.UserDetail.id },
        });

        let isUpdated = false;
        if (numberOfAffectedRows > 0) {
          isUpdated = true;
        }
        return isUpdated;
      }

      return user;
    } catch (error) {
      throw error;
    }
  },
};
