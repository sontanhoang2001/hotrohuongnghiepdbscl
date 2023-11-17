const jwt = require('jsonwebtoken');
const responseHelper = require('../helpers/responseHelper');
const Roles = require('../config/role.js');

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

        if (user.roleId == Roles.ORGANIZATION) {
          if (isNaN(user.organizationId)) {
            return responseHelper.sendResponse.FORBIDDEN(res, null, 'Token is not valid');
          }
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
        return responseHelper.sendResponse.UNAUTHORIZED(res, null, "You're not authenticated");
      }
    };
  },
};

module.exports = middleware;
