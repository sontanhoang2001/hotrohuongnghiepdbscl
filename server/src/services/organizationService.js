const Organization = require('../models').Organization;
const OrganizationDetail = require('../models').OrganizationDetail;
const VerifyOrganization = require('../models').VerifyOrganization;
const OrganizationType = require('../models').OrganizationType;
const UserOrganization = require('../models').UserOrganization;
const User = require('../models').User;

const { Op } = require('sequelize');
const sequelize = require('../database/connection_database');

module.exports = {
  createNew: async (userId, payload) => {
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

      // Tạo mới organization
      const organizationPayload = {
        name: payload.name,
        userId: userId,
        organizationTypeId: payload.organizationTypeId,
        verifyOrganizationId: verifyOrganizationId,
      };
      const organization = await Organization.create(organizationPayload, { transaction });
      const organizationId = organization?.dataValues.id;

      // Tạo mới organizationDetail
      await OrganizationDetail.create({ ...organizationDetailPayload, organizationId: organizationId }, { transaction });

      // Tạo mới organizationDetail
      await UserOrganization.create({ OrganizationId : organizationId, UserId : userId }, { transaction });
      await transaction.commit();
      return organization;
    } catch (error) {
      if (transaction) {
        await transaction.rollback(); // Rollback transaction nếu có lỗi
      }
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },
  getAll: async (page, size, search, organizationTypeId, status, deleted) => {
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

      if (deleted) {
        where.deletedAt = { [Op.not]: null };
      }

      // Tính offset
      const offset = (page - 1) * size;

      const { count, rows } = await Organization.findAndCountAll({
        where,
        paranoid: false,
        offset,
        limit: size,
        attributes: ['id', 'name'],
        include: [
          {
            model: OrganizationDetail,
            attributes: ['id', 'image', 'address', 'province', 'email', 'phone', 'lat', 'long', 'description', 'url', 'rank'],
            paranoid: false,
          },
          {
            model: VerifyOrganization,
            attributes: ['status'],
            where: whereVerifyOrganization,
            paranoid: false,
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

  deleteOrganization: async (organizationId) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const organization = await Organization.findByPk(organizationId, {
        raw: true,
      });
      const verifyOrganizationId = organization.verifyOrganizationId;

      const numberOfAffectedRows1 = await Organization.destroy({
        where: { id: organizationId },
      });

      if (numberOfAffectedRows1 === 0) {
        await transaction.rollback();
        return false;
      }

      const numberOfAffectedRows2 = await OrganizationDetail.destroy({
        where: { organizationId: organizationId },
      });

      if (numberOfAffectedRows2 === 0) {
        await transaction.rollback();
        return false;
      }

      const numberOfAffectedRows3 = await VerifyOrganization.destroy({
        where: { id: verifyOrganizationId },
      });

      if (numberOfAffectedRows3 === 0) {
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

  restoreOrganization: async (organizationId) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const organization = await Organization.findByPk(organizationId, {
        raw: true,
        paranoid: false,
      });
      const verifyOrganizationId = organization.verifyOrganizationId;

      const numberOfAffectedRows1 = await Organization.restore({
        where: { id: organizationId },
      });

      if (numberOfAffectedRows1 === 0) {
        await transaction.rollback();
        return false;
      }

      const numberOfAffectedRows2 = await OrganizationDetail.restore({
        where: { organizationId: organizationId },
      });

      if (numberOfAffectedRows2 === 0) {
        await transaction.rollback();
        return false;
      }

      const numberOfAffectedRows3 = await VerifyOrganization.restore({
        where: { id: verifyOrganizationId },
      });

      if (numberOfAffectedRows3 === 0) {
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

  reqToVerifyOrganization: async (userId, organizationId, fileAttached, status) => {
    try {
      const verifyOrganization = await Organization.findByPk(organizationId, { attributes: ['verifyOrganizationId'] });

      const verifyOrganizationId = verifyOrganization.dataValues.verifyOrganizationId;

      // Update fileAttached for VerifyOrganization
      const [numberOfAffectedRows1] = await VerifyOrganization.update(
        { fileAttached, status },
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

  checkUserBelongtoOrganization: async (userId, organizationId) => {
    try {
      const verifyOrganization = await UserOrganization.findOne({ where: { userId, organizationId } });

      return verifyOrganization instanceof UserOrganization;
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
  getOrganizationByUserId: async (userId) => {
    try {
      const userOrganization = await UserOrganization.findByPk(userId, {
        attributes: ['id'],
      });
      if (userOrganization) {
        return { id: userOrganization.dataValues.id };
      } else {
        return { id: null };
      }
    } catch (error) {
      throw error;
    }
  },

  getAllByUser: async (userId, page, size, search) => {
    try {
      const userOrganization = await UserOrganization.findAll({
        where: {
          userId,
        },
        raw: true,
      });

      const organizationIds = userOrganization.map((item) => item['organizationId']);

      const where = {};

      where.id = { [Op.in]: organizationIds };

      if (search) {
        where.name = { [Op.like]: `%${search}%` };
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

  getOneByOrganizationId: async (userId, organizationId) => {
    try {
      const where = {};

      const organization = await Organization.findByPk(organizationId, {
        raw: true,
        nest: true,
        attributes: ['id', 'name'],
        include: [
          {
            where: { id: userId },
            model: User,
            attributes: ['id'],
          },
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

      console.log('organization', organization);
      return organization;
    } catch (error) {
      throw error;
    }
  },
};
