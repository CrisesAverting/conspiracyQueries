const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/cq_DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = new ApolloServer({
  typeDefs, // Define your GraphQL schema type definitions here
  resolvers, // Define your GraphQL resolvers here
});

const startApolloServer = async () => {
  await server.start();

  // Middleware for parsing JSON and handling GraphQL requests
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server, { context: authMiddleware }));

  // Serve the production build of the client
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Start the server
  app.listen(port, () => {
    console.log(`API server running on port ${port}!`);
    console.log(`Use GraphQL at http://localhost:${port}/graphql`);
    console.log('Connected to MongoDB');
  });
};

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  // Import your Mongoose models here
  const Cart = require('./models/Cart');
  const Categories = require('./models/Categories');
  const Products = require('./models/Products');
  const User = require('./models/User');

  // Define routes to fetch data from MongoDB collections
  app.get('/api/carts', async (req, res) => {
    try {
      const carts = await Cart.find();
      res.json(carts);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/categories', async (req, res) => {
    try {
      const categories = await Categories.find();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/products', async (req, res) => {
    try {
      const products = await Products.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Stripe payment route
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
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Payment failed' });
    }
  });

  // Start the Apollo Server
  startApolloServer();
});

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