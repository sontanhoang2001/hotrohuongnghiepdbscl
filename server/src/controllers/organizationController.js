const organizationService = require('../services/organizationService');
const responseHelper = require('../helpers/responseHelper');

module.exports = {
  createOrganization: async (req, res) => {
    // try {
    // const userId = parseInt(req.user.id);
    const organization = req.body;

    if (
      !organization.organizationTypeId ||
      !organization.name ||
      !organization.image ||
      !organization.address ||
      !organization.province ||
      !organization.email ||
      !organization.phone ||
      !organization.description ||
      !organization.url ||
      !organization.rank
    ) {
      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
    }

    const createNew = await organizationService.createNew(organization);
    if (createNew) {
      return responseHelper.sendResponse.SUCCESS(res, createNew, 'Bạn đã tạo tổ chức thành công');
    }
    return responseHelper.sendResponse.BAD_REQUEST(res, null);
    // } catch (error) {
    //   responseHelper.sendResponse.SERVER_ERROR(res, null);
    // }
  },

  getAll: async (req, res) => {
    // try {
      let page = parseInt(req.query.page) || 1;
      let size = parseInt(req.query.size) || 10;
      let search = req.query.search;

      const listUniversity = await organizationService.getAll(page, size, search); // Gọi chức năng từ service
      if (listUniversity) {
        return responseHelper.sendResponse.SUCCESS(res, listUniversity);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    // } catch (error) {
    //   responseHelper.sendResponse.SERVER_ERROR(res, null);
    // }
  },

  getOrganizationById: async (req, res) => {
    try {
      const universityId = parseInt(req.params.id);
      const universityData = await organizationService.getUniversityById(universityId); // Gọi chức năng từ service
      if (universityData) {
        return responseHelper.sendResponse.SUCCESS(res, universityData);
      }

      return responseHelper.sendResponse.NOT_FOUND(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  updateOrganization: async (req, res) => {
    try {
      const universityId = parseInt(req.params.id);
      const university = req.body;

      if (isNaN(universityId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid universityId as a parameter');
      }

      if (
        !university.name ||
        !university.image ||
        !university.address ||
        !university.province ||
        !university.email ||
        !university.phone ||
        !university.description ||
        !university.url ||
        !university.rank
      ) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const updateQuestion = await organizationService.updateUniversity(universityId, university);
      console.log('updateQuestion', updateQuestion);
      if (updateQuestion) {
        return responseHelper.sendResponse.SUCCESS(res, null, 'Cập nhật thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Cập nhật thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  deleteOneOrganization: async (req, res) => {
    try {
    const universityId = parseInt(req.params.id);

    if (isNaN(universityId)) {
      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid universityId as a parameter');
    }

    const deleteQuestion = await organizationService.deleteUniversity(universityId);
    if (deleteQuestion) {
      return responseHelper.sendResponse.SUCCESS(res, null, 'Thực hiện xóa thành công');
    }
    return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Thực hiện xóa thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
};