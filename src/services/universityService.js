const University = require('../models').University;
const UniversityDetail = require('../models').UniversityDetail;

const sequelize = require('../database/connection_database');

module.exports = {
  createNew: async (payload) => {
    let transaction;
    try {
      const universityDetailPayload = {
        image: payload.image,
        address: payload.address,
        province: payload.province,
        email: payload.email,
        phone: payload.phone,
        lat: payload.lat,
        long: payload.long,
        description: payload.description,
        url: payload.url,
        rank: payload.rank,
      };

      transaction = await sequelize.transaction();
      // Tạo mới University
      const university = await University.create({ name: payload.name }, { transaction });
      const universityId = university?.dataValues.id;

      await UniversityDetail.create({ ...universityDetailPayload, universityId: universityId }, { transaction });
      await transaction.commit();
      return university;
    } catch (error) {
      if (transaction) {
        await transaction.rollback(); // Rollback transaction nếu có lỗi
      }
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },
  getAll: async (page, size) => {
    try {
      // Tính offset
      const offset = (page - 1) * size;

      const { count, rows } = await University.findAndCountAll({
        offset,
        limit: size,
        attributes: ['name'],
        include: [
          {
            model: UniversityDetail,
            attributes: ['id', 'image', 'address', 'province', 'email', 'phone', 'lat', 'long', 'description', 'url', 'rank'],
          },
        ],
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
  getUniversityById: async (universityId) => {
    try {
      const university = await University.findByPk(universityId, {
        attributes: ['name'],
        include: [
          {
            model: UniversityDetail,
            attributes: ['id', 'image', 'address', 'province', 'email', 'phone', 'lat', 'long', 'description', 'url', 'rank'],
          },
        ],
      });

      if (university instanceof University) {
        return university.get();
      }

      return university;
    } catch (error) {
      throw error;
    }
  },
  updateUniversity: async (universityId, payload) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // Update question
      const [numberOfAffectedRows1] = await University.update(
        { name: payload.name },
        {
          where: { id: universityId },
          transaction,
        },
      );

      // Kiểm tra số lượng dòng bị ảnh hưởng bởi câu lệnh update cho câu hỏi
      if (numberOfAffectedRows1 === 0) {
        await transaction.rollback();
        return false; // Trả về false nếu không có câu hỏi nào được cập nhật
      }

      const universityDetailPayload = {
        image: payload.image,
        address: payload.address,
        province: payload.province,
        email: payload.email,
        phone: payload.phone,
        lat: payload.phone,
        long: payload.long,
        description: payload.description,
        url: payload.url,
        rank: payload.rank,
      };

      // Update answers
      const [numberOfAffectedRows2] = await UniversityDetail.update(universityDetailPayload, {
        where: { universityId: universityId },
        transaction,
      });

      if (numberOfAffectedRows2 === 0) {
        await transaction.rollback();
        return false; // Trả về false nếu có lỗi khi cập nhật một trong các câu trả lời
      }

      await transaction.commit();
      return true; // Trả về true nếu tất cả cập nhật thành công
    } catch (error) {
      if (transaction) {
        await transaction.rollback(); // Rollback transaction nếu có lỗi
      }
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },

  deleteUniversity: async (universityId) => {
    try {
      const university = await University.findByPk(universityId);
      await university.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  },
};
