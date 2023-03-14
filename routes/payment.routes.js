const Pizza = require("../models/Pizza.model");

const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // make sure to add your Stripe Secret Key to the .env

router.post("/create-payment-intent", async (req, res) => {

  const productId = req.body._id; // this is how we will receive the productId the user is trying to purchase. This can also later be set to receive via params.

  try {

    // TODO . this is where you will later get the correct price to be paid
    const product = await Pizza.findById(productId)
    const priceToPay = (product.price) * 100
    const desriptionPurchase = `Pizza `+product.pizzaName

    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceToPay,
      currency: "eur",
      description: desriptionPurchase,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // TODO on part 2. this is where you will later create a Payment Document
  
    res.send({
      clientSecret: paymentIntent.client_secret, // the client secret will be sent to the FE after the stripe payment intent creation
    });
    
  } catch (error) {
    next(error)
  }
});

module.exports = router