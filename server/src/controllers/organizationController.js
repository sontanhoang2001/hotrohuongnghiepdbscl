const organizationService = require('../services/organizationService');
const responseHelper = require('../helpers/responseHelper');
const { createTransporter } = require('../helpers/mailer');

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
    let organizationTypeId = req.query.organizationType;
    let status = parseInt(req.query.status);

    const listUniversity = await organizationService.getAll(page, size, search, organizationTypeId, status); // Gọi chức năng từ service
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
      const organizationId = parseInt(req.params.id);
      const organizationData = await organizationService.getOrganizationById(organizationId); // Gọi chức năng từ service
      if (organizationData) {
        return responseHelper.sendResponse.SUCCESS(res, organizationData);
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
      const organizationId = parseInt(req.body.organizationId);
      const status = parseInt(req.body.status);

      if (Number.isNaN(organizationId) || Number.isNaN(status)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a full and valid parameter');
      }

      const verifyOrganization = await organizationService.updateStatusVerifyOrganization(organizationId, status);
      if (verifyOrganization) {
        const sendTo = verifyOrganization.userEmail;
        // Gửi email theo đúng nội dung trạng thái
        const mainContent = verifyOrganization.userEmail == 1
          ? 'Xin chúc mừng. Chúng tôi đã xem xét hồ sơ tổ chức của bạn và ghi nhận tổ chức của bạn là họp lệ với yêu cầu của chúng tôi. Kể từ bây giờ bạn có thể truy cập quyền quản trị tổ chức của bạn.'
          : 'Để thông báo rằng hồ sơ tổ chức của bạn hiện tại chưa đáp ứng yêu cầu của chúng tôi. Bạn vui lòng nhanh chóng hoàn thiện hồ sơ và tiến hành nộp lại hồ sơ. Chúng tôi sẽ xem xét và thông báo đến bạn sớm nhất.';
       
       const icon = verifyOrganization.userEmail == 1 ? "✔" : "❌";
          // send mail with defined transport object
        const transporter = createTransporter();
        const info = await transporter.sendMail({
          from: `"Support Organization 📩" <${sendTo}>`, // sender address
          to: sendTo, // list of receivers
          subject: `Xác nhận trạng thái tổ chức ${icon}`, // Subject line
          text: `Xác nhận trạng thái tổ chức`, // plain text body
          html: `
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Hỗ trợ tư vấn hướng nghiệp ĐH khu vực ĐBSCL</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Cảm ơn bạn đã chọn website Hỗ trợ tư vấn hướng nghiệp ĐH khu vực ĐBSCL.</p>
              <p>Chúng tôi gửi email này! ${mainContent}</p>
              <p>Chúc bạn và tổ chức của bạn sẽ ngày càng phát triển và cùng đồng hành với chung tôi lâu dài.</p>
              <p style="font-size:0.9em;">Phan Hưu Kiệt,<br />Hỗ trợ tư vấn hướng nghiệp ĐH khu vực ĐBSCL</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Hỗ trợ tư vấn hướng nghiệp ĐH khu vực ĐBSCL Inc</p>
                <p>1600 Tòa nhà công nghệ cao</p>
                <p>Xuân Khánh, Ninh Kiều, Cần Thơ</p>
              </div>
            </div>
          </div>
          `, // html body
        });

        // Gửi phản hồi thành công nếu email đã được gửi
        return responseHelper.sendResponse.SUCCESS(res, verifyOrganization, 'Đã cập nhật trạng thái tổ chức thành công');
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Đã cập nhật trạng thái tổ chức thất bại');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  }
};
