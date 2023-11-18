//* Import express and initialize the routers
const express = require("express");
const router = express.Router();
const middleware = require('../middleware/verifyToken');

//* Call the controller with the methods
const { getAll, getUserById, updateUser, deleteOneUser, getUserProfile, restoreOneUser} = require( '../controllers/usersController');

//* Here I defined the methods 
router.get('/', getAll);
router.get('/id/:id', getUserById);
router.get('/profile', middleware.verifyToken, getUserProfile);

router.patch('/edit', middleware.verifyToken, updateUser);
router.delete('/delete/:id', deleteOneUser);
router.post('/restore/:id', restoreOneUser);

module.exports = router;