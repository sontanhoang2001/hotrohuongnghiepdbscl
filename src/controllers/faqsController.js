const postsOrganizationService = require('../services/postsOrganizationService');

const responseHelper = require('../helpers/responseHelper');

module.exports = {
  createNew: async (req, res) => {
    try {
      const userId = parseInt(req.user.id);
      const posts = req.body;

      if (isNaN(posts.organizationId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid organizationId as a parameter');
      }

      if (!posts.question || !posts.answer || !posts.content || !posts.thumbnail || !posts.content || !posts.status || !posts.displayDate || !posts.postsCategoryId) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const postsNewData = {...posts, userId};

      const createNew = await postsOrganizationService.createNew(postsNewData);
      if (createNew) {
        return responseHelper.sendResponse.SUCCESS(res, createNew, 'Bạn đã tạo bài viết thành công');
      }
      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  getAll: async (req, res) => {
    try {
      let organizationId = req.query.organizationId && parseInt(req.query.organizationId);

      let page = parseInt(req.query.page) || 1;
      let size = parseInt(req.query.size) || 10;
      let search = req.query.search;
      let postsCategoryId = req.query.category && parseInt(req.query.category);
      
      let deleted = req.query.deleted;

      const posts = await postsOrganizationService.getAll(organizationId, page, size, search, postsCategoryId, deleted); // Gọi chức năng từ service
      if (posts) {
        return responseHelper.sendResponse.SUCCESS(res, posts);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  getById: async (req, res) => {
    try {
      let organizationId = req.query.organizationId && parseInt(req.query.organizationId);
      const postsId = parseInt(req.params.id);
      const posts = await postsOrganizationService.getById(postsId, organizationId); // Gọi chức năng từ service
      if (posts) {
        return responseHelper.sendResponse.SUCCESS(res, posts);
      }

      return responseHelper.sendResponse.NOT_FOUND(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  update: async (req, res) => {
    try {
      const postsId = parseInt(req.params.id);
      const posts = req.body;
      const  organizationId = posts.organizationId && parseInt(posts.organizationId);
      
      if (isNaN(posts.organizationId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid organizationId as a parameter');
      }

      if (isNaN(postsId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid postsId as a parameter');
      }

      if (!posts.title || !posts.thumbnail || !posts.content) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const updatePosts = await postsOrganizationService.update(organizationId, postsId, posts);
      if (updatePosts) {
        return responseHelper.sendResponse.SUCCESS(res, updatePosts, 'Cập nhật bài viết thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Cập nhật bài viết thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  deleteOne: async (req, res) => {
    try {
      const postsId = parseInt(req.params.id);
      const organizationId = req.query.organizationId && parseInt(req.query.organizationId);

      if (isNaN(postsId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid postsId as a parameter');
      }

      const deletePosts = await postsOrganizationService.delete(organizationId, postsId);
      if (deletePosts) {
        return responseHelper.sendResponse.SUCCESS(res, deletePosts, "Thực hiện xóa thành công");
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, "Thực hiện xóa thất bại");
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },


  restoreOne: async (req, res) => {
    try {
      const postsId = parseInt(req.params.id);
      if (isNaN(postsId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid postsId as a parameter');
      }

      const deletePosts = await postsOrganizationService.restore(postsId);
      if (deletePosts) {
        return responseHelper.sendResponse.SUCCESS(res, deletePosts, "Khôi phục bài viết thành công");
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, "Khôi phục bài viết thất bại");
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  }

};
