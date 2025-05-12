import { getBidByIdService, fetchBidsByAuctionId, placeBidService } from "../services/bidService.js";

export async function placeBidController(req, res) {
    try {
        const {auctionId, bidAmount} = req.body;
        const userId = req.user.id;

        console.log("auctionId:", auctionId);
        console.log("userId:", userId);
        console.log("bidAmount:", bidAmount);

        const response = await placeBidService(auctionId, userId, bidAmount)
        res.status(201).json({
            success: true,
            message: "Bid Placed Successfully",
            data: response
        })
    } catch (error) {
        const statusCode = error.message.includes("already") || error.message.includes("full")
    ? 400
    : 500;

        res.status(statusCode).json({
        success: false,
        message: error.message
        });
    }
}

export async function getBidsByAuctionIdController(req, res) {
    try {
        const { auctionId } = req.params;

        const bids = await fetchBidsByAuctionId(auctionId);  // Updated function call
        res.status(200).json({
            success: true,
            message: "Successfully fetched bids for the auction",
            data: bids
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching bids",
            error: error.message
        });
    }
}

export async function getBidByIdController(req, res) {
    try {
        const { auctionId, userId } = req.params;

        const bid = await getBidByIdService(auctionId, userId);

        if (!bid) {
            return res.status(404).json({
                success: false,
                message: "No bid found for this auction and user",
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Successfully fetched bids for the auction",
            data: bid
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching bids",
            error: error.message
        });
    }
}
