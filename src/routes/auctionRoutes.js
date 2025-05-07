import express from 'express';
import { createAuctionController, declareWinnerController, deleteAuctionByIdController, getAuctionByIdController, getAuctionController, updateAuctionByIdController } from '../controllers/auctionController.js';
import { isAdmin, isLoggedIn } from '../validation/authValidator.js';
import uploader from '../middlewares/multerMiddleware.js';

const auctionRouter = express.Router();

auctionRouter.post('/', isLoggedIn, isAdmin, uploader.single('auctionImage'), createAuctionController);
auctionRouter.get('/', isLoggedIn, getAuctionController); // Get auction listings
auctionRouter.post('/:id/declare-winner', declareWinnerController); // Declare winner manually
auctionRouter.get('/auction/:id', isLoggedIn, getAuctionByIdController);
auctionRouter.patch('/auction/:id', isLoggedIn, uploader.single('auctionImage'), updateAuctionByIdController);
auctionRouter.delete('/auction/:id', isLoggedIn, deleteAuctionByIdController);



export default auctionRouter;