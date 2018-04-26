import Query from './query';
import User from './user';
import Mutation from './mutation';
import Subscription from './subscription';

const resolvers = {
  Query: { ...Query },
  User: { ...User },
  Mutation: { ...Mutation },
  Subscription: { ...Subscription },
};

export default resolvers;