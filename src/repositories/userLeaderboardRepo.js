// repositories/leaderboard.repository.js
import { Auction } from "../schema/auctionSchema.js";
import Bid from "../schema/bidSchema.js";
import { User } from "../schema/userSchema.js";

export const getAuctionLeaderboard = async (auctionId) => {
  const auction = await Auction.findById(auctionId).populate({
    path: "bids",
    populate: {
      path: "userId",
      select: "firstName lastName email",
    },
  });

  if (!auction || !auction.bids || auction.bids.length === 0) {
    throw new Error("No bids found for this auction.");
  }

  // Sort the bids by bidAmount ascending
  const sortedBids = auction.bids
    .map((bid) => ({
      name: `${bid.userId.firstName} ${bid.userId.lastName}`,
      email: bid.userId.email,
      bidAmount: bid.bidAmount,
      status: bid.status,
    }))
    .sort((a, b) => a.bidAmount - b.bidAmount);

  return sortedBids;
};
