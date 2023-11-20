//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken');
const Roles = require('../config/role.js');

//* Call the controller with the methods
const {
  getAll,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOneOrganization,
  restoreOneOrganization,
  getAllOrganizationType,
  reqToVerifyOrganization,
  updateStatusVerifyOrganization,
  getAllReqVerifyOrganization,
  getAllByUser,
  getOneByOrganizationId
} = require('../controllers/organizationController');

//* Here I defined the methods

// Người dùng thuộc Admin
router.get('/', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), getAll);
router.get('/id/:id', getOrganizationById);
router.post('/add', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), createOrganization);
router.patch('/edit/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), updateOrganization);
router.delete('/delete/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), deleteOneOrganization);
router.post('/restore/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), restoreOneOrganization);

// Người dùng thuộc - Tổ chức
router.get('/getAllByUser', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), getAllByUser);
router.get('/getOneByOrganizationId/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), getOneByOrganizationId);
router.get('/getAllOrganizationType', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), getAllOrganizationType);
router.patch('/reqToVerifyOrganization', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), middleware.verifyToken, reqToVerifyOrganization);
router.patch('/updateStatusVerifyOrganization', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), middleware.verifyToken, updateStatusVerifyOrganization);

module.exports = router;
