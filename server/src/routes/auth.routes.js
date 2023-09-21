//* Import express and initialize the routers
import express from "express";
const router = express.Router();

//* Call the controller with the methods
import { registerUser, login } from "../controllers/authController";

//* Here I defined the methods
router.post("/registerUser", registerUser); //localhost:3000/users/
router.post("/login", login); //localhost:3000/users/


export default router;
