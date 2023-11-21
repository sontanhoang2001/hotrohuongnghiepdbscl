const FAQsService = require('../services/faqsService');
const organizationService = require('../services/organizationService');

const responseHelper = require('../helpers/responseHelper');

module.exports = {
  createNewFaqs: async (req, res) => {
    try {
      const userId = parseInt(req.user.id);
      const posts = req.body;

      if (isNaN(posts.organizationId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid organizationId as a parameter');
      }

      if (!posts.question || !posts.answer) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const postsNewData = { ...posts, userId };

      const createNew = await FAQsService.createNew(postsNewData);
      if (createNew) {
        return responseHelper.sendResponse.SUCCESS(res, createNew, 'Bạn đã tạo câu hỏi thường gặp thành công');
      }
      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  getAllFaqs: async (req, res) => {
    try {
      let organizationId = req.query.organizationId && parseInt(req.query.organizationId);

      let page = parseInt(req.query.page) || 1;
      let size = parseInt(req.query.size) || 10;
      let search = req.query.search;
      let deleted = req.query.deleted;

      if (isNaN(organizationId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid organizationId as a parameter');
      }

      const listFaqs = await FAQsService.getAll(organizationId, page, size, search, deleted); // Gọi chức năng từ service
      if (listFaqs) {
        return responseHelper.sendResponse.SUCCESS(res, listFaqs);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
      throw error;
    }
  },

  getFaqsById: async (req, res) => {
    try {
      let organizationId = req.query.organizationId && parseInt(req.query.organizationId);
      const FaqsId = parseInt(req.params.id);
      const result = await FAQsService.getById(FaqsId, organizationId); // Gọi chức năng từ service
      if (result) {
        return responseHelper.sendResponse.SUCCESS(res, result);
      }

      return responseHelper.sendResponse.NOT_FOUND(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  updateFaqs: async (req, res) => {
    try {
      const FaqsId = parseInt(req.params.id);
      const faqs = req.body;
      const organizationId = faqs.organizationId && parseInt(faqs.organizationId);

      if (isNaN(faqs.organizationId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid organizationId as a parameter');
      }

      if (isNaN(FaqsId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid FaqsId as a parameter');
      }

      if (!faqs.question || !faqs.answer) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const result = await FAQsService.update(organizationId, FaqsId, faqs);
      if (result) {
        return responseHelper.sendResponse.SUCCESS(res, result, 'Cập nhật bài viết thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Cập nhật bài viết thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  deleteOneFaqs: async (req, res) => {
    try {
      const faqsId = parseInt(req.params.id);
      const organizationId = req.query.organizationId && parseInt(req.query.organizationId);

      if (isNaN(faqsId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid faqsId as a parameter');
      }

      const result = await FAQsService.delete(organizationId, faqsId);
      if (result) {
        return responseHelper.sendResponse.SUCCESS(res, result, 'Thực hiện xóa câu hỏi thường gặp thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Thực hiện xóa câu hỏi thường gặp thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  restoreOneFaqs: async (req, res) => {
    try {
      const faqsId = parseInt(req.params.id);
      if (isNaN(faqsId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid faqsId as a parameter');
      }

      const result = await FAQsService.restore(faqsId);
      if (result) {
        return responseHelper.sendResponse.SUCCESS(res, result, 'Khôi phục câu hỏi thường gặp thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Khôi phục câu hỏi thường gặp thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
};
