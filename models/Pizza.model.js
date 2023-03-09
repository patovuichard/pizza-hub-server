const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
  {
    pizzaName: {
      type: String,
      required: true,
    },
    sauce: {
      type: String,
      enum: ["red", "white", "none"],
    },
    ingredients: [String],
    imageUrl: {
      type: String,
      default: "https://www.flaticon.com/free-icon/user_149071",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
