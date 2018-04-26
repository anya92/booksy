import { makeExecutableSchema } from 'graphql-tools';

import Query from './query';
import Mutation from './mutation';
import Subscription from './subscription';

import resolvers from '../resolvers';

const typeDefs = [
  Query,
  Mutation,
  Subscription,
];

module.exports = makeExecutableSchema({ typeDefs, resolvers });
