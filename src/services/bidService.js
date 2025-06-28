import {
  createBidRepo,
  getBidByid,
  getBidsByAuctionId,
} from "../repositories/bidRepository.js";
import { Auction } from "../schema/auctionSchema.js";
import Bid from "../schema/bidSchema.js";

export async function placeBidService(auctionId, userId, bidAmount) {
  try {
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      throw new Error("Auction not found.");
    }

    if (bidAmount < auction.startingBid) {
      throw new Error(`Bid must be at least ₹${auction.startingBid}`);
    }

    if (bidAmount > auction.endingBid) {
      throw new Error(`Bid must not exceed ₹${auction.endingBid}`);
    }

    const userBidsCount = await Bid.countDocuments({ userId, auctionId });
    if (userBidsCount >= 5) {
      throw new Error(
        "You have reached the maximum limit of 5 bids for this auction."
      );
    }

    if (auction.slotsFilled >= auction.maxSlots) {
      throw new Error("Auction slots are full. No more bids allowed.");
    }

    const newBid = await createBidRepo({ auctionId, userId, bidAmount });

    const updatedAuction = await Auction.findByIdAndUpdate(
      auctionId,
      {
        $push: { bids: newBid._id },
        $inc: { slotsFilled: 1 },
      },
      { new: true }
    );

    if (updatedAuction.slotsFilled >= updatedAuction.maxSlots) {
      updatedAuction.status = "completed";
      await updatedAuction.save();

      const bids = await Bid.find({ auctionId });
      const bidAmountMap = {};

      for (const bid of bids) {
        const amount = bid.bidAmount;
        bidAmountMap[amount] = bidAmountMap[amount] || [];
        bidAmountMap[amount].push(bid._id);
      }

      for (const amount in bidAmountMap) {
        const bidsWithAmount = bidAmountMap[amount];
        const status = bidsWithAmount.length === 1 ? "valid" : "disqualified";

        await Bid.updateMany(
          { _id: { $in: bidsWithAmount } },
          { $set: { status } }
        );
      }
    }

    const updated = await Auction.findById(auctionId).populate("bids");
    return updated;
  } catch (error) {
    console.error("Error in placing bid Service", error);
    throw error;
  }
}

export async function fetchBidsByAuctionId(auctionId) {
  // Renamed function to avoid confusion
  try {
    const bids = await getBidsByAuctionId(auctionId);
    if (!bids.length) {
      console.log("No bids found for this auction");
    }
    return bids;
  } catch (error) {
    console.error("Error fetching bids from service", error);
    throw error;
  }
}

export async function getBidByIdService(auctionId, userId) {
  try {
    const bid = await getBidByid(auctionId, userId);

    if (!bid) {
      console.log("No bids found for this auction");
      return null;
    }

    return bid;
  } catch (error) {
    console.error("Error fetching bids from service", error);
    throw error;
  }
}
