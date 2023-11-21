//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken.js');
const Roles = require('../config/role.js');

//* Call the controller with the methods
const {
  getAllFaqs,
  getFaqsById,
  createFaqsNew,
  updateFaqs,
  deleteOneFaqs,
  restoreOneFaqs,
  createNewFaqs,
} = require('../controllers/faqsController.js');

//* Here I defined the methods
router.get(
  '/',
  middleware.verifyToken,
  middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]),
  middleware.checkUserBelongtoOrganization(),
  getAllFaqs,
);
router.get(
  '/id/:id',
  middleware.verifyToken,
  middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]),
  middleware.checkUserBelongtoOrganization(),
  getFaqsById,
);

router.post(
  '/add',
  middleware.verifyToken,
  middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]),
  middleware.checkUserBelongtoOrganization(),
  createNewFaqs,
);
router.patch(
  '/edit/:id',
  middleware.verifyToken,
  middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]),
  middleware.checkUserBelongtoOrganization(),
  updateFaqs,
);
router.delete(
  '/delete/:id',
  middleware.verifyToken,
  middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]),
  middleware.checkUserBelongtoOrganization(),
  deleteOneFaqs,
);
router.post(
  '/restore/:id',
  middleware.verifyToken,
  middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]),
  middleware.checkUserBelongtoOrganization(),
  restoreOneFaqs,
);

module.exports = router;
