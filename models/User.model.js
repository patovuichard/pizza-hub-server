const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    location: {
      address: String,
      city: String,
    },
    imageUrl: {
      type: String,
      default: "https://www.flaticon.com/free-icon/user_149071",
    },
    role: {
      type: String,
      enum: ["user", "restaurant"],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
