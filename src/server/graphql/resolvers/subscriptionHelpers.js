// import { PubSub } from 'graphql-subscriptions';
import { PubSub } from 'apollo-server-express';

export const pubsub = new PubSub();

export const NOTIFICATION_TOPIC = 'notification';
export const REQUEST_SENT_TOPIC = 'request_sent';
export const REQUEST_ACCEPTED_TOPIC = 'request_accepted';

export const sendNotification = (userId, type, message) => {
  const id = '_' + Math.random().toString(36).substr(2,12);
  const notification = { userId, type, message, id };
  pubsub.publish(NOTIFICATION_TOPIC, { notification });
}
