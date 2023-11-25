const PostsCategory = require('../models').PostsCategory;

const { Op } = require('sequelize');

module.exports = {
  createNew: async (payload) => {
    try {
      // Tạo mới ngành nghề cho MBTI
      const majorMBTI = await PostsCategory.create(payload);
      return majorMBTI;
    } catch (error) {
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },
  getAll: async (page, size, search, deleted) => {
    try {
      const where = {};
      if (search) {
        where.name = { [Op.like]: `%${search}%` };
      }

      if (deleted) {
        where.deletedAt = { [Op.not]: null };
      }

      // Tính offset
      const offset = (page - 1) * size;

      const { count, rows } = await MajorMBTI.findAndCountAll({
        where,
        paranoid: false,
        offset,
        limit: size,
        attributes: ['id', 'name', 'description', '	createdAt', 'updatedAt	', 'deletedAt'],
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
  getById: async (majorMBTI_Id) => {
    try {
      const majorMBTI = await MajorMBTI.findByPk(majorMBTI_Id, {
        paranoid: false,
        attributes: ['id', 'name', 'description', '	createdAt', 'updatedAt	', 'deletedAt']
      });

      if (majorMBTI instanceof MajorMBTI) {
        return majorMBTI.get();
      }

      return majorMBTI;
    } catch (error) {
      throw error;
    }
  },
  update: async (majorMBTI_Id, payload) => {
    try {
      // Update question
      const [numberOfAffectedRows] = await MajorMBTI.update(payload, {
        where: { id: majorMBTI_Id },
      });

      // Kiểm tra số lượng dòng bị ảnh hưởng bởi câu lệnh update cho câu hỏi
      if (numberOfAffectedRows === 0) {
        return false; // Trả về false nếu không có câu hỏi nào được cập nhật
      }

      return true; // Trả về true nếu tất cả cập nhật thành công
    } catch (error) {
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },

  deleteOne: async (majorMBTI_Id) => {
    try {
      // Destroy question
      const numberOfAffectedRows1 = await MajorMBTI.destroy({
        where: { id: majorMBTI_Id },
      });

      // Kiểm tra số lượng dòng bị ảnh hưởng bởi câu lệnh update cho câu hỏi
      if (numberOfAffectedRows1 === 0) {
        return false; // Trả về false nếu không có câu hỏi nào được cập nhật
      }
     
      return true;
    } catch (error) {
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },

  restoreOne: async (majorMBTI_Id) => {
    try {

      // Destroy question
      const numberOfAffectedRows1 = await MajorMBTI.restore({
        where: { id: majorMBTI_Id },
      });

      // Kiểm tra số lượng dòng bị ảnh hưởng bởi câu lệnh update cho câu hỏi
      if (numberOfAffectedRows1 === 0) {
        return false; // Trả về false nếu không có câu hỏi nào được cập nhật
      }

      return true;
    } catch (error) {
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },
};
