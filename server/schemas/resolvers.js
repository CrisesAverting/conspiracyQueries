const { User } = require('../models'); // Import your Mongoose models
const { AuthenticationError } = require('../utils/auth');

const createUser = async (username, email, password) => {
  try {
    const profile = await User.create({ username, email, password });
    const token = signToken(profile);
    return { token, profile };
  } catch (error) {
    throw new Error('Error creating user');
  }
};

const resolvers = {
  Query: {
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
      throw new AuthenticationError('User not authenticated');
    },
  },

  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        return await createUser(username, email, password);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    login: async (_, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('User not found');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(profile);
      return { token, profile };
    },
  },
};

module.exports = resolvers;
