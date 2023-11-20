//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken.js');
const Roles = require('../config/role.js')

//* Call the controller with the methods
const { getAllPosts, getPostsById, createNewPosts, updatePosts, deleteOnePosts, restoreOnePosts, getAllPostsCategory} = require('../controllers/postsOrganizationController.js');

//* Here I defined the methods
router.get('/', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), getAllPosts);
router.get('/id/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), getPostsById);

router.post('/add', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), createNewPosts);
router.patch('/edit/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), updatePosts);
router.delete('/delete/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), deleteOnePosts);
router.post('/restore/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), restoreOnePosts);

router.get('/getAllPostsCategory', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), getAllPostsCategory);



module.exports = router;
