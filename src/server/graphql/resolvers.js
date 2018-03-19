import { PubSub, withFilter } from 'graphql-subscriptions';
import mongoose from 'mongoose';

const Book = mongoose.model('Book');
const Request = mongoose.model('Request');

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
      const books = await Book.find().sort({added: 'descending'});
      return books;
    },

    userBooks: async (root, args, context) => {
      const books = await Book.find({ owner: context.user.id }).sort({added: 'descending'});
      return books;
    },

    requestsToUser: async (root, args, context) => {
      const requests = await Request.find({ receiver: context.user.id }).sort({ data: 'descending' });
      return requests;
    },

    requestsFromUser: async (root, args, context) => {
      const requests = await Request.find({ sender: context.user.id }).sort({ data: 'descending' });
      return requests; 
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
      try {
        const book = await (new Book({...args, owner: userId})).save();
        sendNotification(userId, 'success', `Successfully created ${book.title}.`);
        return book;
      } catch(error) {
        sendNotification(userId, 'error', `${error}`);
      }     
    },

    updateBook: async (root, { id, ...args }, context) => {
      const book = await Book.findByIdAndUpdate(id, { ...args }, { new: true });
      
      const userId = context.user.id;
      sendNotification(userId, 'success', `Successfully updated ${book.title}.`);
      
      return book;
    },

    removeBook: async (root, { id }, context) => {
      const userId = context.user.id;
      const book = await Book.findById(id);
      if (userId == book.owner.id) {
        await Book.remove(book, err => {
          if (err) {
            sendNotification(userId, 'error', `${err}`)
          } else {
            sendNotification(userId, 'success', `Successfully deleted ${book.title}.`);
            return null;
          }
        });
      }
    },

    requestBook: async (root, { bookId, requestType, message }, context) => {
      const userId = context.user.id;
      const book = await Book.findById(bookId);
      const bookOwner = book.owner.id;
      const request = await (new Request({ 
        book: bookId, 
        sender: userId,
        receiver: bookOwner, 
        requestType,
        message,
      })).save();
      
      sendNotification(bookOwner, 'info', `${context.user.name} wants to ${requestType} your book.`);
      
      sendNotification(userId, 'success', 'Your request has been successfully submitted.');
      
      return request;
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
