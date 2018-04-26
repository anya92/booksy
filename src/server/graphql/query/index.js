import User from './user';
import Book from './book';
import Notification from './notification';
import Request from './request';

const Query = `
  type Query {
    auth: User
    book(id: ID!): Book
    books: [Book]
    userBooks: [Book]
    requestsToUser: [Request]
    requestsFromUser: [Request]
  }
`;

export default () => [
  Query, 
  User,
  Book,
  Notification,
  Request,
];