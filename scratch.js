const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const stripe = require('stripe')('process.env.STRIPE_SECRET_KEY');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
typeDefs,
resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
await server.start();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server, {
  context: authMiddleware
}));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});
};
app.use('/server', require('./routes/payment'));

// Call the async function to start the server
startApolloServer();

// Define stripe payment route
app.post('/routes/payment', async (req, res) => {
try {
  const { amount, currency, paymentMethod } = req.body;

  // Create a payment intent using Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method: paymentMethod,
    confirm: true,
  });

  // Payment was successful
  res.status(200).json({ message: 'Payment successful', paymentIntent });
  //Payment was unsuccessful
} catch (error) {
  console.error('Error processing payment:', error);
  res.status(500).json({ error: 'Payment failed' });
}
});