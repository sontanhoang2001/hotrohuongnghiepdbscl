//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken');
const Roles = require('../config/role.js');

//* Call the controller with the methods
const {
  getAll,
  getById,
  createNew,
  update,
  deleteOne,
  restoreOne
} = require('../controllers/postsCategoryController.js');

//* Here I defined the methods
router.get('/', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), getAll);
router.get('/id/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), getById);

router.post('/add', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), createNew);
router.patch('/edit/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), update);
router.delete('/delete/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), deleteOne);
router.post('/restore/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), restoreOne);

module.exports = router;
