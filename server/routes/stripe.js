require("dotenv").config();
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Product = require("../models/Product");
const Order = require("../models/Order");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/create-checkout-session", verifyToken, async (req, res) => {
  const { products } = req.body;
  const lineItems = await Promise.all(
    products.map(async (product) => {
      const item = await Product.findById(product._id);
      return {
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: product.quantity,
      };
    })
  );
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/error`,
    });
    const order = new Order({ products, stripeid: session.id });
    await order.save();
    res.status(200).json({ stripeSession: session });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      payment_method_types: ['card']
    })
    return res.status(201).json({ clientSecret: paymentIntent.client_secret, paymentIntent })
  } catch (error) {
    return res.status(404).json({ error, msg: "Error while creating payment" })
  }
})

module.exports = router;