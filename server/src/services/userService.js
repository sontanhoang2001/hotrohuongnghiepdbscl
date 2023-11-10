const User = require('../models').User;
const UserDetail = require('../models').UserDetail;
const Role = require('../models').Role;

const bcrypt = require('bcrypt');
const { where, Op } = require('sequelize');
const sequelize = require('../database/connection_database');

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
  getAll: async (page, size, search) => {
    try {
      const where = {};
      if (search) {
        where[Op.or] = [
          { email: { [Op.like]: `%${search}%` }}, 
          { phone: { [Op.like]: `%${search}%` }}
        ];
      }

      // Tính offset
      const offset = (page - 1) * size;

      const { count, rows } = await User.findAndCountAll({
        where,
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

      return pagination;
    } catch (error) {
      throw error;
    }
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

  deleteOneUser : async (userId) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // Destroy question
      const numberOfAffectedRows1 = await User.destroy({
        where: { id: userId },
      });

      // Kiểm tra số lượng dòng bị ảnh hưởng bởi câu lệnh update cho câu hỏi
      if (numberOfAffectedRows1 === 0) {
        await transaction.rollback();
        return false; // Trả về false nếu không có câu hỏi nào được cập nhật
      }

      // Destroy answers
      const numberOfAffectedRows2 = await UserDetail.destroy({
        where: { userId: userId },
      });

      if (numberOfAffectedRows2 === 0) {
        await transaction.rollback();
        return false; // Trả về false nếu có lỗi khi cập nhật một trong các câu trả lời
      }
      transaction.commit();
      return true;
    } catch (error) {
      if (transaction) {
        await transaction.rollback(); // Rollback transaction nếu có lỗi
      }
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },
};
