//* Import express and initialize the routers
const express = require("express");
const router = express.Router();

//* Call the controller with the methods
const { registerUser, requestOTP, login, requestRefreshToken, userLogout } = require("../controllers/authController");

//* Here I defined the methods
router.post("/registerUser", registerUser);
router.post("/requestOTP", requestOTP);

router.post("/login", login);
router.post("/logout", userLogout);
router.post("/refresh", requestRefreshToken);

module.exports = router;