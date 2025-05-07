import express from 'express';
import { createUser } from "../controllers/userController.js";
// We have to initialise a router object to add routes in a new file
// Routers are used for segregating your routes in different modules
const userRouter = express.Router();  

userRouter.post('/', createUser);

export default userRouter;