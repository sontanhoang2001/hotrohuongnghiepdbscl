const majorMbtiService = require('../services/majorMbtiService');

const responseHelper = require('../helpers/responseHelper');

module.exports = {
  createNewMajorMbti: async (req, res) => {
    try {
      // const userId = parseInt(req.user.id);
      const majorMBTI = req.body;

      if (!majorMBTI.majorName || !majorMBTI.link || !majorMBTI.organizationId || !majorMBTI.mbtiId) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const createNew = await majorMbtiService.createNewMajorMbti(majorMBTI);
      if (createNew) {
        return responseHelper.sendResponse.SUCCESS(res, createNew, 'Bạn đã tạo mới ngành nghề cho MBTI thành công');
      }
      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  getAllMajorMbti: async (req, res) => {
    try {
      let page = parseInt(req.query.page) || 1;
      let size = parseInt(req.query.size) || 10;
      let search = req.query.search;
      let deleted = req.query.deleted;
      let organizationId = req.query.organizationId;
      let mbtiId = req.query.mbtiId;

      const mbti = await majorMbtiService.getAllMajorMbti(page, size, search, deleted, organizationId, mbtiId); // Gọi chức năng từ service
      if (mbti) {
        return responseHelper.sendResponse.SUCCESS(res, mbti);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  getMajorMbtiById: async (req, res) => {
    try {
      const majorMBTI_Id = parseInt(req.params.id);
      const majorMBTI = await majorMbtiService.getMajorMbtById(majorMBTI_Id); // Gọi chức năng từ service
      if (majorMBTI) {
        return responseHelper.sendResponse.SUCCESS(res, majorMBTI);
      }

      return responseHelper.sendResponse.NOT_FOUND(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  updateMajorMbti: async (req, res) => {
    try {
      const majorMBTI_Id = parseInt(req.params.id);
      const majorMBTI = req.body;

      if (isNaN(majorMBTI_Id)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid majorMBTI Id as a parameter');
      }

      if (!majorMBTI.majorName || !majorMBTI.link || !majorMBTI.organizationId || !majorMBTI.mbtiId) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const UpdateMajorMBTI = await majorMbtiService.updateMajorMbti(majorMBTI_Id, majorMBTI);
      if (UpdateMajorMBTI) {
        return responseHelper.sendResponse.SUCCESS(res, null, 'Cập nhật nghành nghề cho MBTI thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Cập nhật nghành nghề cho MBTI thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  deleteOneMajorMbti: async (req, res) => {
    try {
      const majorMBTI_Id = parseInt(req.params.id);
      if (isNaN(majorMBTI_Id)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid majorMBTI Id as a parameter');
      }

      const deleteMajorMBTI = await majorMbtiService.deleteMajorMbti(majorMBTI_Id);
      if (deleteMajorMBTI) {
        return responseHelper.sendResponse.SUCCESS(res, null, 'Thực hiện xóa nghành nghề cho MBTI thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Thực hiện xóa nghành nghề cho MBTI thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
      throw error;

    }
  },

  restoreOneMajorMbti: async (req, res) => {
    try {
      const majorMBTI_Id = parseInt(req.params.id);
      if (isNaN(majorMBTI_Id)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid majorMBTI Id as a parameter');
      }

      const deleteMajorMBTI = await majorMbtiService.restoreMajorMbti(majorMBTI_Id);
      if (deleteMajorMBTI) {
        return responseHelper.sendResponse.SUCCESS(res, null, 'Khôi phục nghành nghề cho MBTI thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Khôi phục nghành nghề cho MBTI thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
};