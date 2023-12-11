//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken.js');
const Roles = require('../config/role.js');

//* Call the controller with the methods

const { countAll } = require('../controllers/dashboardController.js');

//* Here I defined the methods

// Dashboard
router.get('/countAll', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), countAll);

module.exports = router;
