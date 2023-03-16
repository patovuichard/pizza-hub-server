const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares.js");
const Order = require("../models/Order.model.js");

// GET "/api/order" --> get all orders from user
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const response = await Order.find({ orderOwner: req.payload._id })
      .populate("pizzaOrder");
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// POST "/api/order/pizza/:id" --> user creates an order
router.post("/pizza/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Order.create({
      pendingApproval: "pending",
      pizzaOrder: id,
      orderOwner: req.payload._id,
    });
    res.json("order created");
    // res.status(201).json()
  } catch (error) {
    next(error);
  }
});



module.exports = router;
