const { Schema, model } = require("mongoose");

const pizzaSchema = new Schema(
  {
    pizzaname: {
      type: String,
      required: true,
    },
    sauce: {
      type: String,
      enum: ["red", "white", "none"],
    },
    ingredients: [String],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Pizza = model("Pizza", userSchema);

module.export = Pizza;
