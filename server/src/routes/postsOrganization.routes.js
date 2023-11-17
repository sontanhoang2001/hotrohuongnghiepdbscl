//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken.js');

//* Call the controller with the methods
const { getAllPosts, getPostsById, createNewPosts, updatePosts, deleteOnePosts } = require('../controllers/postsOrganizationController.js');

//* Here I defined the methods
router.get('/', getAllPosts);
router.get('/id/:id', getPostsById);

router.post('/add', createNewPosts);
router.patch('/edit/:id', updatePosts);
router.delete('/delete/:id', deleteOnePosts);

module.exports = router;
