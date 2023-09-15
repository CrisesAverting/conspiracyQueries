const { Users, Categories, Products, Cart  } = require('../models'); // Import your Mongoose models

const resolvers = {
  Query: {
    // Resolver for getting a user by ID
   
   
   
    getUserById: async (_, { userId }) => {
      try {
        return await Users.findById(userId);
      } catch (error) {
        throw new Error('Error fetching user by ID');
      }
    },

    // Resolver for getting all categories
    getAllCategories: async () => {
      try {
        return await Categories.find();
      } catch (error) {
        throw new Error('Error fetching categories');
      }
    },

    // Resolver for getting all products
    getAllProducts: async () => {
      try {
        return await Products.find().populate('categories');
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
