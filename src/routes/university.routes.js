//* Import express and initialize the routers
const express = require("express");
const router = express.Router();
const middleware = require('../middleware/verifyToken');

//* Call the controller with the methods
const { getAll, getUniversityById, createUniversity, updateUniversity, deleteOneUniversity} = require( '../controllers/universityController');

//* Here I defined the methods 
router.get('/', getAll);
router.get('/id/:id', getUniversityById);
router.post('/add', middleware.verifyToken, createUniversity);
router.patch('/edit', middleware.verifyToken, updateUniversity);
router.delete('/delete/:id', deleteOneUniversity);

module.exports = router;