import { createAuctionService, declareWinnerService, deleteAuctionByIdService, getAuctionByIdService, getAuctionService, updateAuctionByIdService } from "../services/auctionService.js";

export async function createAuctionController(req, res) {
    try {
        // merge file path into auction data
        const auctionData = {
            ...req.body,
            imagePath: req.file ? req.file.path : null  // Ensure imagePath is set if file exists
        };
        const auction = await createAuctionService(auctionData);
        return res.status(201).json({
            success: true,
            message: "Auction created successfully",
            data: auction,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating auction",
            error: error.message
        })
    }
}

export async function getAuctionController(req, res) {
    try {
        const auctions = await getAuctionService(req.query);
        console.log(auctions)
        return res.status(200).json({
            success: true,
            message: "Auction fetched successfully",
            data: auctions,
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: "Error fetching the auctions",
            error: error.message
        })
    }
}

export async function declareWinnerController(req, res) {
    try {
        const auctions = await declareWinnerService(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Auction updated successfully",
            data: auctions,
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: "Error declaring winner",
            error: error.message
        })
    }
}

export async function getAuctionByIdController(req, res, next) {
    try {
        const auctionId = req.params.id;
        const auction = await getAuctionByIdService(auctionId)
        res.status(200).json({
            success: true,
            message: "Auction fetched successfully!",
            data: auction
        })
    } catch (error) {
        next(error) // Passes the centralized error handler
    }
}

// export async function updateAuctionByIdController(req, res, next) {
//     try {
//         const auctionId = req.params.id;

//         // Prepare updatedData object
//         const updatedData = {
//             title: req.body.title,
//             description: req.body.description,
//             status: req.body.status,
//             sellerId: req.body.sellerId,
//             imagePath: req.file ? req.file.path : undefined
//         };

//         // Convert only if value is present and a valid number
//         if (req.body.startingBid && !isNaN(req.body.startingBid)) {
//             updatedData.startingBid = Number(req.body.startingBid);
//         }

//         if (req.body.maxSlots && !isNaN(req.body.maxSlots)) {
//             updatedData.maxSlots = Number(req.body.maxSlots);
//         }

//         // Clean up empty strings and undefined values
//         Object.keys(updatedData).forEach((key) => {
//             if (
//                 updatedData[key] === undefined ||
//                 updatedData[key] === null ||
//                 updatedData[key] === ""
//             ) {
//                 delete updatedData[key];
//             }
//         });

//         const updatedAuction = await updateAuctionByIdService(auctionId, updatedData);
//         res.status(200).json({
//             success: true,
//             message: "Auction updated successfully!",
//             data: updatedAuction
//         });
//     } catch (error) {
//         next(error);
//     }
// }
 export async function updateAuctionByIdController(req, res, next) {
    try {
        const auctionId = req.params.id;

        const updatedData = {
            ...req.body,
            imagePath: req.file ? req.file.path : null // ✅ Correct field name
        };

        console.log("Updated Data:", updatedData);

        // Optional type checks
        if (req.body.startingBid && !isNaN(req.body.startingBid)) {
            updatedData.startingBid = Number(req.body.startingBid);
        }

        if (req.body.maxSlots && !isNaN(req.body.maxSlots)) {
            updatedData.maxSlots = Number(req.body.maxSlots);
        }

        if (req.body.bidIncrement && !isNaN(req.body.bidIncrement)) {
            updatedData.bidIncrement = Number(req.body.bidIncrement);
        }

        if (req.body.endTime) {
            updatedData.endTime = new Date(req.body.endTime);
        }

        // 🧹 Remove undefined fields so existing data isn't overwritten
        Object.keys(updatedData).forEach(key => {
            if (updatedData[key] === undefined) delete updatedData[key];
        });

        const updatedAuction = await updateAuctionByIdService(auctionId, updatedData);

        res.status(200).json({
            success: true,
            message: "Auction updated successfully!",
            data: updatedAuction
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteAuctionByIdController(req, res, next) {
    try {
        const auctionId = req.params.id;
        await deleteAuctionByIdService(auctionId);
        res.status(200).json({
            success: true,
            message: "Auction deleted successfully",
            data: {}
        })
    } catch (error) {
        next(error)
    }
}