import { Auction } from "../schema/auctionSchema.js";

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

  // Step 1: Count how many times each bidAmount appears
  const bidAmountCount = {};
  auction.bids.forEach((bid) => {
    const amount = bid.bidAmount;
    bidAmountCount[amount] = (bidAmountCount[amount] || 0) + 1;
  });

  // Step 2: Return leaderboard with disqualified duplicates, preserve "winner"
  const leaderboard = auction.bids.map((bid) => {
    const name = `${bid.userId.firstName} ${bid.userId.lastName}`;
    const email = bid.userId.email;
    const bidAmount = bid.bidAmount;
    const existingStatus = bid.status;

    let status = "valid";

    if (existingStatus === "winner") {
      status = "winner";
    } else if (bidAmountCount[bidAmount] > 1) {
      status = "disqualified";
    }

    return {
      name,
      email,
      bidAmount,
      status,
    };
  });

  // Optional: Sort leaderboard by bid amount ascending
  return leaderboard.sort((a, b) => a.bidAmount - b.bidAmount);
};