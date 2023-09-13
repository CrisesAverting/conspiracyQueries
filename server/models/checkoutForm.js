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

  return (
    <div className="checkout-form">
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Zip Code:</label>
          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
        </div>
        {/* Add more form fields for additional information */}
        <label>
          Card details:
          <CardElement />
        </label>
        <div className="error-message">{errorMessage}</div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <h1>Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
