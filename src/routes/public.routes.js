//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken.js');
const Roles = require('../config/role.js');

//* Call the controller with the methods
const {
  getAllForPublic,
  getOrganizationById,
} = require('../controllers/organizationController.js');

//* Here I defined the methods

// public - ai cũng có thể truy cập
const routePrefix = "/organization";
router.get(routePrefix + '/', getAllForPublic);
router.get(routePrefix + '/id/:id', getOrganizationById);

module.exports = router;
