import { createAuctionRepo, deleteAuctionById, getAuctionById, getAuctionRepo, updateAuctionById, updateAuctionRepo } from "../repositories/auctionRepository.js";
import cloudinary from "../config/cloudinaryConfig.js";
import {InternalServerError} from '../utils/internalServerError.js'
import { Auction } from "../schema/auctionSchema.js";
import fs from 'fs/promises';

// export async function createAuctionService(auctionData) {
//     try {
//         const response = await createAuctionRepo(auctionData)
//         if(!response) {
//             console.log("response from service", response)
//         }
//         return response;
//     } catch (error) {
//         console.log(error)
//     }
// }

export async function createAuctionService(auctionData) {
    const imagePath = auctionData.imagePath;
    if(imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var auctionImage = cloudinaryResponse.secure_url;
            console.log("Cloudinary URL: ", auctionImage);
            // Optionally remove local file if needed (don't forget to import 'fs')
            await fs.unlink(process.cwd() + "/" + imagePath);
        } catch(error) {
            console.log(error);
            throw new InternalServerError();
        }
    }

    // 2. Then use the url from cloudinary and other propduct details to add product in db
    const auction = await createAuctionRepo({
        ...auctionData,
        auctionImage: auctionImage
    });

    console.log(auction);
        
    return auction;
}

export async function getAuctionService(filters) {
    try {
        console.log("Filters received in service:", filters); //debuggin 
        const response = await getAuctionRepo(filters)
        if (!response || response.length === 0) {
            console.log("Couldn't get response from service", response);
        } else {
            console.log("Auctions found:", response);
        }
        return response;
    } catch (error) {
        console.log("Error in getAuctionService", error)
    }
}
// this is the previouse one 

// export async function declareWinnerService(auctionId) {



//     const auction = await getAuctionRepo({ _id: auctionId, status: "active" });

//     if (!auction.length) throw new Error("Auction not found or already completed.");

//     console.log("Auction found:", auction[0]); // Debugging
    
//     const bidCounts = {};
//     auction[0].bids.forEach(bid => {
//         console.log("Processing bid:", bid); // Debugging
//         bidCounts[bid.bidAmount] = (bidCounts[bid.bidAmount] || 0) + 1;
//     });

//     let lowestUniqueBid = null;
//     let winningUser = null;

//     for (const bid of auction[0].bids) {
//         if (bidCounts[bid.bidAmount] === 1) { // Check if bid is unique
//             if (lowestUniqueBid === null || bid.bidAmount < lowestUniqueBid) {
//                 lowestUniqueBid = bid.bidAmount;
//                 winningUser = bid.userId;
//             }
//         }
//     }

//     if (!winningUser) {
//         throw new Error("No valid unique bid found.");
//     }

//     return await updateAuctionRepo(auctionId, { status: "completed", winnerId: winningUser });
// }

export const declareWinnerService = async (auctionId) => {
  try {
    const auction = await Auction.findById(auctionId).populate("bids")

    if (!auction || auction.bids.length === 0) {
      throw new Error("No bids found for this auction");
    }

    const bidFrequency = new Map();
    auction.bids.forEach((bid) => {
      bidFrequency.set(
        bid.bidAmount,
        (bidFrequency.get(bid.bidAmount) || 0) + 1
      );
    });

    // Step 1: Disqualify duplicated bids
    for (const bid of auction.bids) {
      if (bidFrequency.get(bid.bidAmount) > 1) {
        bid.status = "disqualified";
        await bid.save();
      }
    }

    // Step 2: Get only unique bids
    const uniqueBids = auction.bids.filter(
      (bid) => bidFrequency.get(bid.bidAmount) === 1
    );

    if (uniqueBids.length === 0) {
      throw new Error("No unique bids found. All lowest bids are duplicated.");
    }

    // Step 3: Sort and pick lowest unique
    uniqueBids.sort((a, b) => a.bidAmount - b.bidAmount);
    const lowestAmount = uniqueBids[0].bidAmount;
    const finalBids = uniqueBids.filter(
      (bid) => bid.bidAmount === lowestAmount
    );
    finalBids.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    const winnerBid = finalBids[0];
    winnerBid.status = "winner";
    await winnerBid.save();

    // ✅ Call repository to update and populate winnerId
    const updatedAuction = await updateAuctionRepo(auctionId, {
      winnerId: winnerBid.userId,
      status: "completed",
    });

    return updatedAuction;
  } catch (error) {
    throw new Error(error.message);
  }
};


export async function getAuctionByIdService(auctionId) {
    const auction = await getAuctionById(auctionId)
    if(!auction) {
        const error = new Error("Auction not found!")
        error.statusCode = 404;
        throw error;
    }
    return auction
}

export async function updateAuctionByIdService(auctionId, updatedData) {
    // const updatedAuction = await updateAuctionById(auctionId, updatedData);
    const imagePath = updatedData.imagePath;
    if(imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var auctionImage = cloudinaryResponse.secure_url;
            console.log("Cloudinary URL: ", auctionImage);
            // Optionally remove local file if needed (don't forget to import 'fs')
            await fs.unlink(process.cwd() + "/" + imagePath);

            // add cloudinary image to URL to update data
            updatedData.auctionImage = auctionImage;
        } catch(error) {
            console.log(error);
            throw new InternalServerError();
        }
    }
    const auction = await updateAuctionById(
        auctionId,
        {
            ...updatedData,
            auctionImage:  auctionImage
        }
    );

    console.log(auction);
        
    return auction;
}

export async function deleteAuctionByIdService(auctionId) {
    const deleted = await deleteAuctionById(auctionId)
    if(!deleted) {
        const error = new Error('Auction not found')
        error.statusCode = 404;
        throw error
    }
    return deleted;
}