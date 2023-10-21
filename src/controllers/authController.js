const User = require("../models").User;
const jwt = require("jsonwebtoken");

const authService = require("../services/authService");
const responseHelper = require("../helpers/responseHelper");
const validateHelper = require("../helpers/validateHelper");
const generateToken = require("../helpers/generateToken");
const bcrypt = require("bcrypt");


let refreshTokens = [];

module.exports = {
  registerUser: async (req, res) => {
        try {
          const user = req.body;
          if (!user.email || !user.password || !user.fullname || !user.address || !user.gender) {
            responseHelper.sendResponse.BAD_REQUEST(res, null, "Fields cannot be empty");
            return;
          }

          // Kiểm tra email đúng định dạng
          const checkEmailValid = await validateHelper.validateEmail(user.email);
          if(!checkEmailValid) 
          {
            responseHelper.sendResponse.BAD_REQUEST(res, null, "Email is invalid");
            return;
          }
          // Kiểm tra email có tồn tại
          const checkExistingUserByEmail = await authService.existingUserByEmail(user.email);
          if(checkExistingUserByEmail) 
          {
            responseHelper.sendResponse.CONFLICT(res, null, "Email already exists");
            return;
          }

          // Kiểm tra email đúng định dạng
          if(user.phone && user.phone != "") {
            const checkPhoneValid = await validateHelper.validatePhoneNumber(user.phone);
            if(!checkPhoneValid) 
            {
              responseHelper.sendResponse.BAD_REQUEST(res, null, "Phone is invalid");
              return;
            }
            // Kiểm tra phone có tồn tại
            const checkExistingUserByPhone = await authService.existingUserByPhone(user.phone);
            if(checkExistingUserByPhone) 
            {
              responseHelper.sendResponse.CONFLICT(res, null, "Phone already exists");
              return;
            }
          }

          //Hash password
          const salt = await bcrypt.genSalt(10);
          const hashed = await bcrypt.hash(user.password, salt);

          // Nếu đăng nhập bằng email/phone thì account_type = 0
          const newUser = {
            "account_type": (user.account_type = 0),
            "email" : user.email,
            "phone" : user.phone,
            "password" : (user.password = hashed),
            "fullname" : user.fullname,
            "gender" : user.gender,
            "address" : user.address,
            "status" : 0, // Trạng thái đợi active account
            "role" :(user.role = 5), // Role = 5 là tài khoản người dùng bình thường/student
          }

          // Create new user
          const result = await authService.registerUser(newUser);
          responseHelper.sendResponse.SUCCESS(res, result);
        } catch (error) {
          responseHelper.sendResponse.SERVER_ERROR(res, null);
        }
  },
  requestOTP : async  (req, res) => {
    try {
      
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  login: async (req, res) => {
    try {
      const user = req.body;
      const username = user.username;

      if (!user.username || !user.password) {
        responseHelper.sendResponse.BAD_REQUEST(res, null, "Fields cannot be empty");
      }

      const result = await authService.loginUser(username);

      // Đúng 'username email or phone'
      if (result) {
        const validPassword = await bcrypt.compare(
          user.password,
          result.password
        );

        // Đúng 'password'
        if (validPassword) {
          const { password, ...userData } = result;
          let finalUserData = {};
          if(userData.status == 1) { // Account đã active
            const accessToken = generateToken.generateAccessToken(userData);
            const refreshToken = generateToken.generateRefreshToken(userData);
            refreshTokens.push(refreshToken);
            res.cookie("refreshToken", refreshToken, {
              httpOnly: true, secure: false, path: "/", sameSite: "strict"
            })
            finalUserData = { userData, accessToken};
          } else if(userData.status == 0) { // Account chưa active
            finalUserData = { userData }
          }
          responseHelper.sendResponse.SUCCESS(res, finalUserData, "Bạn đã đăng nhập thành công");
          return;
        }
      }

      responseHelper.sendResponse.UNAUTHORIZED(res, null, "Tên đăng nhập hoặc mật khẩu không đúng!");
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  requestRefreshToken: async (req, res) => {
    try {
      //Take refresh token from user
      const refreshToken = req.cookies.refreshToken;
      if(!refreshToken) return responseHelper.sendResponse.UNAUTHORIZED(res, "You're not authenticated");
      if(!refreshTokens.includes(refreshToken)) {
        return responseHelper.sendResponse.FORBIDDEN(res, null, "Refresh token is not valid");
      }

      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if(err) {
          responseHelper.sendResponse.SERVER_ERROR(res, null);
        }

        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        //Create new accessToken, refresh token
        const newAccessToken = generateToken.generateAccessToken(user);
        const newRefreshToken = generateToken.generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);

        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true, secure: false, path: "/", sameSite: "strict"
        })
        responseHelper.sendResponse.SUCCESS(res, {accessToken: newAccessToken});
      })
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  // LOG OUT
  userLogout : (req, res) => {
    try {
      res.clearCookie("refreshToken");
      // Xóa refreshToken đã tồn tại trong cookie
      refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);

      // Chỗ này thêm redis mới chính xác

      // console.log("refreshTokens", refreshTokens);
      responseHelper.sendResponse.SUCCESS(res, null, "Logout successful");
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
    // Bên client phải xóa "access Token" chứa trong redux
  }
};
