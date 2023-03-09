const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares.js");
const Pizza = require("../models/Pizza.model.js")


// GET "/api/pizza" --> get all pizzas (name and picture)
router.get("/", async (req, res, next) => {
  try {
    const response = await Pizza.find()
    // .select({pizzaName: true, imageUrl: true})
    console.log(response);
    res.json(response)
  } catch (error) {
    next(error)
  }
})

// POST "/api/pizza" --> create a new pizza
router.post("/", isAuthenticated, async (req, res, next) => {
  console.log(req.body);
  // console.log(req.payload);
  const { pizzaName, imageUrl, sauce, ingredients, owner } = req.body
  try {
    await Pizza.create({
      pizzaName: pizzaName,
      imageUrl: imageUrl,
      sauce: sauce,
      ingredients: ingredients,
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
router.get("/:id", isAuthenticated, async (req, res, next) => {
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
  const { pizzaName, imageUrl, sauce, ingredients, owner } = req.body
  try {
    await Pizza.findByIdAndUpdate( id, {
      pizzaName: pizzaName,
      imageUrl: imageUrl,
      sauce: sauce,
      ingredients: ingredients,
      owner: req.payload._id,
      // owner: owner,
    })
    res.json("pizza modified")
  } catch (error) {
    next(error)  
  }
})

module.exports = router;
