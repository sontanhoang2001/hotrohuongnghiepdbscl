//* Import express and initialize the routers
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyToken');

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
  newDoTestMBTI,
  getAllPersonalityGroups
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



// do test MBTI
router.get('/get-question-todotestMbti', newDoTestMBTI);
router.get('/personality-groups', getAllPersonalityGroups);


module.exports = router;
