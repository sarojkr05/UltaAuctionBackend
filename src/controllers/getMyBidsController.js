import Bid from '../schema/bidSchema.js'
export async function getMyBidsController(req, res) {
  try {
    const userId = req.user.id;

    const bids = await Bid.find({ userId })
      .populate("auctionId", "title status")
      .sort({ createdAt: -1 });

    const formatted = bids.map((bid) => ({
      auctionTitle: bid.auctionId?.title,
      auctionId: bid.auctionId?._id,
      bidAmount: bid.bidAmount,
      status: bid.status,
      paymentStatus: bid.paymentStatus || "pending",
    }));

    res.status(200).json({
      success: true,
      message: "User's bid history",
      data: formatted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user's bids",
      error: error.message,
    });
  }
}
