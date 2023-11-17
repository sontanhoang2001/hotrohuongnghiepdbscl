const Question = require('../models').Question;
const Answer = require('../models').Answer;
const PostsOrganization = require('../models').PostsOrganization;

const sequelize = require('../database/connection_database');
const { Op } = require('sequelize');

module.exports = {
  createNew: async (payload) => {
    try {
      // Tạo mới bài viết mới
      const postsOrganization = await PostsOrganization.create(payload);

      return postsOrganization;
    } catch (error) {
      throw error;
    }
  },
  getAll: async (page, size, search) => {
    try {
      const where = {};
      if (search) {
        where.title = { [Op.like]: `%${search}%` };
      }

      // Tính offset
      const offset = (page - 1) * size;

      const { rows, count } = await PostsOrganization.findAndCountAll({
        where,
        offset,
        limit: size,
        attributes: ['id', 'title', 'thumbnail', 'content'],
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
  getById: async (postsId) => {
    try {
      const postsOrganization = await PostsOrganization.findByPk(postsId, {
        attributes: ['id', 'title', 'thumbnail', 'content'],
      });

      if (postsOrganization instanceof PostsOrganization) {
        return postsOrganization.get();
      }

      return postsOrganization;
    } catch (error) {
      throw error;
    }
  },
  update: async (postsId, payload) => {
    try {
      const posts = await PostsOrganization.findByPk(postsId);

      if (!posts) {
        return false;
      }
  
      await posts.update(payload);
      
      return posts;
    } catch (error) {
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },

  delete: async (postsId) => {
    try {
      // Lấy thông tin bài viết cần xóa
      const post = await PostsOrganization.findByPk(postsId);
      
      // Xóa bài viết
      const numberOfAffectedRows = await PostsOrganization.destroy({ 
        where: { id: postsId }
      });
      
      if (numberOfAffectedRows === 0) {
        return false; 
      }
  
      // Trả về dữ liệu bài viết vừa xóa cho client
      return post;
  
    } catch (error) {
      throw error;
    }
  }
};
