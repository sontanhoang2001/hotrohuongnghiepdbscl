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
      where.organizationId = { [Op.eq]: organizationId };

      if (deleted) {
        where.deletedAt = { [Op.not]: null };
      }

      if (search) {
        where.title = { [Op.like]: `%${search}%` };
      }

      // Tính offset
      const offset = (page - 1) * size;

      const { rows, count } = await FAQs.findAndCountAll({
        where,
        paranoid: false,
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
  getById: async (postsId, organizationId) => {
    try {
      const postsOrganization = await PostsOrganization.findOne({
        where: {
          id: postsId,
          organizationId: organizationId,
        },
        attributes: ['id', 'title', 'thumbnail', 'content', 'status', 'displayDate'],
        include: [
          {
            model: User,
            attributes: ['id'],
          },
          {
            model: PostsCategory,
            attributes: ['id', 'name', 'description'],
          },
        ],
      });

      if (postsOrganization instanceof PostsOrganization) {
        return postsOrganization.get();
      }

      return postsOrganization;
    } catch (error) {
      throw error;
    }
  },
  update: async (organizationId, postsId, payload) => {
    try {
      const posts = await PostsOrganization.findOne({
        where: {
          id: postsId,
          organizationId: organizationId,
        }
      });

      if (!posts) {
        return false;
      }

      await posts.update(payload);

      return posts;
    } catch (error) {
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },

  delete: async (organizationId, postsId) => {
    try {
      // Lấy thông tin bài viết cần xóa
      const posts = await PostsOrganization.findOne({
        where: {
          id: postsId,
          organizationId: organizationId,
        }
      });

      // Xóa bài viết
      const numberOfAffectedRows = await posts.destroy();

      if (numberOfAffectedRows === 0) {
        return false;
      }

      // Trả về dữ liệu bài viết vừa xóa cho client
      return posts;
    } catch (error) {
      throw error;
    }
  },

  restore: async (postsId) => {
    try {
      // Lấy thông tin bài viết cần xóa
      const post = await PostsOrganization.findByPk(postsId, {
        paranoid: false
      });

      // Xóa bài viết
      const numberOfAffectedRows = await PostsOrganization.restore({
        where: { id: postsId },
      });

      if (numberOfAffectedRows === 0) {
        return false;
      }

      // Trả về dữ liệu bài viết vừa xóa cho client
      return post;
    } catch (error) {
      throw error;
    }
  },
  
};
