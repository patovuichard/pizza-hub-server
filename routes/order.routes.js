const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares.js");
const Order = require("../models/Order.model.js");

// GET "/api/order" --> get all orders from user
router.get("/", isAuthenticated, async (req, res, next) => {
  // console.log(req.payload);
  try {
    const response = await Order.find({ orderOwner: req.payload._id });
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// POST "/api/order/:pizzaId" --> user creates an order
router.post("/:pizzaId", isAuthenticated, async (req, res, next) => {
  // console.log(req.payload);
  // console.log(req.params)
  const { pizzaId } = req.params;
  try {
    await Order.create({
      pendingApproval: "pending",
      pizzaOrder: pizzaId,
      orderOwner: req.payload._id,
    });
    res.json("order created");
    // res.status(201).json()
  } catch (error) {
    next(error);
  }
});



module.exports = router;
