const Question = require('../models').Question;
const Answer = require('../models').Answer;
const FAQs = require('../models').FAQs;
const PostsCategory = require('../models').PostsCategory;
const User = require('../models').User;


// const sequelize = require('../database/connection_database');
const { Op, where } = require('sequelize');

module.exports = {
  createNew: async (payload) => {
    try {
      // Tạo mới FAQs mới
      const faqs = await FAQs.create(payload);

      return faqs;
    } catch (error) {
      throw error;
    }
  },
  getAll: async (organizationId, page, size, search, deleted) => {
    try {
      const where = {};
      let paranoidBol = true;
      where.organizationId = { [Op.eq]: organizationId };

      if (deleted) {
        where.deletedAt = { [Op.not]: null };
        paranoidBol = false;
      }

      if (search) {
        where[Op.or] = [{ question: { [Op.like]: `%${search}%` } }, { answer: { [Op.like]: `%${search}%` } }];
      }

      // Tính offset
      const offset = (page - 1) * size;

      const { rows, count } = await FAQs.findAndCountAll({
        where,
        paranoid: paranoidBol,
        offset,
        limit: size,
        attributes: ['id', 'question', 'answer', 'createdAt']
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
  getById: async (FaqsId, organizationId) => {
    try {
      const FAQsData = await FAQs.findOne({
        where: {
          id: FaqsId,
          organizationId: organizationId,
        },
        attributes: ['id', 'question', 'answer', 'createdAt']
      });

      if (FAQsData instanceof FAQs) {
        return FAQsData.get();
      }

      return FAQsData;
    } catch (error) {
      throw error;
    }
  },
  update: async (organizationId, faqsId, payload) => {
    try {
      const faqs = await FAQs.findOne({
        where: {
          id: faqsId,
          organizationId: organizationId,
        }
      });

      if (!faqs) {
        return false;
      }

      await faqs.update(payload);

      return faqs;
    } catch (error) {
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },

  delete: async (organizationId, faqsId) => {
    try {
      // Lấy thông tin bài viết cần xóa
      const faqs = await FAQs.findOne({
        where: {
          id: faqsId,
          organizationId: organizationId,
        }
      });

      // Xóa bài viết
      const numberOfAffectedRows = await faqs.destroy();

      if (numberOfAffectedRows === 0) {
        return false;
      }

      // Trả về dữ liệu bài viết vừa xóa cho client
      return faqs;
    } catch (error) {
      throw error;
    }
  },

  restore: async (faqsId) => {
    try {
      // Lấy thông tin bài viết cần xóa
      const faqs = await FAQs.findByPk(faqsId, {
        paranoid: false
      });

      // Xóa bài viết
      const numberOfAffectedRows = await faqs.restore();

      if (numberOfAffectedRows === 0) {
        return false;
      }

      // Trả về dữ liệu bài viết vừa xóa cho client
      return faqs;
    } catch (error) {
      throw error;
    }
  },
  
};
