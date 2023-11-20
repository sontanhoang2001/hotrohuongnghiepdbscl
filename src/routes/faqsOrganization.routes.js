//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken.js');
const Roles = require('../config/role.js')

//* Call the controller with the methods
const { getAll, getById, createNew, update, deleteOne, restoreOne } = require('../controllers/faqsController.js');

//* Here I defined the methods
router.get('/', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), getAll);
router.get('/id/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), getById);

router.post('/add', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), createNew);
router.patch('/edit/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), update);
router.delete('/delete/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), deleteOne);
router.post('/restore/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN, Roles.ORGANIZATION]), restoreOne);


module.exports = router;
