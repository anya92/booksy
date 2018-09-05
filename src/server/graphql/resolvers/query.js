import mongoose from 'mongoose';

const User = mongoose.model('User');
const Book = mongoose.model('Book');
const Request = mongoose.model('Request');

export default {
  auth: (root, args, context) => {
    return context.user;
  },

  user: async (root, args) => {
    try {
      const user = await User.findById(args.id);
      return user;
    } catch (error) {
      console.log(error);
    }
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

  bookmarks: async (root, args, context) => {
    const bookmarks = await Book.find({
      _id: { $in: context.user.bookmarks }
    });
    return bookmarks;
  },

  requestsToUser: async (root, args, context) => {
    const requests = await Request.find({ receiver: context.user.id }).sort({ date: 'descending' });
    return requests;
  },

  requestsFromUser: async (root, args, context) => {
    const requests = await Request.find({ sender: context.user.id }).sort({ date: 'descending' });
    return requests; 
  },

  searchBook: async (root, { filter }) => {
    const books = await Book.find({
      $text: {
        $search: filter
      }
    }, {
      score: { $meta: 'textScore' }
    }).sort({ score: { $meta: 'textScore' } });
    return books;
  },
};
