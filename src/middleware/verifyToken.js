const jwt = require('jsonwebtoken');
const responseHelper = require('../helpers/responseHelper');
const Roles = require('../config/role.js');
const organizationService = require('../services/organizationService');

const middleware = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;
    // console.log('header: ', req.headers.authorization);
    if (token) {
      const accessToken = token.split(' ')[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return responseHelper.sendResponse.FORBIDDEN(res, null, 'Token is not valid');
        }

        if (isNaN(user.id) || isNaN(user.roleId)) {
          return responseHelper.sendResponse.FORBIDDEN(res, null, 'Token is not valid');
        }

        req.user = user;
        next();
      });
    } else {
      return responseHelper.sendResponse.UNAUTHORIZED(res, null, "You're not authenticated");
    }
  },
  checkRole(allowedRoles) {
    return (req, res, next) => {
      const userRole = req.user.roleId;
      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        return responseHelper.sendResponse.UNAUTHORIZED(res, null);
      }
    };
  },
  checkUserBelongtoOrganization() {
    return async (req, res, next) => {
      const userId = req.user.id;

      const organizationReq = (req) => {
        if (req.query.organizationId) {
          return parseInt(req.query.organizationId);
        } else if (req.body.organizationId) {
          return parseInt(req.body.organizationId);
        }
        return NaN;
      };
      const organizationId = organizationReq(req);

      if (isNaN(organizationId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter a valid organizationId as a parameter');
      }

      // Check user có thuộc tổ chức ko ?
      const checkUserResult = await organizationService.checkUserBelongtoOrganization(userId, organizationId);
      if (checkUserResult) {
        next();
      } else {
        // return responseHelper.sendResponse.UNAUTHORIZED(res, null, "You're not authenticated");
        return responseHelper.sendResponse.UNAUTHORIZED(res, null);
      }
    };
  },
};

module.exports = middleware;
