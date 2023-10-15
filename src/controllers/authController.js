const User = require("../models").User;
const jwt = require("jsonwebtoken");

const authService = require("../services/authService");
const responseHelper = require("../helpers/responseHelper");
const generateToken = require("../helpers/generateToken");
const bcrypt = require("bcrypt");


let refreshTokens = [];

module.exports = {
  registerUser: async (req, res) => {
      try {
        const user = req.body;
        if (!user.username || !user.password || !user.fullname) {
          return res.json({
            ErrorCode: 204,
            Message: "Fields cannot be empty",
          });
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(user.password, salt);
        const userObj = [
          (user.account_type = 0),
          user.username,
          (user.password = hashed),
          user.fullname,
          (user.role = 5),
        ];
        // Create new user
        let sqlQuery =
          "INSERT INTO users (account_type, username, password, fullname, role) VALUES ( ?,?,?,?,?)";
        dbConnection.query(sqlQuery, userObj, (err, data) => {
          if (err) throw err;
          res.status(201).json("User created with id: " + data.insertId);
        });
      } catch (error) {
        return res.json({
          ErrorCode: 500,
          Message: "",
        });
      }

    //   try {
    //     const user = req.body;
    //     if (!user.username || !user.password || !user.fullname) {
    //       return res.json({
    //         ErrorCode: 204,
    //         Message: "Fields cannot be empty",
    //       });
    //     }
    //     const salt = await bcrypt.genSalt(10);
    //     const hashed = await bcrypt.hash(user.password, salt);
    //     const userObj = [
    //       (user.account_type = 0),
    //       user.username,
    //       (user.password = hashed),
    //       user.fullname,
    //       (user.role = 5),
    //     ];
    //     // Create new user
    //     let sqlQuery =
    //       "INSERT INTO users (account_type, username, password, fullname, role) VALUES ( ?,?,?,?,?)";
    //     dbConnection.query(sqlQuery, userObj, (err, data) => {
    //       if (err) throw err;
    //       res.status(201).json("User created with id: " + data.insertId);
    //     });
    //   } catch (error) {
    //     return res.json({
    //       ErrorCode: 500,
    //       Message: "",
    //     });
    //   }
  },

  login: async (req, res) => {
    try {
      const user = req.body;
      const username = user.username;

      if (!user.username || !user.password) {
        responseHelper.sendResponse(res, 200, null, "Fields cannot be empty");
      }

      const result = await authService.loginUser(username);

      // Đúng 'username'
      if (result) {
        const validPassword = await bcrypt.compare(
          user.password,
          result.password
        );

        // Đúng 'password'
        if (validPassword) {
          const { password, ...userData } = result;
          const accessToken = generateToken.generateAccessToken(userData);
          const refreshToken = generateToken.generateRefreshToken(userData);
          refreshTokens.push(refreshToken);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true, secure: false, path: "/", sameSite: "strict"
          })
          responseHelper.sendResponse(res, 200,{ userData, accessToken}, "Đăng nhập thành công!");
          return;
        }
      }

      responseHelper.sendResponse(res, 401, null, "Tên đăng nhập hoặc mật khẩu không đúng!");
    } catch (error) {
      responseHelper.sendResponse(res, 500, null);
    }
  },
  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return responseHelper.sendResponse(res, 401, null, "You're not authenticated");
    if(!refreshTokens.includes(refreshToken)) {
      return responseHelper.sendResponse(res, 403, null,"Refresh token is not valid");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if(err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //Create new accessToken, refresh token
      const newAccessToken = generateToken.generateAccessToken(user);
      const newRefreshToken = generateToken.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true, secure: false, path: "/", sameSite: "strict"
      })
      responseHelper.sendResponse(res, 200, {accessToken: newAccessToken});
    })
  },

  // LOG OUT
  userLogout : (req, res) => {
    res.clearCookie("refreshToken");
    // Xóa refreshToken đã tồn tại trong cookie
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);

    // Bên client phải xóa "access Token" chứa trong redux
  }
};
