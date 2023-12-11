//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken.js');
const Roles = require('../config/role.js');

//* Call the controller with the methods
const {
  getAllForPublic,
  getOrganizationByIdForPublic,
  getAllForPublicToSelectList,
} = require('../controllers/organizationController.js');

const { getAllPostsForPublic, getPostsByIdForPublic } = require('../controllers/postsOrganizationController.js');

const { getAllFaqsForPublic, getFaqsByIdForPublic } = require('../controllers/faqsController.js');

const { newDoTestMBTI, getAllPersonalityGroups, getMajorMBTIById } = require('../controllers/mbtisController');


//* Here I defined the methods

// public - ai cũng có thể truy cập
const organizationRoutePrefix = '/organization';
router.get(organizationRoutePrefix + '/', getAllForPublic);
router.get(organizationRoutePrefix + '/id/:id', getOrganizationByIdForPublic);
router.get(organizationRoutePrefix + '/selectList', getAllForPublicToSelectList);

const postsRoutePrefix = '/posts';
router.get(postsRoutePrefix + '/', getAllPostsForPublic);
router.get(postsRoutePrefix + '/id/:id', getPostsByIdForPublic);

const faqsRoutePrefix = '/faqs';
router.get(faqsRoutePrefix + '/', getAllFaqsForPublic);
router.get(faqsRoutePrefix + '/id/:id', getFaqsByIdForPublic);

// do test MBTI
const mbtiRoutePrefix = '/mbti';
router.get(mbtiRoutePrefix + '/get-question-todotestMbti', newDoTestMBTI);
router.get(mbtiRoutePrefix + '/personality-groups', getAllPersonalityGroups);
router.get(mbtiRoutePrefix + '/getMajorMBTIById/:id', getMajorMBTIById);


module.exports = router;
