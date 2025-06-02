// routes/leaderboard.routes.js
import express from "express";
import { getLeaderboardByAuctionId } from "../controllers/userLeaderboardController.js";

const LeaderboardRouter = express.Router();

LeaderboardRouter.get("/:auctionId", getLeaderboardByAuctionId);

export default LeaderboardRouter;
