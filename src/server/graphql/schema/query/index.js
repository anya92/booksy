import User from './user';
import Book from './book';
import Notification from './notification';
import Request from './request';

const Query = `
  type Query {
    auth: User
    user(id: ID!): User
    book(id: ID!): Book
    books: [Book]
    userBooks: [Book]
    bookmarks: [Book]
    requestsToUser: [Request]
    requestsFromUser: [Request]
    searchBook(filter: String!): [Book]
  }
`;

export default () => [
  Query, 
  User,
  Book,
  Notification,
  Request,
];
