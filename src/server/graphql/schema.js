import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
  enum AllowedStates {
    available
    borrowed
    sold
  }

  type User {
    id: ID!
    googleId: ID!
    email: String
    name: String
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    owner: User!
    image: String,
    description: String
    added: String
    category: String
    toBorrow: Boolean
    toSell: Boolean
    state: AllowedStates
  }

  type Notification {
    userId: ID
    type: String
    message: String
  }

  type Request {
    id: ID
    requestType: String
    book: Book
    receiver: User
    sender: User
    message: String
    date: String
    accepted: Boolean
  }

  type Query {
    auth: User
    book(id: ID!): Book
    books: [Book]
    userBooks: [Book]
    requestsToUser: [Request]
    requestsFromUser: [Request]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      image: String
      description: String
      added: String
      category: String
      toBorrow: Boolean
      toSell: Boolean
      state: AllowedStates
    ): Book
    
    updateBook(
      id: ID!
      title: String!
      author: String!
      image: String
      description: String
      category: String
      toBorrow: Boolean
      toSell: Boolean
      state: AllowedStates
    ): Book

    removeBook(
      id: ID!
    ) : Book

    requestBook(
      bookId: ID!
      requestType: String!
      message: String
    ) : Request
  }

  
  type Subscription {
    notification(userId: ID!): Notification
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
