const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes.js");
router.use("/auth", authRoutes);

const pizzaRoutes = require("./pizza.routes.js");
router.use("/pizza", pizzaRoutes);

module.exports = router;
