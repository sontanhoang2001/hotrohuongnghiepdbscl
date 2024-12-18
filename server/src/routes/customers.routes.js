//* Import express and initialize the routers
const express = require('express');
const router = express.Router();

//* Call the controller with the methods
const { getCustomers, getCustomersById, createNewCustomer, updateCustomer, deleteOneCustomer, deleteAllCustomers } = require('../controllers/customerController')

//* Here I defined the methods 
router.get('/', getCustomers); //localhost:5000/customers/
router.get('/id/:id', getCustomersById); //localhost:5000/customers/id/1
router.post('/add', createNewCustomer); //localhost:5000/customers/add
router.put('/edit/:id', updateCustomer); //localhost:5000/customers/edit/1
router.delete('/delete/:id', deleteOneCustomer); //localhost:5000/customers/delete/1
router.delete('/deleteCustomers', deleteAllCustomers); //localhost:5000/customers/deleteCustomers

module.exports = router;