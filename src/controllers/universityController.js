const universityService = require('../services/universityService');
const dbConnection = require('../database/dbConnection');
const responseHelper = require('../helpers/responseHelper');

module.exports = {
  createUniversity: async (req, res) => {
    // try {
      // const userId = parseInt(req.user.id);
      const university = req.body;

      if (!university.name || !university.image || !university.address || !university.province || !university.email || !university.phone || !university.description || !university.url || !university.rank) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const createNew = await universityService.createNew(university);
      if (createNew) {
        return responseHelper.sendResponse.SUCCESS(res, createNew, 'Bạn đã tạo mới câu hỏi thành công');
      }
      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    // } catch (error) {
    //   responseHelper.sendResponse.SERVER_ERROR(res, null);
    // }
  },

  getAll: async (req, res) => {
    try {
      let size = Number.isInteger(req.query.size) ? parseInt(req.query.size) : 10;
      let page = Number.isInteger(req.query.page) ? parseInt(req.query.page) : 1;

      const listUniversity = await universityService.getAll(page, size); // Gọi chức năng từ service
      if (listUniversity) {
        return responseHelper.sendResponse.SUCCESS(res, listUniversity);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  getUniversityById: async (req, res) => {
    try {
      const universityId = parseInt(req.params.id);
      const universityData = await universityService.getUniversityById(universityId); // Gọi chức năng từ service
      if (universityData) {
        return responseHelper.sendResponse.SUCCESS(res, universityData);
      }

      return responseHelper.sendResponse.NOT_FOUND(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  updateUniversity: async (req, res) => {
    try {
      const questionId = parseInt(req.params.id);
      const mbti = req.body;

      if (isNaN(questionId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid questionId as a parameter');
      }

      if (!mbti.question_group_id || !mbti.question || !mbti.answers || !Array.isArray(mbti.answers) || mbti.answers.length === 0) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const updateQuestion = await mbtiService.updateQuestion(questionId, mbti);
      if (updateQuestion) {
        return responseHelper.sendResponse.SUCCESS(res, null, 'Cập nhật thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Cập nhật thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  deleteOneUniversity: async (req, res) => {
    try {
      const questionId = parseInt(req.params.id);
      if (isNaN(questionId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid questionId as a parameter');
      }

      const deleteQuestion = await mbtiService.deleteQuestion(questionId);
      if (deleteQuestion) {
        return responseHelper.sendResponse.SUCCESS(res, null, "Thực hiện xóa thành công");
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, "Thực hiện xóa thất bại");
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
};
