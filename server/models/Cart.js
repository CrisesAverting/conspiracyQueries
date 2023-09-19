const { Schema, Types } = require('mongoose');

const cartSchema = new Schema(
  {
    itemName: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
    },
    
    quantity: {
      quantity: Number
    },

    image: {
      data: Buffer, // Store the binary image data
      contentType: String, // Store the content type of the image (e.g., "image/jpeg", "image/png")
    },

    price: {
      type: Number,
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = cartSchema;