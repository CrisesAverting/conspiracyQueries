
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
  signToken: function ({ email, username, userId }) {
    const payload = { email, username, userId };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
