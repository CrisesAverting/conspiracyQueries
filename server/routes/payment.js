// Importing necessary libraries and dependencies
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('process.env.STRIPE_SECRET_KEY');

// Defines the route handler for creating a payment intent
router.post('/create-payment-intent', async (req, res) => {
    const { amount, currency, payment_method } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method,
        confirm: true,
      });
      res.json({ paymentIntent });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;