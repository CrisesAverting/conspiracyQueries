const { Schema, Types } = require('mongoose');

const productsSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
    },
    productName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      default: 'null product name',
    },
    stock: {
      quantity: Number,
      status: String, // e.g., "In Stock", "Out of Stock", "Low Stock"
      restockDate: Date,
    },
    price: {
      type: Number,
    },
    categories: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Category', // Reference to the 'Category' model
        },
      ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = productsSchema;