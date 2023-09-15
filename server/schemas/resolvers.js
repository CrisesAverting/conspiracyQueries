const User = require('./models/User'); // Import your Mongoose models
const Category = require('./models/Category');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

const resolvers = {
  Query: {
    // Resolver for getting a user by ID
    getUserById: async (_, { userId }) => {
      try {
        return await User.findById(userId);
      } catch (error) {
        throw new Error('Error fetching user by ID');
      }
    },

    // Resolver for getting all categories
    getAllCategories: async () => {
      try {
        return await Category.find();
      } catch (error) {
        throw new Error('Error fetching categories');
      }
    },

    // Resolver for getting all products
    getAllProducts: async () => {
      try {
        return await Product.find().populate('categories');
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },

    // Resolver for getting all cart items
    getAllCartItems: async () => {
      try {
        return await Cart.find();
      } catch (error) {
        throw new Error('Error fetching cart items');
      }
    },
  },

  Mutation: {
    // Define your mutation resolvers here
    // Example: createUser, createCategory, createProduct, createCartItem
  },
};

module.exports = resolvers;
