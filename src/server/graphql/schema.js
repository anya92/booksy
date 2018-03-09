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
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    owner: User!
    image: String,
    description: String
    added: String
    tags: [String]
    toBorrow: Boolean
    toSell: Boolean
    state: AllowedStates
  }

  type Query {
    auth: User
    book(id: ID!): Book
    books: [Book]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      image: String,
      description: String
      added: String
      tags: [String]
      toBorrow: Boolean
      toSell: Boolean
      state: AllowedStates
    ) : Book
  }

`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
