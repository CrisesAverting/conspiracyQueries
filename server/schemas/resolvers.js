const {User, Categories, Products, Cart  } = require('../models'); // Import your Mongoose models

const {signToken, AuthenticationError} = require ('../utils/auth');

const findUserByEmail = async (email) => {
console.log(email)
  try {
    return await User.findOne({ email });
  } catch (error) {
      throw new Error('Error finding user by email');
  }
};

const createUser = async (username, email, password) => {
  try {
    const profile = await User.create({ username, email, password });
   console.log(profile)
    const token = signToken(profile);
    return { token, profile };
  } catch (error) {
    throw new Error('Error creating user');
  }
};

const resolvers = {
  Query: {
    // Resolver for getting a user by ID
    // 
    profiles: async () => {
      return User.find();
    },
   
    profile: async (_, { profileId }) => {
      return User.findOne({ userId: profileId });
    },
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ userId: context.user.userId });
        }
        throw AuthenticationError;
      },
  },
  
  
  
      //   getUserById: async (_, { userId }) => {
  //     try {
  //       return await User.findById(userId);
  //     } catch (error) {
  //       throw new Error('Error fetching user by ID');
  //     }
  //   },

  //   // Resolver for getting all categories
  //   getAllCategories: async () => {
  //     try {
  //       return await Categories.find();
  //     } catch (error) {
  //       throw new Error('Error fetching categories');
  //     }
  //   },

  //   // Resolver for getting all products
  //   getAllProducts: async () => {
  //     try {
  //       return await Products.find().populate('Categories');
  //     } catch (error) {
  //       throw new Error('Error fetching products');
  //     }
  //   },

  //   // Resolver for getting all cart items
  //   getAllCartItems: async () => {
  //     try {
  //       return await Cart.find();
  //     } catch (error) {
  //       throw new Error('Error fetching cart items');
      // }
    
  

  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try{
      // const profile = await User.create({ username, email, password });
      // const token = signToken(profile);

      return await createUser(username, email, password);
      // { token, profile };
    } catch(error) {
    //  console.log(profile)
      // throw new Error(error.message);
    }
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
}
module.exports = resolvers;
