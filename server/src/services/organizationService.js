const Organization = require('../models').Organization;
const OrganizationDetail = require('../models').OrganizationDetail;
const VerifyOrganization = require('../models').VerifyOrganization;
const OrganizationType = require('../models').OrganizationType;
const User = require('../models').User;

const { Op } = require('sequelize');
const sequelize = require('../database/connection_database');

module.exports = {
  createNew: async (payload) => {
    let transaction;
    try {
      const organizationDetailPayload = {
        image: payload.image,
        address: payload.address,
        province: payload.province,
        email: payload.email,
        phone: payload.phone,
        lat: payload.lat,
        long: payload.long,
        description: payload.description,
        url: payload.url,
        rank: payload.rank,
      };

      transaction = await sequelize.transaction();
      // Tạo mới verify_organization
      const verifyOrganization = await VerifyOrganization.create({ status: 0 }, { transaction });
      const verifyOrganizationId = verifyOrganization?.dataValues.id;

      console.log('verifyOrganizationId', verifyOrganizationId);

      // Tạo mới organization
      const organizationPayload = {
        name: payload.name,
        userId: payload.userId,
        organizationTypeId: payload.organizationTypeId,
        verifyOrganizationId: verifyOrganizationId,
      };
      const organization = await Organization.create(organizationPayload, { transaction });
      const organizationId = organization?.dataValues.id;

      // Tạo mới organizationDetail
      await OrganizationDetail.create({ ...organizationDetailPayload, organizationId: organizationId }, { transaction });
      await transaction.commit();
      return organization;
    } catch (error) {
      if (transaction) {
        await transaction.rollback(); // Rollback transaction nếu có lỗi
      }
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },
  getAll: async (page, size, search, organizationTypeId, status) => {
    try {
      const where = {};
      if (search) {
        where.name = { [Op.like]: `%${search}%` };
      }

      if (organizationTypeId) {
        where.organizationTypeId = organizationTypeId;
      }

      let whereVerifyOrganization = {};
      if (!isNaN(status)) {
        whereVerifyOrganization = {
          [Op.and]: [{ status: { [Op.eq]: status } }],
        };
      }

      // Tính offset
      const offset = (page - 1) * size;

      const { count, rows } = await Organization.findAndCountAll({
        where,
        offset,
        limit: size,
        attributes: ['id', 'name'],
        include: [
          {
            model: OrganizationDetail,
            attributes: ['id', 'image', 'address', 'province', 'email', 'phone', 'lat', 'long', 'description', 'url', 'rank'],
          },
          {
            model: VerifyOrganization,
            attributes: ['status'],
            where: whereVerifyOrganization,
          },
          {
            model: OrganizationType,
            attributes: ['id', 'name', 'description'],
          },
        ],
      });

      // Chuẩn bị dữ liệu phân trang
      const pagination = {
        total: count,
        page,
        size,
        data: rows,
      };

      return pagination;
    } catch (error) {
      throw error;
    }
  },
  getOrganizationById: async (organizationId) => {
    try {
      const organization = await Organization.findOne({
        where: { id: organizationId },
        attributes: ['id', 'name'],
        include: [
          {
            model: OrganizationDetail,
            attributes: ['id', 'image', 'address', 'province', 'email', 'phone', 'lat', 'long', 'description', 'url', 'rank'],
          },
          {
            model: VerifyOrganization,
            attributes: ['status'],
          },
          {
            model: OrganizationType,
            attributes: ['id', 'name', 'description'],
          },
        ],
      });

      if (organization instanceof Organization) {
        return organization.get();
      }

      return organization;
    } catch (error) {
      throw error;
    }
  },
  updateOrganization: async (organizationId, payload) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // Update question
      const [numberOfAffectedRows1] = await Organization.update(
        { name: payload.name },
        {
          where: { id: organizationId },
          transaction,
        },
      );

      // Kiểm tra số lượng dòng bị ảnh hưởng bởi câu lệnh update cho câu hỏi
      if (numberOfAffectedRows1 === 0) {
        await transaction.rollback();
        return false; // Trả về false nếu không có câu hỏi nào được cập nhật
      }

      const universityDetailPayload = {
        image: payload.image,
        address: payload.address,
        province: payload.province,
        email: payload.email,
        phone: payload.phone,
        lat: payload.phone,
        long: payload.long,
        description: payload.description,
        url: payload.url,
        rank: payload.rank,
      };

      // Update answers
      const [numberOfAffectedRows2] = await OrganizationDetail.update(universityDetailPayload, {
        where: { organizationId: organizationId },
        transaction,
      });

      if (numberOfAffectedRows2 === 0) {
        await transaction.rollback();
        return false; // Trả về false nếu có lỗi khi cập nhật một trong các câu trả lời
      }

      await transaction.commit();
      return true; // Trả về true nếu tất cả cập nhật thành công
    } catch (error) {
      if (transaction) {
        await transaction.rollback(); // Rollback transaction nếu có lỗi
      }
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },

  deleteUniversity: async (universityId) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const numberOfAffectedRows1 = await University.destroy({
        where: { id: universityId },
      });

      if (numberOfAffectedRows1 === 0) {
        await transaction.rollback();
        return false;
      }

      const numberOfAffectedRows2 = await UniversityDetail.destroy({
        where: { universityId: universityId },
      });

      if (numberOfAffectedRows2 === 0) {
        await transaction.rollback();
        return false;
      }
      transaction.commit();
      return true;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },

  getAllOrganizationType: async () => {
    try {
      const listOrganizationType = await OrganizationType.findAll({
        attributes: ['id', 'description'],
      });

      return listOrganizationType;
    } catch (error) {
      throw error;
    }
  },

  reqToVerifyOrganization: async (userId, fileAttached) => {
    try {
      const verifyOrganization = await Organization.findOne({ where: { userId }, attributes: ['verifyOrganizationId'] });
      const verifyOrganizationId = verifyOrganization.dataValues.verifyOrganizationId;

      // Update fileAttached for VerifyOrganization
      const [numberOfAffectedRows1] = await VerifyOrganization.update(
        { fileAttached },
        {
          where: { id: verifyOrganizationId },
        },
      );

      if (numberOfAffectedRows1 === 0) {
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  },

  updateStatusVerifyOrganization: async (organizationId, status) => {
    try {
      // organizationId
      const organization = await Organization.findByPk(organizationId, {
        include: [
          {
            model: User,
            attributes: ['email'],
          },
        ],
      });
      const verifyOrganizationId = organization.dataValues.verifyOrganizationId;

      // Update fileAttached for VerifyOrganization
      const [numberOfAffectedRows1] = await VerifyOrganization.update(
        { status },
        {
          where: { id: verifyOrganizationId },
        },
      );

      if (numberOfAffectedRows1 === 0) {
        return false;
      }

      const result = {
        verifyOrganizationId,
        status,
        userEmail: organization.dataValues.User.dataValues.email,
      };

      return result;
    } catch (error) {
      throw error;
    }
  },

  getAllReqVerifyOrganization: async (page, size, search, organizationTypeId) => {
    try {
      const where = {};
      if (search) {
        where.name = { [Op.like]: `%${search}%` };
      }

      const verify_organization = await VerifyOrganization.findAll({
        where: { status: 0 },
      });

      console.log('verify_organization', verify_organization);

      // Tính offset
      const offset = (page - 1) * size;
      const { count, rows } = await Organization.findAndCountAll({
        where,
        offset,
        limit: size,
        attributes: ['id', 'name'],
        include: [
          {
            model: OrganizationDetail,
            attributes: ['id', 'image', 'address', 'province', 'email', 'phone', 'lat', 'long', 'description', 'url', 'rank'],
          },
          {
            model: VerifyOrganization,
            attributes: ['status'],
          },
        ],
      });

      // Chuẩn bị dữ liệu phân trang
      const pagination = {
        total: count,
        page,
        size,
        data: rows,
      };

      return pagination;
    } catch (error) {
      throw error;
    }
  },
};