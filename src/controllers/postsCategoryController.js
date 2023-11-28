const postsCategoryService = require('../services/postsCategoryService');

const responseHelper = require('../helpers/responseHelper');

module.exports = {
  createNew: async (req, res) => {
    try {
      // const userId = parseInt(req.user.id);
      const postsCategory = req.body;

      if (!postsCategory.name || !postsCategory.description) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const createNew = await postsCategoryService.createNew(postsCategory);
      if (createNew) {
        return responseHelper.sendResponse.SUCCESS(res, createNew, 'Bạn đã tạo mới thể loại bài viết thành công');
      }
      return responseHelper.sendResponse.BAD_REQUEST(res, 'Bạn đã tạo mới thể loại bài viết thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  getAll: async (req, res) => {
    try {
      let page = parseInt(req.query.page) || 1;
      let size = parseInt(req.query.size) || 10;
      let search = req.query.search;
      let deleted = req.query.deleted;

      const postsCategory = await postsCategoryService.getAll(page, size, search, deleted); // Gọi chức năng từ service
      if (postsCategory) {
        return responseHelper.sendResponse.SUCCESS(res, postsCategory);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  getById: async (req, res) => {
    try {
      const postsCategory_id = parseInt(req.params.id);
      const postsCategory = await postsCategoryService.getById(postsCategory_id); // Gọi chức năng từ service
      if (postsCategory) {
        return responseHelper.sendResponse.SUCCESS(res, postsCategory);
      }

      return responseHelper.sendResponse.NOT_FOUND(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  update: async (req, res) => {
    try {
      const postsCategory_id = parseInt(req.params.id);
      const postsCategory = req.body;

      if (isNaN(postsCategory_id)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid postsCategory Id as a parameter');
      }

      if (!postsCategory.name || !postsCategory.description) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const UpdatepostsCategory = await postsCategoryService.update(postsCategory_id, postsCategory);
      if (UpdatepostsCategory) {
        return responseHelper.sendResponse.SUCCESS(res, null, 'Cập nhật thể loại bài thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Cập nhật thể loại bài thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  deleteOne: async (req, res) => {
    try {
      const majorMBTI_Id = parseInt(req.params.id);
      if (isNaN(majorMBTI_Id)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid majorMBTI Id as a parameter');
      }

      const deleteMajorMBTI = await postsCategoryService.deleteOne(majorMBTI_Id);
      if (deleteMajorMBTI) {
        return responseHelper.sendResponse.SUCCESS(res, null, 'Thực hiện xóa thể loại bài thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Thực hiện xóa thể loại bài thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  restoreOne: async (req, res) => {
    try {
      const majorMBTI_Id = parseInt(req.params.id);
      if (isNaN(majorMBTI_Id)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid majorMBTI Id as a parameter');
      }

      const deleteMajorMBTI = await postsCategoryService.restoreOne(majorMBTI_Id);
      if (deleteMajorMBTI) {
        return responseHelper.sendResponse.SUCCESS(res, null, 'Khôi phục thể loại bài thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Khôi phục thể loại bài thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
};
