const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    pendingApproval: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
    },
    pizzaOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
    },
    orderOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
