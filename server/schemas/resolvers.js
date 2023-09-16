const {User, Categories, Products, Cart  } = require('../models'); // Import your Mongoose models

const {signToken, AuthenticationError} = require ('../src/utils/auth');

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
        return await Categories.find();
      } catch (error) {
        throw new Error('Error fetching categories');
      }
    },

    // Resolver for getting all products
    getAllProducts: async () => {
      try {
        return await Products.find().populate('Categories');
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
    createUser: async (_, { username, email, password }) => {
      const profile = await User.create({ username, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (_, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }
      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },


    
    // Define your mutation resolvers here
    // Example: createUser, createCategory, createProduct, createCartItem
  },
};

module.exports = resolvers;
