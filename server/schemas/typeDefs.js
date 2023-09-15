const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    userId: ID!
    username: String!
    email: String!
    createdAt: String!
  }

  type Category {
    categoryId: ID!
    categoryName: String!
  }

  type Stock {
    quantity: Int
    status: String
    restockDate: String
  }

  type Product {
    productId: ID!
    productName: String!
    stock: Stock
    price: Float
    categories: [Category]
  }

  type Cart {
    itemName: ID!
    quantity: Int
    image: String # You can store the image URL here if you want
    price: Float
  }

  type Query {
    # Define your queries here
    getUserById(userId: ID!): User
    getAllCategories: [Category]
    getAllProducts: [Product]
    getAllCartItems: [Cart]
  }

  type Mutation {
    # Define your mutations here
    createUser(username: String!, email: String!, password: String!): User
    createCategory(categoryName: String!): Category
    createProduct(
      productName: String!
      stock: StockInput
      price: Float
      categories: [ID]
    ): Product
    createCartItem(
      itemName: String!
      quantity: Int
      image: String
      price: Float
    ): Cart
  }

  input StockInput {
    quantity: Int
    status: String
    restockDate: String
  }
`;

module.exports = typeDefs;
