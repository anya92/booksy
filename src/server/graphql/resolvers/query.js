import mongoose from 'mongoose';

const Book = mongoose.model('Book');
const Request = mongoose.model('Request');

export default {
  auth: (root, args, context) => {
    return context.user;
  },

  book: async (root, { id }, context) => {
    try {
      const book = await Book.findById(id);
      return book;
    } catch(error) {
      throw new Error(error);
    }
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
    const requests = await Request.find({ receiver: context.user.id }).sort({ date: 'descending' });
    return requests;
  },

  requestsFromUser: async (root, args, context) => {
    const requests = await Request.find({ sender: context.user.id }).sort({ date: 'descending' });
    return requests; 
  }
};