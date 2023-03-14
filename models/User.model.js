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
    coordinates: [Number], // this array will hold only two numeric values: [latitude, longitude]
    address: String,
    city: String,
    imageUrl: {
      type: String,
      default: "https://res.cloudinary.com/drxbzntov/image/upload/v1678715180/pizza-hub/yvrxu9nsbipxxls53ph3.png",
    },
    role: {
      type: String,
      enum: ["Client", "Restaurant"],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
