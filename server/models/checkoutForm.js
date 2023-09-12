import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('insert key when I sign up');

const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to wrap your component with Elements.
      return;
    }
  
    setLoading(true);
    setErrorMessage('');
  
    const { token, error } = await stripe.createToken(elements.getElement(CardElement));
  
    if (error) {
      console.error(error);
      setErrorMessage(error.message);
      setLoading(false);
    } else {
      // Need to send the token to the server for payment processing
  
      try {
        const response = await fetch('/charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token.id, amount: 1000 }), // Example: sending the token and an amount
        });
  
        if (response.ok) {
          // When payment is successful
          console.log('Payment successful!');
        } else {
          // When payment is not successful
          console.error('Payment failed.');
        }
      } catch (error) {
        // Handle network errors or other issues that may occur during the fetch.
        console.error('Payment error:', error);
      }
  
      setLoading(false);
    }
  };