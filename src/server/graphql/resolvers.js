import { PubSub, withFilter } from 'graphql-subscriptions';
import mongoose from 'mongoose';

const Book = mongoose.model('Book');

const pubsub = new PubSub();

const NOTIFICATION_TOPIC = 'notification';

const sendNotification = (userId, type, message) => {
  const notification = { userId, type, message };
  pubsub.publish(NOTIFICATION_TOPIC, { notification });
}

export default {
  Query: {
    auth: (root, args, context) => {
      return context.user;
    },

    book: async (root, { id }) => {
      const book = await Book.findById(id);
      return book;
    },

    books: async () => {
      const books = await Book.find();
      return books;
    },

    userBooks: async (root, args, context) => {
      const books = await Book.find({ owner: context.user.id }).sort({added: 'descending'});
      return books;
    }
  },

  User: {
    books: async (user) => {
      const books = await Book.find({ owner: user.id });
      return books;
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const userId = context.user.id;
      const book = await (new Book({...args, owner: userId})).save();

      sendNotification(userId, 'success', `Successfully created ${book.title}.`);

      return book;
    },

    updateBook: async (root, { id, ...args }, context) => {
      const book = await Book.findByIdAndUpdate(id, { ...args }, { new: true });
      
      const userId = context.user.id;
      sendNotification(userId, 'success', `Successfully updated ${book.title}.`);
      
      return book;
    }
  },

  Subscription: {
    notification: {
      subscribe: withFilter(() => pubsub.asyncIterator(NOTIFICATION_TOPIC), (payload, variables) => {
        return payload.notification.userId == variables.userId;
      }),
    }
  }

};
