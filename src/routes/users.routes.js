//* Import express and initialize the routers
const express = require("express");
const router = express.Router();
const middleware = require('../middleware/verifyToken');

//* Call the controller with the methods
const { getUsers, getUsersById, createUser, updateUser, deleteOneUser} = require( '../controllers/usersController');

//* Here I defined the methods 
router.get('/', getUsers); //localhost:3000/users/
router.get('/id/:id', getUsersById); //localhost:3000/users/id/1
router.post('/add', createUser); //localhost:3000/customers/add
router.patch('/edit/:id', updateUser); //localhost:3000/customers/edit/1
router.delete('/delete/:id', deleteOneUser); //localhost:3000/customers/delete/1

module.exports = router;