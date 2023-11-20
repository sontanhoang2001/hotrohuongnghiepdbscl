const faqsService = require('../services/faqsService');

const responseHelper = require('../helpers/responseHelper');

module.exports = {
  createNewFAQS: async (req, res) => {
    try {
      // const userId = parseInt(req.user.id);
      const faqs = req.body;

      // "question": "Cơ hội việc làm sau khi ra trường thế nào ạ ?",
      // "answer": "Sau khi tốt nghiệp trường sẽ đảm bảo 100% việc làm cho các bạn sinh vi",
      // "userId": 3,
      // "organizationId": 1

      if (!faqs.question || !faqs.answer) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const createNew = await faqsService.createNew(faqs);
      if (createNew) {
        return responseHelper.sendResponse.SUCCESS(res, createNew, 'Bạn đã tạo mới faqs thành công');
      }
      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Bạn đã tạo mới faqs thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  getAllFAQS: async (req, res) => {
    try {
      let page = parseInt(req.query.page) || 1;
      let size = parseInt(req.query.size) || 10;
      let search = req.query.search;

      const faqsList = await faqsService.getAll(page, size, search); // Gọi chức năng từ service
      if (faqsList) {
        return responseHelper.sendResponse.SUCCESS(res, faqsList);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  getFAQSById: async (req, res) => {
    try {
      const questionId = parseInt(req.params.id);
      const faqs = await faqsService.getById(questionId); // Gọi chức năng từ service
      if (faqs) {
        return responseHelper.sendResponse.SUCCESS(res, faqs);
      }

      return responseHelper.sendResponse.NOT_FOUND(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  updateFAQS: async (req, res) => {
    try {
      const questionId = parseInt(req.params.id);
      const mbti = req.body;

      if (isNaN(questionId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid questionId as a parameter');
      }

      if (!mbti.question_group_id || !mbti.question || !mbti.answers || !Array.isArray(mbti.answers) || mbti.answers.length === 0) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const updateFAQS = await faqsService.update(questionId, mbti);
      if (updateFAQS) {
        return responseHelper.sendResponse.SUCCESS(res, null, 'Cập nhật thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Cập nhật thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  deleteOneFAQS: async (req, res) => {
    try {
      const questionId = parseInt(req.params.id);
      if (isNaN(questionId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid questionId as a parameter');
      }

      const deleteQuestion = await faqsService.deleteQuestion(questionId);
      if (deleteQuestion) {
        return responseHelper.sendResponse.SUCCESS(res, null, "Thực hiện xóa thành công");
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, "Thực hiện xóa thất bại");
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  }

};
