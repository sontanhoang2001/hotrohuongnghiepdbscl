//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken');
const Roles = require('../config/role.js');

//* Call the controller with the methods
const {
  getAllMajorMbti,
  getMajorMbtiById,
  createNewMajorMbti,
  updateMajorMbti,
  deleteOneMajorMbti,
  restoreOneMajorMbti
} = require('../controllers/majorMbtiController');

//* Here I defined the methods
router.get('/', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), getAllMajorMbti);
router.get('/id/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), getMajorMbtiById);

router.post('/add', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), createNewMajorMbti);
router.patch('/edit/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), updateMajorMbti);
router.delete('/delete/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), deleteOneMajorMbti);
router.post('/restore/:id', middleware.verifyToken, middleware.checkRole([Roles.ADMIN]), restoreOneMajorMbti);

module.exports = router;
