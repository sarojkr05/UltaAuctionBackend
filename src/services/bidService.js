import { createBidRepo, getBidByid, getBidsByAuctionId } from "../repositories/bidRepository.js";
import { Auction } from "../schema/auctionSchema.js";
import Bid from "../schema/bidSchema.js"

// export async function placeBidService(auctionId, userId, bidAmount) {
//     try {
//         // check if the user already placed a bid on this auction

//         const existingBid = await Bid.findOne({ userId, auctionId })

//         if(existingBid) {
//             throw new Error("You have already placed a bid on this auction.")
//         }

//         const newBid = await createBidRepo({auctionId, userId, bidAmount});

//         await newBid.save();

//         // update the auctin document by pushing the new bid id

//         await Auction.findByIdAndUpdate(auctionId, {
//             $push: {bids: newBid._id} // ensure bids exist in Auction schema...
//         })
//         return newBid;
//     } catch (error) {
//         console.error("Error in placing bid Service", error)
//         throw error
//     }
// }

export async function placeBidService(auctionId, userId, bidAmount) {
    try {
      // Check if auction exists
      console.log("Received auctionId for lookup:", auctionId);
      const auction = await Auction.findById(auctionId).populate('bids');
  
      if (!auction) {
        throw new Error("Auction not found.");
      }
  
      // Check if user has already placed a bid
      const existingBid = await Bid.findOne({ userId, auctionId }).lean();
  
      if (existingBid) {
        throw new Error("You have already placed a bid on this auction.");
      }
  
      // Check if auction is full
      if (auction.bids.length >= auction.maxSlots) {
        throw new Error("Auction slots are full. No more bids allowed.");
      }
  
      // Place the bid
      const newBid = await createBidRepo({ auctionId, userId, bidAmount });
    
      // Update auction document by pushing the new bid ID
      await Auction.findByIdAndUpdate(auctionId, {
        $push: { bids: newBid._id },
        $inc: { slotsFilled: 1 } // To increment slot count
      });
  
      return newBid;
    } catch (error) {
      console.error("Error in placing bid Service", error);
      throw error;
    }
  }
  

export async function fetchBidsByAuctionId(auctionId) {  // Renamed function to avoid confusion
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