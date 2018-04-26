import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const NOTIFICATION_TOPIC = 'notification';
export const REQUEST_SENT_TOPIC = 'request_sent';
export const REQUEST_ACCEPTED_TOPIC = 'request_accepted';

export const sendNotification = (userId, type, message) => {
  const notification = { userId, type, message };
  pubsub.publish(NOTIFICATION_TOPIC, { notification });
}