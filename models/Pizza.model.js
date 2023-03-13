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
      default: "https://res.cloudinary.com/drxbzntov/image/upload/v1678717809/pizza-hub/pizza-svgrepo-com_2_lapjte.png",
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
