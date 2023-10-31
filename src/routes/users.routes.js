//* Import express and initialize the routers
const express = require("express");
const router = express.Router();
const middleware = require('../middleware/verifyToken');

//* Call the controller with the methods
const { getUsers, getUserById, createUser, updateUser, deleteOneUser, getUserProfile} = require( '../controllers/usersController');

//* Here I defined the methods 
router.get('/', getUsers);
router.get('/id/:id', getUserById);
router.get('/profile', middleware.verifyToken, getUserProfile);

router.post('/add', createUser);
router.patch('/edit', middleware.verifyToken, updateUser);
router.delete('/delete/:id', deleteOneUser);

module.exports = router;