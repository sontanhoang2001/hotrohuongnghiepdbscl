//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken');
const Roles = require('../config/role.js');

//* Call the controller with the methods
const {
  getAllQuestion,
  getQuestionById,
  createNewQuestion,
  updateQuestion,
  deleteOneQuestion,
  restoreOneQuestion,
  getAllQuestionGroup,
  getQuestionGroupById,
  storeTestHistory,
  getAllTestHistory,
  getTestHistoryById,
} = require('../controllers/mbtisController');

//* Here I defined the methods
router.get('/', getAllQuestion);
router.get('/id/:id', getQuestionById);

router.post('/add', createNewQuestion);
router.patch('/edit/:id', updateQuestion);
router.delete('/delete/:id', deleteOneQuestion);
router.post('/restore/:id', restoreOneQuestion);

router.get('/getAllQuestionGroup', getAllQuestionGroup);
router.get('/getQuestionGroupById/:id', getQuestionGroupById);

router.get('/getQuestionGroupById/:id', getQuestionGroupById);

// do test mbti
router.post('/storeTestHistory', middleware.verifyToken, middleware.checkRole([Roles.USER]), storeTestHistory);
router.get('/getAllTestHistory', middleware.verifyToken, middleware.checkRole([Roles.USER]), getAllTestHistory);
router.get('/getTestHistoryById/:id', middleware.verifyToken, middleware.checkRole([Roles.USER]), getTestHistoryById);

module.exports = router;
