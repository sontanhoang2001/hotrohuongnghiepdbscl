const jwt = require('jsonwebtoken');

const authService = require('../services/authService');
const userService = require('../services/userService');
const organizationService = require('../services/organizationService');

const responseHelper = require('../helpers/responseHelper');
const validateHelper = require('../helpers/validateHelper');
const generateToken = require('../helpers/generateToken');
const ROLES = require('../config/role');

const bcrypt = require('bcrypt');
const { createTransporter } = require('../helpers/mailer');

let refreshTokens = [];

module.exports = {
  registerUser: async (req, res) => {
    try {
      const user = req.body;
      if (!user.email || !user.password || !user.fullName || !user.address || !user.gender || !user.roleId) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Trường dữ liệu không được bỏ trống');
      }
      if (user.roleId == 1) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null);
      }

      // Kiểm tra email đúng định dạng
      const checkEmailValid = await validateHelper.validateEmail(user.email);
      if (!checkEmailValid) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Email Không họp lệ');
      }
      // Kiểm tra email có tồn tại
      const checkExistingUserByEmail = await authService.existingUserByEmail(user.email);
      if (checkExistingUserByEmail) {
        return responseHelper.sendResponse.CONFLICT(res, null, 'Email đã tồn tại');
      }

      // Kiểm tra email đúng định dạng
      if (user.phone && user.phone != '') {
        const checkPhoneValid = await validateHelper.validatePhoneNumber(user.phone);
        if (!checkPhoneValid) {
          return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Số điện thoại không họp lệ');
        }
        // Kiểm tra phone có tồn tại
        const checkExistingUserByPhone = await authService.existingUserByPhone(user.phone);
        if (checkExistingUserByPhone) {
          return responseHelper.sendResponse.CONFLICT(res, null, 'Số điện thoại đã tồn tại');
        }
      }

      //Hash password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(user.password, salt);

      // Nếu đăng nhập bằng email/phone thì account_type = 0
      const newUser = {
        account_type: 0,
        email: user.email,
        phone: user.phone,
        password: (user.password = hashed),
        fullName: user.fullName,
        gender: user.gender,
        address: user.address,
        status: 0, // Trạng thái đợi active account
        roleId: user.roleId, // Role = 5 là tài khoản người dùng bình thường/student
      };

      // Create new user
      const result = await authService.registerUser(newUser);
      return responseHelper.sendResponse.SUCCESS(res, result);
    } catch (error) {
      return responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  requestOTP: async (req, res) => {
    // try {
      const reqData = req.body;
      const userId = parseInt(reqData.userId);
      if (userId) {
        if (reqData.type == 'email') {
          // Kiểm tra email có tồn tại
          const userEmail = await authService.getUserEmailById(userId);
          if (!userEmail) {
            return responseHelper.sendResponse.NOT_FOUND(res, null);
          }

          const sendTo = userEmail.email;

          // console.log("sendTo", sendTo);

          // Tạo mã OTP
          let otpCode = '';
          for (let i = 0; i < 6; i++) {
            otpCode += Math.floor(Math.random() * 10);
          }

          // send mail with defined transport object
          const transporter = createTransporter();
          const info = await transporter.sendMail({
            from: `"Support Student 📩" <${sendTo}>`, // sender address
            to: sendTo, // list of receivers
            subject: 'Mã xác thực OTP ✔', // Subject line
            text: `Mã OTP của bạn là: ${otpCode}`, // plain text body
            html: `
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Hỗ trợ tư vấn hướng nghiệp ĐH khu vực ĐBSCL</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Cảm ơn bạn đã chọn website Hỗ trợ tư vấn hướng nghiệp ĐH khu vực ĐBSCL. Hãy sử dụng mã OTP để hoàn thành bước đăng ký tài khoản của bạn.</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpCode}</h2>
              <p style="font-size:0.9em;">Phan Hưu Kiệt,<br />Hỗ trợ tư vấn hướng nghiệp ĐH khu vực ĐBSCL</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Hỗ trợ tư vấn hướng nghiệp ĐH khu vực ĐBSCL Inc</p>
                <p>1600 Tòa nhà công nghệ cao</p>
                <p>Xuân Khánh, Ninh Kiều, Cần Thơ</p>
              </div>
            </div>
          </div>
          `, // html body
          });

          // console.log('Message sent: %s', info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          if (info.messageId) {
            const updateOtpForUser = await authService.saveOTPForUser(userId, otpCode);
            if (!updateOtpForUser) {
              return responseHelper.sendResponse.SERVER_ERROR(res, null);
            }

            // Gửi phản hồi thành công nếu email đã được gửi
            return responseHelper.sendResponse.SUCCESS(res, null, 'Gửi OTP qua email thành công');
          } else {
            // Gửi phản hồi lỗi nếu có vấn đề khi gửi email
            return responseHelper.sendResponse.SERVER_ERROR(res, null, 'Gửi OTP thất bại');
          }
        }
      } else {
        return responseHelper.sendResponse.BAD_REQUEST(res, null);
      }
    // } catch (error) {
    //   return responseHelper.sendResponse.SERVER_ERROR(res, null);
    // }
  },
  authOTP: async (req, res) => {
    try {
      const reqUser = req.body;
      const userId = parseInt(reqUser.userId);
      if (userId == '' || reqUser.type == '') {
        return responseHelper.sendResponse.BAD_REQUEST(res, null);
      }

      // Kiểu xác thực
      if (reqUser.type == 'email') {
        if (reqUser.otpCode == '') {
          return responseHelper.sendResponse.BAD_REQUEST(res, null);
        }

        const authOTP = await authService.authOTPByEmail(userId, reqUser.otpCode);
        if (authOTP) {
          return responseHelper.sendResponse.SUCCESS(res, null, 'Xác thực OTP thành công');
        } else {
          return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Xác thực OTP thất bại');
        }
      } else if (reqUser.type == 'phone') {
        const authOTP = await authService.authOTPByPhone(userId);
        if (authOTP) {
          return responseHelper.sendResponse.SUCCESS(res, null, 'Xác thực OTP thành công');
        } else {
          return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Xác thực OTP thất bại');
        }
      }
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  login: async (req, res) => {
    try {
      const user = req.body;
      const username = user.username;

      if (!user.username || !user.password) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Trường dữ liệu không được bỏ trống');
      }

      const result = await authService.loginUser(username);

      // Đúng 'username email or phone'
      if (result) {
        const validPassword = await bcrypt.compare(user.password, result?.password);

        // Đúng 'password'
        if (validPassword) {
          const { password, ...userData } = result;
          let finalUserData = {};
          if (userData.status == 1) {
            if(userData.Role.id == ROLES.ADMIN) {
              const getOrganizationByUserId = await organizationService.getOrganizationByUserId(userData.id);
                userData.Organization = getOrganizationByUserId;
            }

            // Account đã active
            const accessToken = generateToken.generateAccessToken(userData);
            const refreshToken = generateToken.generateRefreshToken(userData);
            refreshTokens.push(refreshToken);
            res.cookie('refreshToken', refreshToken, {
              httpOnly: true,
              secure: false,
              path: '/',
              sameSite: 'strict',
            });
            finalUserData = { userData, accessToken };
          } else if (userData.status == 0) {
            // Account chưa active
            finalUserData = { userData };
          }
          return responseHelper.sendResponse.SUCCESS(res, finalUserData, 'Đăng nhập thành công');
        }
      }

      responseHelper.sendResponse.UNAUTHORIZED(
        res,
        null,
        'Tên đăng nhập hoặc mật khẩu không đúng!',
      );
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  loginBySocialNetwork: async (req, res) => {
    try {
      const user = req.body;
      if (!user.email && !user.phone) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Trường dữ liệu không được bỏ trống');
      }

      let result = await authService.loginUserBySocialNetwork(user);

      // Chưa đc đk
      if (result == null) {
        const newUser = {
          account_type: 1,
          email: user.email,
          phone: user?.phoneNumber,
          password: null,
          fullName: user?.displayName,
          gender: null,
          address: null,
          status: 1, // Trạng thái đã active account
          roleId: 5, // Role = 5 là tài khoản người dùng bình thường/student
          avatar: user?.photoURL,
        };

        // Create new user
        result = await authService.registerUser(newUser);
        if (!result) {
          return responseHelper.sendResponse.UNAUTHORIZED(res, null, 'Đăng nhập không thành công');
        }
      }

      if (result) {
        // Account đã active
        let finalUserData = {};
        const { password, ...userData } = result;
        const accessToken = generateToken.generateAccessToken(userData);
        const refreshToken = generateToken.generateRefreshToken(userData);
        refreshTokens.push(refreshToken);
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        });
        finalUserData = { userData, accessToken };

        return responseHelper.sendResponse.SUCCESS(res, finalUserData, 'Đăng nhập thành công');
      }
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  requestRefreshToken: async (req, res) => {
    try {
      //Take refresh token from user
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken)
        return responseHelper.sendResponse.UNAUTHORIZED(res, "You're not authenticated");
      if (!refreshTokens.includes(refreshToken)) {
        return responseHelper.sendResponse.FORBIDDEN(res, null, 'Refresh token is not valid');
      }

      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
          responseHelper.sendResponse.SERVER_ERROR(res, null);
        }

        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        //Create new accessToken, refresh token
        const newAccessToken = generateToken.generateAccessToken(user);
        const newRefreshToken = generateToken.generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);

        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        });
        responseHelper.sendResponse.SUCCESS(res, { accessToken: newAccessToken });
      });
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  // LOG OUT
  userLogout: (req, res) => {
    try {
      res.clearCookie('refreshToken');
      // Xóa refreshToken đã tồn tại trong cookie
      refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);

      // Chỗ này thêm redis mới chính xác

      // console.log("refreshTokens", refreshTokens);
      responseHelper.sendResponse.SUCCESS(res, null, 'Logout successful');
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
    // Bên client phải xóa "access Token" chứa trong redux
  },
  changePassword: async (req, res) => {
    try {
      const userId = parseInt(req.user.id);
      const user = req.body;

      if (!user.oldPassword || !user.newPassword) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Trường dữ liệu không được bỏ trống');
      }
      if (user.oldPassword === user.newPassword) {
        return responseHelper.sendResponse.BAD_REQUEST(
          res,
          null,
          'Mật khẩu mới không thể trùng với mật khẩu cũ',
        );
      }

      // Kiểm tra password khớp?
      const result = await userService.getUserByUserId(userId);
      // Đúng 'username email or phone'
      if (result) {
        const validPassword = await bcrypt.compare(user.oldPassword, result?.password);

        // Đúng 'password'
        if (validPassword) {
          //Hash password
          const salt = await bcrypt.genSalt(10);
          const newPassword = await bcrypt.hash(user.newPassword, salt);

          // Tiến hành cập nhật mật khẩu mới
          const resultOfUpdatePassword = await authService.updatePassword(userId, newPassword);
          if (resultOfUpdatePassword) {
            return responseHelper.sendResponse.SUCCESS(res, null);
          }
        } else {
          return responseHelper.sendResponse.CONFLICT(res, null, 'Nhập mật mật khẩu cũ không khớp');
        }
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      return responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  authChangeEmail: async (req, res) => {
    try {
      const userId = parseInt(req.user.id);
      const reqData = req.body;

      if (!reqData.newEmail) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Trường dữ liệu không được bỏ trống');
      }

      const checkExistingUserByEmail = await authService.existingUserByEmail(reqData.newEmail);
      if (checkExistingUserByEmail !== null) {
        return responseHelper.sendResponse.CONFLICT(res, null, 'Email này đã được sử dụng');
      }

      if (!reqData.password) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Trường dữ liệu không được bỏ trống');
      }

      // gọi service user để lấy ra thông tin của user theo Id
      const result = await userService.getUserByUserId(userId);
      if (result) {
        const validPassword = await bcrypt.compare(reqData.password, result?.password);

        // Đúng 'password'
        if (validPassword) {
          // Gửi xác nhận OTP qua email cũ
          const sendTo = reqData.newEmail;
          // console.log("sendTo", sendTo);

          // Tạo mã OTP
          let otpCode = '';
          for (let i = 0; i < 6; i++) {
            otpCode += Math.floor(Math.random() * 10);
          }

          // send mail with defined transport object
          const transporter = createTransporter();
          const info = await transporter.sendMail({
            from: `"Support Student 📩" <${sendTo}>`, // sender address
            to: sendTo, // list of receivers
            subject: 'Mã xác thực OTP ✔', // Subject line
            text: `Mã OTP của bạn là: ${otpCode}`, // plain text body
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Hỗ trợ tư vấn hướng nghiệp ĐH khu vực ĐBSCL</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Cảm ơn bạn đã chọn website Hỗ trợ tư vấn hướng nghiệp ĐH khu vực ĐBSCL. Hãy sử dụng mã OTP để hoàn thành bước xác nhận đổi email của bạn.</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpCode}</h2>
                <p style="font-size:0.9em;">Phan Hưu Kiệt,<br />Hỗ trợ tư vấn hướng nghiệp ĐH khu vực ĐBSCL</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Hỗ trợ tư vấn hướng nghiệp ĐH khu vực ĐBSCL Inc</p>
                  <p>1600 Tòa nhà công nghệ cao</p>
                  <p>Xuân Khánh, Ninh Kiều, Cần Thơ</p>
                </div>
              </div>
            </div>
            `, // html body
          });

          // console.log('Message sent: %s', info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          if (info.messageId) {
            const updateOtpForUser = await authService.saveOTPForUser(userId, otpCode);
            if (!updateOtpForUser) {
              return responseHelper.sendResponse.SERVER_ERROR(res, null);
            }

            // Gửi phản hồi thành công nếu email đã được gửi
            return responseHelper.sendResponse.SUCCESS(res, null, 'OTP email sent successfully');
          } else {
            // Gửi phản hồi lỗi nếu có vấn đề khi gửi email
            return responseHelper.sendResponse.SERVER_ERROR(res, null, 'Failed to send OTP');
          }
        } else {
          return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Xác nhận mật khẩu chưa đúng');
        }
      } else {
        return responseHelper.sendResponse.BAD_REQUEST(res, null);
      }
    } catch (error) {
      return responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  authChangePhone: async (req, res) => {
    try {
      const userId = parseInt(req.user.id);
      const reqData = req.body;

      if (!reqData.newPhone) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Trường dữ liệu không được bỏ trống');
      }

      const checkExistingUserByPhone = await authService.existingUserByPhone(reqData.newPhone);
      if (checkExistingUserByPhone !== null) {
        return responseHelper.sendResponse.CONFLICT(res, null, 'Số điện thoại này đã được sử dụng');
      }

      if (!reqData.password) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Trường dữ liệu không được bỏ trống');
      }

      // gọi service user để lấy ra thông tin của user theo Id
      const result = await userService.getUserByUserId(userId);
      if (result) {
        const validPassword = await bcrypt.compare(reqData.password, result?.password);

        // Đúng 'password'
        if (validPassword) {
          return responseHelper.sendResponse.SUCCESS(res, null);
        } else {
          return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Xác nhận mật khẩu chưa đúng');
        }
      } else {
        return responseHelper.sendResponse.BAD_REQUEST(res, null);
      }
    } catch (error) {
      return responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  changeEmail: async (req, res) => {
    try {
      const userId = parseInt(req.user.id);
      const user = req.body;

      if (!user.newEmail) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Trường dữ liệu không được bỏ trống');
      }

      // Kiểm tra password khớp?
      const result = await authService.updateEmail(userId, user.newEmail)
      if(result) {
        return responseHelper.sendResponse.SUCCESS(res, null);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, "Cập nhật thất bại");
    } catch (error) {
      return responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  changePhone: async (req, res) => {
    // try {
      const userId = parseInt(req.user.id);
      const user = req.body;

      if (!user.newPhone) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'Trường dữ liệu không được bỏ trống');
      }

      // Kiểm tra password khớp?
      const result = await authService.updatePhone(userId, user.newPhone)
      if(result) {
        return responseHelper.sendResponse.SUCCESS(res, null);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null, "Cập nhật thất bại");
    // } catch (error) {
    //   return responseHelper.sendResponse.SERVER_ERROR(res, null);
    // }
  },
};
