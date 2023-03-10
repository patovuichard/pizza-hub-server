const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes.js");
router.use("/auth", authRoutes);

const userRoutes = require("./user.routes.js");
router.use("/user", userRoutes);

const pizzaRoutes = require("./pizza.routes.js");
router.use("/pizza", pizzaRoutes);

const orderRoutes = require("./order.routes.js");
router.use("/order", orderRoutes);

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

const paymentRoutes = require("./payment.routes")
router.use("/payment", paymentRoutes)

module.exports = router;
