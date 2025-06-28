import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: [5, "Length of the title should atleast 5 characters long"],
      maxLength: [30, "Length of the title should atmost 30 characters long"],
    },
    description: {
      type: String,
      trim: true,
      minLength: [
        5,
        "Length of the description should atleast 5 characters long",
      ],
      maxLength: [
        40,
        "Length of the description should atmost 40 characters long",
      ],
    },
    startingBid: {
      type: Number,
      required: true,
    },
    endingBid: {
      type: Number,
      required: true,
      validate: {
        validator: function (val) {
          return val > this.startingBid;
        },
        message: "Ending bid must be greater than starting bid.",
      },
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled", "upcoming"],
      default: "active",
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    winnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    bids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid",
        default: []
      },
    ], // Reference to Bid Ids
    auctionImage: {
      type: String,
      default: null,
      required: false,
    },
    maxSlots: {
      type: Number,
      required: true,
    },
    slotsFilled: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Auction = mongoose.model("Auction", auctionSchema); //Auction Collection
