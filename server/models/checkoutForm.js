import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    zipCode: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const stripe = await stripePromise; // Get the stripe object
    const elements = useElements(); // Get the elements object

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
          body: JSON.stringify({ token: token.id, amount: 1000 }),
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
        <div className="form-group">
          <label>Card details:</label>
          <CardElement />
        </div>
        <div className="error-message">{errorMessage}</div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;


