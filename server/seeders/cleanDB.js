const mongoose = require('mongoose');

module.exports = async (collectionName) => {
  try {
    console.log("Those collections are sparkling clean!")
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionExists = collections.some(
      (collection) => collection.name === collectionName
    );

    if (collectionExists) {
      await mongoose.connection.db.collection(collectionName).drop();
    }
  } catch (err) {
    throw err;
  }
};