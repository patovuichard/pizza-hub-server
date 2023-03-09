const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    pendingApproval: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
    },
    pizzaOrder: {
      type: Schema.Types.ObjectId,
      ref: "Pizza",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = model("Order", orderSchema);

module.exports = OrderModel;
