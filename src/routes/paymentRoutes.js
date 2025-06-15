import express from 'express';
import { createOrderController, verifyPayment } from '../controllers/paymentController.js';

const paymentRouter = express.Router();
paymentRouter.post('/create-order', createOrderController);
paymentRouter.post('/verify-payment', verifyPayment)

export default paymentRouter;