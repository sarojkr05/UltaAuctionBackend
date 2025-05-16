import express from 'express';
import { sendOTPController, verifyOTPController } from '../controllers/otpController.js';

const otpRouter = express.Router();

otpRouter.post('/send', sendOTPController);
otpRouter.post('/verify-otp', verifyOTPController);

export default otpRouter;