const db = require('../config/connection');
const { User, Products, Categories } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const categorySeeds = require('./categorySeeds.json');
const productSeeds = require('./productSeeds.json');

// Define a function to seed profiles
async function seedProfiles() {
  try {
    // Clear existing profiles if needed
    await cleanDB('User', 'usersSchema');

    // Seed profiles
    await User.create(profileSeeds);
    console.log('Profiles seeded successfully');
  } catch (err) {
    throw err;
  }
}

// Define a function to seed categories
async function seedCategories() {
  try {
    // Clear existing categories if needed
    await cleanDB('Category', 'categoriesSchema');

    // Seed categories
    // Replace 'Category' with the actual model name for categories
    await Categories.create(categorySeeds);
    console.log('Categories seeded successfully');
  } catch (err) {
    throw err;
  }
}

// Define a function to seed products
async function seedProducts() {
  try {
    // Clear existing products if needed
    await cleanDB('Product', 'productsSchema');

    // Seed products
    // Replace 'Product' with the actual model name for products
    await Products.create(productSeeds);
    console.log('Products seeded successfully');
  } catch (err) {
    throw err;
  }
}

db.once('open', async () => {
  try {
    // Seed profiles
    await seedProfiles();

    // Seed categories
    await seedCategories();

    // Seed products
    await seedProducts();

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});