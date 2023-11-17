const postsOrganizationService = require('../services/postsOrganizationService');

const responseHelper = require('../helpers/responseHelper');

module.exports = {
  createNewPosts: async (req, res) => {
    try {
      const userId = parseInt(req.user.id);
      const organizationId = parseInt(req.user.organizationId);

      const posts = req.body;

      if (!posts.title || !posts.thumbnail || !posts.content || !posts.thumbnail || !posts.content || !posts.status || !posts.displayDate || !posts.postsCategoryId) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const postsNewData = {...posts, authorId : userId, organizationId};
      const createNew = await postsOrganizationService.createNew(postsNewData);
      if (createNew) {
        return responseHelper.sendResponse.SUCCESS(res, createNew, 'Bạn đã tạo bài viết thành công');
      }
      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  getAllPosts: async (req, res) => {
    // try {
      const organizationId = parseInt(req.user.organizationId);
      let page = parseInt(req.query.page) || 1;
      let size = parseInt(req.query.size) || 10;
      let search = req.query.search;
      let postsCategoryId = req.query.category && parseInt(req.query.category);

      const posts = await postsOrganizationService.getAll(organizationId, page, size, search, postsCategoryId); // Gọi chức năng từ service
      if (posts) {
        return responseHelper.sendResponse.SUCCESS(res, posts);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    // } catch (error) {
    //   responseHelper.sendResponse.SERVER_ERROR(res, null);
    // }
  },

  getPostsById: async (req, res) => {
    try {
      const organizationId = parseInt(req.user.organizationId);
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

  updatePosts: async (req, res) => {
    try {
      const postsId = parseInt(req.params.id);
      const posts = req.body;

      if (isNaN(postsId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid postsId as a parameter');
      }

      if (!posts.title || !posts.thumbnail || !posts.content) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const updatePosts = await postsOrganizationService.update(postsId, posts);
      if (updatePosts) {
        return responseHelper.sendResponse.SUCCESS(res, updatePosts, 'Cập nhật bài viết thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Cập nhật bài viết thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  deleteOnePosts: async (req, res) => {
    try {
      const postsId = parseInt(req.params.id);
      if (isNaN(postsId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid postsId as a parameter');
      }

      const deletePosts = await postsOrganizationService.delete(postsId);
      if (deletePosts) {
        return responseHelper.sendResponse.SUCCESS(res, deletePosts, "Thực hiện xóa thành công");
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, "Thực hiện xóa thất bại");
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

};
