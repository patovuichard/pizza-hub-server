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

const Order = model("Order", userSchema);

module.export = Order;
