const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares.js");
const User = require("../models/User.model.js");

// GET "/api/user" -->  get all data from authenticated user
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id)
      .select({ password: 0 })
      .populate("favouritePizzas");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/user" --> modify data from authenticated user
router.patch("/", isAuthenticated, async (req, res, next) => {
  const { firstName, lastName, imageUrl, address, city, coordinates } =
    req.body;
  try {
    await User.findByIdAndUpdate(req.payload._id, {
      firstName,
      lastName,
      imageUrl,
      address,
      city,
      coordinates,
    });
    res.json("user modified");
  } catch (error) {
    next(error);
  }
});

// GET "/api/user/:id" --> get some data from user with "id"
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const restaurant = await User.findById(id).select({
      password: 0,
    });
    res.json(restaurant);
  } catch (error) {
    next(error);
  }
});

// GET "/api/user/restaurant/all" --> get some data from all Pizzerias
router.get("/restaurant/all", async (req, res, next) => {
  try {
    const pizzerias = await User.find({ role: "Restaurant" }).select({
      password: 0,
    });
    res.json(pizzerias);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/user" --> remove user from DB
router.delete("/", isAuthenticated, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.payload._id);
    res.json("user eliminated");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
