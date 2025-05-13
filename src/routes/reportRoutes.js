import express from 'express';
import { isAdmin, isLoggedIn } from '../validation/authValidator.js';
import { createReportController, getAllReportsController } from '../controllers/reportController.js';

const reportRouter = express.Router();
// Route to create a report
reportRouter.post('/create', isLoggedIn, createReportController);
reportRouter.get('/reports', isLoggedIn, isAdmin, getAllReportsController);

// This route is protected and can only be accessed by logged-in users.
export default reportRouter;