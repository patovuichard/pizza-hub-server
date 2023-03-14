const Pizza = require("../models/Pizza.model");

const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // make sure to add your Stripe Secret Key to the .env
const Payment = require("../models/Payment.model.js")

router.post("/create-payment-intent", async (req, res) => {

  const productId = req.body._id; // this is how we will receive the productId the user is trying to purchase. This can also later be set to receive via params.

  try {
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

    await Payment.create({
      price: priceToPay,
      product: productId,
      status: "incomplete",
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      buyer: req.payload, // example to add who bought the product (not done in this example)
    })
  
    res.send({
      clientSecret: paymentIntent.client_secret, // the client secret will be sent to the FE after the stripe payment intent creation
    });
    
  } catch (error) {
    next(error)
  }
});

router.patch("/update-payment-intent", async (req, res, next) => {
  const { clientSecret, paymentIntentId } = req.body;

  try {

    await Payment.findOneAndUpdate({
      clientSecret: clientSecret,
      paymentIntentId: paymentIntentId,
    },{ 
      status: "succeeded" 
    });

    res.status(200).json();

  } catch (error) {
    next(error);
  }
});

module.exports = router