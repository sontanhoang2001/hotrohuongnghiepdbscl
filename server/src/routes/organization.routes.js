//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken');

//* Call the controller with the methods
const {
  getAll,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOneOrganization,
  getAllOrganizationType,
  reqToVerifyOrganization,
  updateStatusVerifyOrganization,
  getAllReqVerifyOrganization
} = require('../controllers/organizationController');

//* Here I defined the methods
router.get('/', getAll);
router.get('/id/:id', getOrganizationById);
router.post('/add', createOrganization);
router.patch('/edit/:id', updateOrganization);
router.delete('/delete/:id', deleteOneOrganization);

router.get('/getAllOrganizationType', getAllOrganizationType);

router.patch('/reqToVerifyOrganization', middleware.verifyToken, reqToVerifyOrganization);
router.patch('/updateStatusVerifyOrganization', middleware.verifyToken, updateStatusVerifyOrganization);

module.exports = router;
