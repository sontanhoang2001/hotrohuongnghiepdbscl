const PostsOrganization = require('../models').PostsOrganization;
const PostsCategory = require('../models').PostsCategory;
const User = require('../models').User;

// const sequelize = require('../database/connection_database');
const { Op, where } = require('sequelize');

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
  getAll: async (organizationId, page, size, search, postsCategoryId, deleted) => {
    try {
      const where = {};
      let paranoidBol = true;
      if (organizationId) {
        where.organizationId = { [Op.eq]: organizationId };
        // Trường họp sử dụng public
        // Ngăn không cho lấy rows đã bị xóa
        paranoidBol = false;
      }

      if (deleted) {
        where.deletedAt = { [Op.not]: null };
      }

      if (search) {
        where.title = { [Op.like]: `%${search}%` };
      }

      if (postsCategoryId) {
        where.postsCategoryId = { [Op.eq]: postsCategoryId };
      }

      // Tính offset
      const offset = (page - 1) * size;

      const { rows, count } = await PostsOrganization.findAndCountAll({
        where,
        paranoid: paranoidBol,
        offset,
        limit: size,
        attributes: ['id', 'title', 'thumbnail', 'content', 'status', 'displayDate', 'deletedAt'],
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
      const whereClause = { id: postsId };

      if (organizationId) {
        whereClause.organizationId = organizationId;
      }

      const postsOrganization = await PostsOrganization.findOne({
        where: whereClause,
        paranoid: false,
        attributes: ['id', 'title', 'thumbnail', 'content', 'status', 'displayDate', 'deletedAt'],
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
        },
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
        },
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
        paranoid: false,
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

  getAllPostsCategory: async () => {
    try {
      const postsCategory = await PostsCategory.findAll({
        attributes: ['id', 'name', 'description'],
      });

      return postsCategory;
    } catch (error) {
      throw error;
    }
  },
};
