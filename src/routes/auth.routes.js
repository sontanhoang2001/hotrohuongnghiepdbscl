//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken');

//* Call the controller with the methods
const {
  registerUser,
  requestOTP,
  authOTP,
  login,
  loginBySocialNetwork,
  requestRefreshToken,
  userLogout,
  changePassword,
  authChangeEmail,
  authChangePhone,
  changeEmail,
  changePhone,
} = require('../controllers/authController');

//* Here I defined the methods
router.post('/registerUser', registerUser);
router.post('/requestOTP', requestOTP);
router.post('/authOTP', authOTP);
router.post('/login', login);
router.post('/loginBySocialNetwork', loginBySocialNetwork);
router.post('/logout', userLogout);
router.post('/refresh', requestRefreshToken);

router.post('/changePassword', middleware.verifyToken, changePassword);
router.post("/authChangeEmail", middleware.verifyToken, authChangeEmail);
router.post("/authChangePhone", middleware.verifyToken, authChangePhone);
router.patch("/changeEmail", middleware.verifyToken, changeEmail);
router.patch("/changePhone", middleware.verifyToken, changePhone);

module.exports = router;
