const { Schema, Types } = require('mongoose');
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
      unique: true,
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