//TODO make sure that the params in the signToken are what we want to pass in 

const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'Happy Haloween';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
