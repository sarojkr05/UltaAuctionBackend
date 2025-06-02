// controllers/leaderboard.controller.js
import { fetchAuctionLeaderboard } from "../services/userLeaderboardService.js";

export const getLeaderboardByAuctionId = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const data = await fetchAuctionLeaderboard(auctionId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
