const { Schema, Types, model } = require('mongoose');

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

// Define a static method to create a new product
productsSchema.statics.createProduct = async function (productData) {
  try {
    const product = new this(productData);
    return await product.save();
  } catch (error) {
    throw error;
  }
};

module.exports = model('Product', productsSchema);
