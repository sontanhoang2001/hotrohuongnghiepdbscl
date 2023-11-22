//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken');

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
router.get('/', getAllMajorMbti);
router.get('/id/:id', getMajorMbtiById);

router.post('/add', createNewMajorMbti);
router.patch('/edit/:id', updateMajorMbti);
router.delete('/delete/:id', deleteOneMajorMbti);
router.post('/restore/:id', restoreOneMajorMbti);

module.exports = router;
