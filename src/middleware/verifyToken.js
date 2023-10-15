const jwt = require("jsonwebtoken");
const responseHelper = require("../helpers/responseHelper");

const middleware = {
  //verifyToken
  verifyToken: (req, res, next) => {
    console.log("header: ", req.headers.token)
    const token = req.headers.token;
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
