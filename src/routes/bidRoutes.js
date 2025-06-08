import express from 'express';
import { getBidByIdController, getBidsByAuctionIdController, placeBidController } from '../controllers/bidController.js';
import { isLoggedIn } from '../validation/authValidator.js';
import { getMyBidsController } from '../controllers/getMyBidsController.js';


const bidRouter = express.Router();

bidRouter.post("/", isLoggedIn, placeBidController)
bidRouter.get("/my-bids/all", isLoggedIn, getMyBidsController)
bidRouter.get("/:auctionId", isLoggedIn, getBidsByAuctionIdController)
bidRouter.get("/:auctionId/:userId", isLoggedIn, getBidByIdController)
export default bidRouter;