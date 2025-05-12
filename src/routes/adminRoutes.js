import express from 'express';
import { getAdminDashboardController } from '../controllers/adminController.js';
import { isAdmin, isLoggedIn } from '../validation/authValidator.js';


const adminRouter = express.Router();
// Admin dashboard route
adminRouter.get('/dashboard', isLoggedIn, isAdmin, getAdminDashboardController);

export default adminRouter;
// This route is protected and can only be accessed by logged-in users with admin privileges.