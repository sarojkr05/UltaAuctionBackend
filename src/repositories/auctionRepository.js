import { Auction } from "../schema/auctionSchema.js";

export async function createAuctionRepo(auctionData) {
    try {
        const response = await Auction.create(auctionData);
        if(!response) {
            console.log("Couldn't get the response")
        }
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function getAuctionRepo(filters) {
    try {

        const query = {};
        if (filters.status) {
            query.status = filters.status;  // Applying status filter
        }

        const auctions = await Auction.find(query)
            .populate({
                path: "bids", // populates the bids fields
                select: "bidAmount userId" // only get amount and userId field
            })
            .populate("winnerId", "firstName lastName email")
            .limit(Number(filters.limit));  // Convert limit to number

        return auctions;
    } catch (error) {
        console.error("Error in getAuctionRepo:", error);
        throw error;
    }
}


export async function updateAuctionRepo(auctionId, updateData) {
    try {
        const response = await Auction.findByIdAndUpdate(
            auctionId, updateData,
            {new: true, runValidators: true}).populate("winnerId", "firstName lastName email")
            if (!response) {
                console.log(`Couldn't find the auction with ID: ${auctionId}`);
                return null;
            }
            console.log("Auction updated successfully:", response);
        return response;
    } catch (error) {
        console.error("Error in updateAuctionRepo:", error);
        throw error;  // Rethrow for better error handling in the service layer
    }
}

export async function getAuctionById(auctionId) {
    return await Auction.findById(auctionId).populate({
        path: "bids",
        select: "userId"
    })
    .exec();
}

export async function updateAuctionById(auctionId, updatedData) {
    return await Auction.findByIdAndUpdate(auctionId, updatedData, {
        new: true,
        runValidators: true
    })
}

export async function deleteAuctionById(auctionId) {
    return await Auction.findByIdAndDelete(auctionId);
}