import Bid from "../schema/bidSchema.js"
import mongoose from "mongoose";

export async function createBidRepo(auctionId, userId, bidAmount) {
    try {
        const bid = new Bid(auctionId, userId, bidAmount);
        return await bid.save();
    } catch (error) {
        console.error("Error in createBidRepo:", error);
        throw error;
    }
}

export async function getBidsByAuctionId(auctionId) {
    try {
        const bids = await Bid.find({ auctionId }).sort({ createdAt: -1 }); // Sorting by newest bids first
        return bids;
    } catch (error) {
        console.error("Error fetching bids from repository", error);
        throw error;
    }
}

export async function getBidByid(auctionId, userId) {
    try {
        const bid = await Bid.findOne({
            auctionId: new mongoose.Types.ObjectId(auctionId), // convert string to objid
            userId
        });
        
        if(!bid) {
            console.log("cannot found bid in repo.")
        }
        console.log("bid from repo", bid);
        return bid;
    } catch (error) {
        console.error("Error fetching the bid by id", error)
        throw error
    }
}