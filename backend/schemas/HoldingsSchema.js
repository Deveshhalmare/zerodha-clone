const { Schema } = require("mongoose");

const HoldingsSchema = new Schema(
  {
    // Stock symbol
    name: {
      type: String,
      required: true,
    },

    // Number of shares
    qty: {
      type: Number,
      required: true,
    },

    // Average purchase price
    avg: {
      type: Number,
      required: true,
    },

    // Current stock price
    price: {
      type: Number,
      required: true,
    },

    // Overall profit/loss
    net: {
      type: String,
      default: "0%",
    },

    // Today's change
    day: {
      type: String,
      default: "0%",
    },

    // Owner of this holding
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { HoldingsSchema };