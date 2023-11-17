//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken');
const Roles = require('../config/role.js');

//* Call the controller with the methods
const {
  getAll,
  getOrganizationProfile,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOneOrganization,
  getAllOrganizationType,
  reqToVerifyOrganization,
  updateStatusVerifyOrganization,
  getAllReqVerifyOrganization,
  getAllByUser,
  getOneByOrganizationId
} = require('../controllers/organizationController');

//* Here I defined the methods
// Admin
router.get('/', middleware.verifyToken, middleware.checkRole([Roles.ORGANIZATION]), getAll);
// router.get('/getProfile', middleware.verifyToken, middleware.checkRole([Roles.ORGANIZATION]), getOrganizationProfile);

router.get('/id/:id', getOrganizationById);


router.post('/add', middleware.verifyToken, middleware.checkRole([Roles.ORGANIZATION]), createOrganization);
router.patch('/edit/:id', middleware.verifyToken, middleware.checkRole([Roles.ORGANIZATION]), updateOrganization);
router.delete('/delete/:id', middleware.verifyToken, middleware.checkRole([Roles.ORGANIZATION]), deleteOneOrganization);

// User thuộc tổ chức
router.get('/getAllByUser', middleware.verifyToken, middleware.checkRole([Roles.ORGANIZATION]), getAllByUser);
router.get('/getOneByOrganizationId/:id', middleware.verifyToken, middleware.checkRole([Roles.ORGANIZATION]), getOneByOrganizationId);


router.get('/getAllOrganizationType', middleware.verifyToken, middleware.checkRole([Roles.ORGANIZATION]), getAllOrganizationType);

router.patch('/reqToVerifyOrganization', middleware.verifyToken, middleware.checkRole([Roles.ORGANIZATION]), middleware.verifyToken, reqToVerifyOrganization);
router.patch('/updateStatusVerifyOrganization', middleware.verifyToken, middleware.checkRole([Roles.ORGANIZATION]), middleware.verifyToken, updateStatusVerifyOrganization);

module.exports = router;
