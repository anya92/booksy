import mongoose from 'mongoose';

import {
  pubsub,
  sendNotification,
  REQUEST_SENT_TOPIC,
  REQUEST_ACCEPTED_TOPIC,
} from './subscriptionHelpers';

const User = mongoose.model('User');
const Book = mongoose.model('Book');
const Request = mongoose.model('Request');

export default {
  updateUser: async (root, args, context) => {
    const userId = args.id;
    try {
      const user = await User.findByIdAndUpdate(userId, { ...args }, { new: true });
      sendNotification(userId, 'success', 'Successfully updated your profile.');
      return user;
    } catch (error) {
      sendNotification(userId, 'error', `${error}`);
    }
  },

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
    try {
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
    } catch (error) {
      console.log(error);
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
    
    request
      .populate('book sender')
      .execPopulate().then(request => {
        pubsub.publish(REQUEST_SENT_TOPIC, { requestSent: request });
      });

    sendNotification(userId, 'success', 'Your request has been successfully submitted.');
    
    return request;
  },
  
  acceptRequest: async (root, { id }, context) => {
    const request = await Request.findByIdAndUpdate(
      id, 
      { $set: { accepted: true, date: Date.now() } }, 
      { new: true },
    );
    
    request
      .populate('book sender receiver')
      .execPopulate().then(request => {
        pubsub.publish(REQUEST_ACCEPTED_TOPIC, { requestAccepted: request });
        sendNotification(request.sender.id, 'info', 'Your request has been accepted.');
      });

    return request;
  },

  bookmarkBook: async (root, { id }, context) => {
    const bookmarks = context.user.bookmarks.map(o => o.toString());
    const operator = bookmarks.includes(id) ? '$pull' : '$addToSet';

    const user = await User.findByIdAndUpdate(context.user.id,
      { [operator]: { bookmarks: id } },
      { new: true }
    );
    const book = await Book.findById(id);
    return book;
  },
};
