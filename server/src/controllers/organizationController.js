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
    // try {
    const organizationId = parseInt(req.params.id);
    const organization = req.body;

    if (isNaN(organizationId)) {
      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid organization as a parameter');
    }

    if (
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

    const updateOrganization = await organizationService.updateOrganization(organizationId, organization);
    if (updateOrganization) {
      return responseHelper.sendResponse.SUCCESS(res, null, 'Cập nhật thành công');
    }

    return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Cập nhật thất bại');
    // } catch (error) {
    //   responseHelper.sendResponse.SERVER_ERROR(res, null);
    // }
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

  getAllOrganizationType: async (req, res) => {
    try {
      const listOrganizationType = await organizationService.getAllOrganizationType();
      if (listOrganizationType) {
        return responseHelper.sendResponse.SUCCESS(res, listOrganizationType);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  reqToVerifyOrganization: async (req, res) => {
    try {
      const userId = req.user.id;
      const fileAttached = req.body.fileAttached;

      if (!fileAttached) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const updateOrganization = await organizationService.reqToVerifyOrganization(userId, fileAttached);
      if (updateOrganization) {
        return responseHelper.sendResponse.SUCCESS(res, null, 'Bạn đã nộp hồ sơ tổ chức thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Bạn đã nộp hồ sơ tổ chức thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  updateStatusVerifyOrganization: async (req, res) => {
    try {
      const verifyOrganizationId = parseInt(req.body.verifyOrganizationId);
      const status = parseInt(req.body.status);

      if (Number.isNaN(verifyOrganizationId) || Number.isNaN(status)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const statusVerifyOrganization = await organizationService.updateStatusVerifyOrganization(verifyOrganizationId, status);
      if (statusVerifyOrganization) {
        return responseHelper.sendResponse.SUCCESS(res, statusVerifyOrganization, 'Đã cập nhật trạng thái tổ chức thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Đã cập nhật trạng thái tổ chức thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
};
