const { Schema } = require('mongoose');

const categoriesSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
    },
     categoryName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      default: 'null user',
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = categoriesSchema;