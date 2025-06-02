// services/leaderboard.service.js
import { getAuctionLeaderboard } from "../repositories/userLeaderboardRepo.js";

export const fetchAuctionLeaderboard = async (auctionId) => {
  return await getAuctionLeaderboard(auctionId);
};
