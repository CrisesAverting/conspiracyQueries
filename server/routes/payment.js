// Importing necessary libraries and dependencies
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('pk_test_51NrpCVAfneJf8QWT3O6RGPajFGTDZGtIknR0lr7hWnyVoNb4Au92k192pYuhpwpug2mHvODqno5EiFPPKHsCgkhm005yrMjYBk');

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