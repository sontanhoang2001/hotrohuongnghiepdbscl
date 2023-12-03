const Question = require('../models').Question;
const Answer = require('../models').Answer;
const QuestionGroup = require('../models').QuestionGroup;
const MBTI = require('../models').MBTI;
const MajorMBTI = require('../models').MajorMBTI;
const Organization = require('../models').Organization;

const sequelize = require('../database/connection_database');
const { Op } = require('sequelize');

module.exports = {
  createNewMajorMbti: async (payload) => {
    try {
      // Tạo mới ngành nghề cho MBTI
      const majorMBTI = await MajorMBTI.create(payload);
      return majorMBTI;
    } catch (error) {
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },
  getAllMajorMbti: async (page, size, search, deleted, organizationId, mbtiId) => {
    try {
      let order = [['createdAt', 'DESC']];

      const where = {};
      if (search) {
        where.majorName = { [Op.like]: `%${search}%` };
      }

      if (organizationId) {
        where.organizationId = { [Op.eq]: organizationId };
      }

      if (mbtiId) {
        where.mbtiId = { [Op.eq]: mbtiId };
      }

      if (deleted) {
        where.deletedAt = { [Op.not]: null };
      }

      // Tính offset
      const offset = (page - 1) * size;

      const { count, rows } = await MajorMBTI.findAndCountAll({
        order,
        where,
        paranoid: false,
        offset,
        limit: size,
        attributes: ['id', 'majorName', 'link', 'organizationId', 'mbtiId', 'deletedAt'],
        include: [
          {
            model: Organization,
            attributes: ['id', 'name'],
            paranoid: false,
          },
          {
            model: MBTI,
            attributes: ['id', 'name', 'description', 'image'],
            paranoid: false,
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
  getMajorMbtById: async (majorMBTI_Id) => {
    try {
      const majorMBTI = await MajorMBTI.findByPk(majorMBTI_Id, {
        paranoid: false,
        attributes: ['id', 'majorName', 'link', 'organizationId', 'mbtiId', 'deletedAt'],
        include: [
          {
            model: Organization,
            attributes: ['id', 'name'],
            paranoid: false,
          },
          {
            model: MBTI,
            attributes: ['id', 'name', 'description', 'image'],
            paranoid: false,
          },
        ],
      });

      if (majorMBTI instanceof MajorMBTI) {
        return majorMBTI.get();
      }

      return majorMBTI;
    } catch (error) {
      throw error;
    }
  },
  updateMajorMbti: async (majorMBTI_Id, payload) => {
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

  deleteMajorMbti: async (majorMBTI_Id) => {
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

  restoreMajorMbti: async (majorMBTI_Id) => {
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
