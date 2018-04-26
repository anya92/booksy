import mongoose from 'mongoose';

const Book = mongoose.model('Book');

export default {
  books: async (user) => {
    const books = await Book.find({ owner: user.id });
    return books;
  },
  bookmarks: async (user) => {
    const bookmarkedBooks = await Book.find({
      _id: { $in: user.bookmarks }
    });
    return bookmarkedBooks;
  }
};