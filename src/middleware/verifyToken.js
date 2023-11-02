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
          responseHelper.sendResponse(res, 403, null, "Token is not valid");
          return;
        }
        req.user = user;
        next();
      });
    } else {
      responseHelper.sendResponse(res, 401, null, "You're not authenticated");
    }
  },
};

module.exports = middleware;
