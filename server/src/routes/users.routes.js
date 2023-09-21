//* Import express and initialize the routers
import express from 'express';
const router = express.Router();

//* Call the controller with the methods
import { getUsers, getUsersById, createNewUser, updateUser, deleteOneUser} from '../controllers/usersController'

//* Here I defined the methods 
router.get('/', getUsers); //localhost:3000/users/
router.get('/id/:id', getUsersById); //localhost:3000/users/id/1
router.post('/add', createNewUser); //localhost:3000/customers/add
router.patch('/edit/:id', updateUser); //localhost:3000/customers/edit/1
router.delete('/delete/:id', deleteOneUser); //localhost:3000/customers/delete/1

export default router;