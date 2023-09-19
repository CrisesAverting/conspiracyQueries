const { Schema, Types } = require('mongoose');
const mongoose = require('mongoose');

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

// Define a static method to create a new category
categoriesSchema.statics.createCategory = async function (categoryData) {
  try {
    const category = new this(categoryData);
    return await category.save();
  } catch (error) {
    throw error;
  }
};
const Categories = mongoose.model('Categories', categoriesSchema);
module.exports = Categories;