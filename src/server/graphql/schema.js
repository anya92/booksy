import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
  type User {
    googleId: ID!
    email: String
    name: String
  }

  type Query {
    auth: User
  }

`;

export default makeExecutableSchema({ typeDefs, resolvers });
