import express from 'express';
import { createAuctionController, declareWinnerController, deleteAuctionByIdController, getAuctionByIdController, getAuctionController, updateAuctionByIdController } from '../controllers/auctionController.js';
import { isAdmin, isLoggedIn } from '../validation/authValidator.js';
import uploader from '../middlewares/multerMiddleware.js';

const auctionRouter = express.Router();

auctionRouter.post('/', isLoggedIn, isAdmin, uploader.single('auctionImage'), createAuctionController);
auctionRouter.get('/', isLoggedIn, getAuctionController); // Get auction listings
auctionRouter.post('/:id/declare-winner', isLoggedIn, isAdmin, declareWinnerController); // Declare winner manually
auctionRouter.get('/auction/:id', isLoggedIn, getAuctionByIdController);
auctionRouter.patch('/:id', isLoggedIn, isAdmin, uploader.single('auctionImage'), updateAuctionByIdController);
auctionRouter.delete('/:id', isLoggedIn, isAdmin, deleteAuctionByIdController);



export default auctionRouter;