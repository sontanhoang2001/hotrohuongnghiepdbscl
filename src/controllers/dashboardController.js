const dashboardService = require('../services/dashboardService');

const responseHelper = require('../helpers/responseHelper');

module.exports = {

  countAll: async (req, res) => {
    try {
      const dashboard = await dashboardService.getAll(); // Gọi chức năng từ service
      if (dashboard) {
        return responseHelper.sendResponse.SUCCESS(res, dashboard);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      throw error;
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

};
