const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares.js");
const Pizza = require("../models/Pizza.model.js");
const User = require("../models/User.model.js");


// GET "/api/pizza" --> get all pizzas (name and picture)
router.get("/", async (req, res, next) => {
  try {
    const response = await Pizza.find()
    // .select({pizzaName: true, imageUrl: true})
    // console.log(response);
    res.json(response)
  } catch (error) {
    next(error)
  }
})

// POST "/api/pizza" --> create a new pizza
router.post("/", isAuthenticated, async (req, res, next) => {
  console.log(req.body);
  // console.log(req.payload);
  const { pizzaName, imageUrl, sauce, ingredients, price } = req.body
  try {
    await Pizza.create({
      pizzaName: pizzaName,
      imageUrl: imageUrl,
      sauce: sauce,
      ingredients: ingredients,
      price: price,
      owner: req.payload._id,
      // owner: owner,
    })
    // res.json("pizza creada")
    res.status(200).json()
  } catch (error) {
    next(error)
  }
})

// GET "/api/pizza/:id" --> get all info about one pizza by ID
router.get("/:id", async (req, res, next) => {
  const {id} = req.params
  try {
    const response = await Pizza.findById( id )
    // .populate("owner")
    // console.log(response)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

// POST "/api/pizza/:id" --> add pizza to favourite pizzas
router.post("/:id", isAuthenticated, async (req, res, next)  => {
  const {id} = req.params
  try {
    await User.findByIdAndUpdate(req.payload._id,{
      $addToSet: { favouritePizzas: id}
    })
    res.json("Pizza added to favs")
  } catch (error) {
    next(error)
  }
})

// POST "/api/pizza/:id/remove" --> add pizza to favourite pizzas
router.post("/:id/remove", isAuthenticated, async (req, res, next)  => {
  const {id} = req.params
  try {
    await User.findByIdAndUpdate(req.payload._id,{
      $pull: { favouritePizzas: id}
    })
    res.json("Pizza removed from favs")
  } catch (error) {
    next(error)
  }
})

// DELETE "/api/pizza/:id" --> delete one pizza by ID
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const {id} = req.params
  try {
    await Pizza.findByIdAndDelete( id )
    res.json("pizza eliminated")
  } catch (error) {
    next(error)
  }
})

// PATCH "/api/pizza/:id" --> modify one pizza by ID
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const {id} = req.params
  const { pizzaName, imageUrl, sauce, ingredients, price } = req.body
  try {
    await Pizza.findByIdAndUpdate(id, {
      pizzaName: pizzaName,
      imageUrl: imageUrl,
      sauce: sauce,
      ingredients: ingredients,
      price: price,
      owner: req.payload._id,
    })
    res.json("pizza modified")
  } catch (error) {
    next(error)  
  }
})

// GET "/api/pizza/owner/:id" --> get all pizzas from one restaurant
router.get("/owner/:ownerId", async (req, res, next) => {
  const { ownerId } = req.params
  try {
    const pizzas = await Pizza.find({owner: ownerId})
    res.json(pizzas)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
