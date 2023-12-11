const User = require('../models').User;
const Organization = require('../models').Organization;
const VerifyOrganization = require('../models').VerifyOrganization;


const sequelize = require('../database/connection_database');
const { Op } = require('sequelize');

module.exports = {
  getAll: async () => {
    try {
      const user = await User.findAndCountAll();

      const university = await Organization.findAndCountAll({
        where: {
          organizationTypeId: {
            [Op.eq]: 1,
          },
        },
      });

      const company = await Organization.findAndCountAll({
        where: {
          organizationTypeId: {
            [Op.eq]: 2,
          },
        },
      });

      const verifyOrganization = await VerifyOrganization.findAndCountAll({
        where: {
          status: {
            [Op.eq]: 2,
          },
        },
        attributes: ['id']
      });
      

      const data = {
        user: user.count,
        university: university.count,
        company: company.count,
        verifyOrganization: verifyOrganization.count
      };

      return data;
    } catch (error) {
      throw error;
    }
  },
};
