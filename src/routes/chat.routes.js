//* Import express and initialize the routers
const express = require('express');

const router = express.Router();
const middleware = require('../middleware/verifyToken');

//* Call the controller with the methods
const { getAllChats, getChatMessagesById, getChatMessagesCustomer } = require('../controllers/chatController');

//* Here I defined the methods
router.get('/getAllChats', middleware.verifyToken, getAllChats);
router.get('/getChatMessagesById', middleware.verifyToken, getChatMessagesById);

router.get('/getChatMessagesCustomer', middleware.verifyToken, getChatMessagesCustomer);

module.exports = router;
