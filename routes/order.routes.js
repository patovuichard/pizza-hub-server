const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares.js");
const Order = require("../models/Order.model.js");

// GET "/api/order" --> get all orders from user
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const response = await Order.find({ orderOwner: req.payload._id })
      .populate("pizzaOrder");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET "/api/order/restaurant" --> get all orders from user
router.get("/restaurant", isAuthenticated, async (req, res, next) => {
  try {
    const response = await Order.find({ pizzaOwner: req.payload._id })
      .populate("pizzaOrder");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// POST "/api/order/pizza/:id" --> user creates an order
router.post("/pizza/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const {ownerId} = req.body
  try {
    await Order.create({
      pendingApproval: "pending",
      pizzaOrder: id,
      orderOwner: req.payload._id,
      pizzaOwner: ownerId,
    });
    res.json("order created");
    // res.status(201).json()
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/order/:id" --> client cancels order
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id)
    res.json("order removed")
  } catch (error) {
    next(error)
  }
})

module.exports = router;
