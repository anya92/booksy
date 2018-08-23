// import { withFilter } from 'graphql-subscriptions';
import { withFilter } from 'apollo-server-express';

import {
  pubsub,
  NOTIFICATION_TOPIC,
  REQUEST_SENT_TOPIC,
  REQUEST_ACCEPTED_TOPIC,
} from './subscriptionHelpers';

export default {
  notification: {
    subscribe: withFilter(() => pubsub.asyncIterator(NOTIFICATION_TOPIC), (payload, variables) => {
      return payload.notification.userId == variables.userId;
    }),
  },
  requestSent: {
    subscribe: withFilter(() => pubsub.asyncIterator(REQUEST_SENT_TOPIC), (payload, variables) => {
      return payload.requestSent.receiver == variables.userId;
    }),
  },
  requestAccepted: {
    subscribe: withFilter(() => pubsub.asyncIterator(REQUEST_ACCEPTED_TOPIC), (payload, variables) => {
      return payload.requestAccepted.sender.id == variables.userId;
    }),
  }
};
