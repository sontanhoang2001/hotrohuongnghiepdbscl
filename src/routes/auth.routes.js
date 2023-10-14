//* Import express and initialize the routers
const express = require("express");
const router = express.Router();

//* Call the controller with the methods
const { registerUser, login } = require("../controllers/authController");

//* Here I defined the methods
router.post("/registerUser", registerUser); //localhost:3000/users/
router.post("/login", login); //localhost:3000/users/

module.exports = router;