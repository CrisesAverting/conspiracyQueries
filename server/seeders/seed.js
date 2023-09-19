const db = require('../config/connection');
const { User, Products, Categories } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const categorySeeds = require('./categorySeeds.json');
const productSeeds = require('./productSeeds.json');
const cleanDB = require("./cleanDB");

// Add a flag to track whether seeding has occurred
let seedingComplete = false;

// Define a function to seed profiles
async function seedProfiles() {
  try {
    // Clear existing profiles if needed
    await cleanDB('User', 'usersSchema');

    // Seed profiles individually
    for (const seed of profileSeeds) {
      await User.createUser(seed);
    }

    console.log('Profiles seeded successfully');
  } catch (err) {
    throw err;
  }
}


// Define a function to seed categories
async function seedCategories() {
  try {
    // Clear existing categories if needed
    await cleanDB('Categories', 'categoriesSchema');

    // Seed categories
    // Replace 'Category' with the actual model name for categories
    await Categories.createCategory(categorySeeds);
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
    // Check if seeding has already been completed
    if (!seedingComplete) {
      // Seed profiles
      await seedProfiles();

      // Seed categories
      await seedCategories();

      // Seed products
      await seedProducts();

      console.log('All done!');
      seedingComplete = true; // Set the flag to true to prevent further execution
      process.exit(0);
    }
  } catch (err) {
    throw err;
  }
});
