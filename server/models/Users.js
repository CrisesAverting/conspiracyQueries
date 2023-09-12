const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      default: 'null user',
    },
    password: {
      type: String, // Change the type to String
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Middleware to hash the password before saving
usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10); // Salt rounds: 10
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = usersSchema;