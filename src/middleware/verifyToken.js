const jwt = require("jsonwebtoken");
const responseHelper = require("../helpers/responseHelper");

const middleware = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;
    // console.log("header: ", req.headers.authorization)
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return responseHelper.sendResponse.FORBIDDEN(res, null, "Token is not valid");
        }
        if (isNaN(user.id)) {
          return responseHelper.sendResponse.FORBIDDEN(res, null, "Token is not valid");
        }

        req.user = user;
        next();
      });
    } else {
      return responseHelper.sendResponse.UNAUTHORIZED(res, null, "You're not authenticated");
    }
  },
};

module.exports = middleware;
