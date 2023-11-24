const mbtiService = require('../services/mbtiService');

const dbConnection = require('../database/dbConnection');
const responseHelper = require('../helpers/responseHelper');

module.exports = {
  createNewQuestion: async (req, res) => {
    try {
      // const userId = parseInt(req.user.id);
      const mbti = req.body;

      if (
        !mbti.question_group_id ||
        !mbti.question ||
        !mbti.answers ||
        !Array.isArray(mbti.answers) ||
        mbti.answers.length === 0
      ) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const createNew = await mbtiService.createNew(mbti);
      if (createNew) {
        return responseHelper.sendResponse.SUCCESS(res, createNew, 'Bạn đã tạo mới câu hỏi thành công');
      }
      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  getAllQuestion: async (req, res) => {
    try {
      let page = parseInt(req.query.page) || 1;
      let size = parseInt(req.query.size) || 10;
      let search = req.query.search;
      let deleted = req.query.deleted;

      const mbti = await mbtiService.getAll(page, size, search, deleted); // Gọi chức năng từ service
      if (mbti) {
        return responseHelper.sendResponse.SUCCESS(res, mbti);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  getQuestionById: async (req, res) => {
    try {
      const questionId = parseInt(req.params.id);
      const mbti = await mbtiService.getMBTIQuestionById(questionId); // Gọi chức năng từ service
      if (mbti) {
        return responseHelper.sendResponse.SUCCESS(res, mbti);
      }

      return responseHelper.sendResponse.NOT_FOUND(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  updateQuestion: async (req, res) => {
    try {
      const questionId = parseInt(req.params.id);
      const mbti = req.body;

      if (isNaN(questionId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid questionId as a parameter');
      }

      if (
        !mbti.question_group_id ||
        !mbti.question ||
        !mbti.answers ||
        !Array.isArray(mbti.answers) ||
        mbti.answers.length === 0
      ) {
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

  deleteOneQuestion: async (req, res) => {
    try {
      const questionId = parseInt(req.params.id);
      if (isNaN(questionId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid questionId as a parameter');
      }

      const deleteQuestion = await mbtiService.deleteQuestion(questionId);
      if (deleteQuestion) {
        return responseHelper.sendResponse.SUCCESS(res, null, 'Thực hiện xóa thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Thực hiện xóa thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  restoreOneQuestion: async (req, res) => {
    try {
      const questionId = parseInt(req.params.id);
      if (isNaN(questionId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid questionId as a parameter');
      }

      const deleteQuestion = await mbtiService.restoreQuestion(questionId);
      if (deleteQuestion) {
        return responseHelper.sendResponse.SUCCESS(res, null, 'Khôi phục câu hỏi thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Khôi phục câu hỏi thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  getAllQuestionGroup: async (req, res) => {
    try {
      const listQuestionGroup = await mbtiService.getAllQuestionGroup(); // Gọi chức năng từ service
      if (listQuestionGroup) {
        return responseHelper.sendResponse.SUCCESS(res, listQuestionGroup);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  getQuestionGroupById: async (req, res) => {
    try {
      const questionGroupId = parseInt(req.params.id);
      const questionGroup = await mbtiService.getQuestionGroupById(questionGroupId); // Gọi chức năng từ service
      if (questionGroup) {
        return responseHelper.sendResponse.SUCCESS(res, questionGroup);
      }

      return responseHelper.sendResponse.NOT_FOUND(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  // Do test MBTI
  newDoTestMBTI: async (req, res) => {
    try {
      const mbti = await mbtiService.newDoTestMBTI();
      if (mbti) {
        return responseHelper.sendResponse.SUCCESS(res, mbti);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  getAllPersonalityGroups: async (req, res) => {
    try {
      const mbti = await mbtiService.getAllPersonalityGroups();
      if (mbti) {
        return responseHelper.sendResponse.SUCCESS(res, mbti);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
      throw error;
    }
  },

  // Do test MBTI
  storeTestHistory: async (req, res) => {
    try {
      const userId = parseInt(req.user.id);
      const mbtiId = req.query.mbtiId && parseInt(req.query.mbtiId);

      if (!mbtiId) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const createTestHistory = await mbtiService.createTestHistory(userId, mbtiId);
      if (createTestHistory) {
        return responseHelper.sendResponse.SUCCESS(res, createTestHistory);
      }
      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  getAllTestHistory: async (req, res) => {
    try {
      let page = parseInt(req.query.page) || 1;
      let size = parseInt(req.query.size) || 10;
      let userId = req.user.id;

      const testHistory = await mbtiService.getAllTestHistory(userId, page, size); // Gọi chức năng từ service
      if (testHistory) {
        return responseHelper.sendResponse.SUCCESS(res, testHistory);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
      throw error;
    }
  },

  getTestHistoryById: async (req, res) => {
    try {
      let userId = req.user.id;
      const testHistoryId = parseInt(req.params.id);
      const testHistory = await mbtiService.getTestHistoryById(userId, testHistoryId); // Gọi chức năng từ service
      if (testHistory) {
        return responseHelper.sendResponse.SUCCESS(res, testHistory);
      }

      return responseHelper.sendResponse.NOT_FOUND(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
};
