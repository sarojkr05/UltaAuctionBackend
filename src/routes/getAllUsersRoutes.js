import express from 'express';
import { isAdmin, isLoggedIn } from '../validation/authValidator.js';
import { getAllUsersController } from '../controllers/getAllUsersController.js';

const getAllUsersRoutes = express.Router();
// Route to get all users   

getAllUsersRoutes.get('/users',isLoggedIn, isAdmin, getAllUsersController);
// This route is protected and can only be accessed by logged-in users with admin privileges.

export default getAllUsersRoutes;