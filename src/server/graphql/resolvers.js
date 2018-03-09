import { PubSub, withFilter } from 'graphql-subscriptions';
import mongoose from 'mongoose';

const Book = mongoose.model('Book');

const pubsub = new PubSub();

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
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const owner = context.user.id;
      const book = await (new Book({...args, owner})).save();
      return book;
    }
  }

};
