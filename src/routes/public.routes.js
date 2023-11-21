//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken.js');
const Roles = require('../config/role.js');

//* Call the controller with the methods
const { getAllForPublic, getOrganizationById } = require('../controllers/organizationController.js');

const { getAllPostsForPublic, getPostsByIdForPublic } = require('../controllers/postsOrganizationController.js');

const { getAllFaqs, getFaqsById } = require('../controllers/faqsController.js');
//* Here I defined the methods

// public - ai cũng có thể truy cập
const organizationRoutePrefix = '/organization';
router.get(organizationRoutePrefix + '/', getAllForPublic);
router.get(organizationRoutePrefix + '/id/:id', getOrganizationById);

const postsRoutePrefix = '/posts';
router.get(postsRoutePrefix + '/', getAllPostsForPublic);
router.get(postsRoutePrefix + '/id/:id', getPostsByIdForPublic);

const faqsRoutePrefix = '/faqs';
router.get(faqsRoutePrefix + '/', getAllFaqs);
router.get(faqsRoutePrefix + '/id/:id', getFaqsById);
module.exports = router;
