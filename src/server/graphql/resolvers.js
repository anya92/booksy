import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

export default {
  Query: {
    auth: (root, args, context) => {
      return context.user;
    },
  },

};
