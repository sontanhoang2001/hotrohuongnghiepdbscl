//* Import express and initialize the routers
const express = require("express");
const router = express.Router();
const middleware = require('../middleware/verifyToken');

//* Call the controller with the methods
const { getUsers, getUsersById, createUser, updateUser, deleteOneUser} = require( '../controllers/usersController');

//* Here I defined the methods 
router.get('/', getUsers);
router.get('/id/:id', getUsersById);
router.post('/add', createUser);
router.patch('/edit/:id', updateUser);
router.delete('/delete/:id', deleteOneUser);

module.exports = router;