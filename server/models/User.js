const mongoose = require('mongoose');
const { Schema, Types, model } = require('mongoose');
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
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      required: true,
      unique: false,
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

usersSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Define a static method to create a new user
usersSchema.statics.createUser = async function (userData) {
  try {
    // Ensure that "email" and "password" are provided in the userData object
    if (!userData.email || !userData.password) {
      throw new Error("Email and password are required");
    }

    const user = new this(userData);
    return await user.save();
  } catch (error) {
    throw error;
  }
};
const User = mongoose.model('User', usersSchema);
module.exports = User;