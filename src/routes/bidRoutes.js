import express from 'express';
import { getBidByIdController, getBidsByAuctionIdController, placeBidController } from '../controllers/bidController.js';
import { isLoggedIn } from '../validation/authValidator.js';


const bidRouter = express.Router();

bidRouter.post("/", isLoggedIn, placeBidController)
bidRouter.get("/:auctionId", isLoggedIn, getBidsByAuctionIdController)
bidRouter.get("/:auctionId/:userId", isLoggedIn, getBidByIdController)
export default bidRouter;