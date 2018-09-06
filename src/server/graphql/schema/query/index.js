import User from './user';
import Book from './book';
import Category from './category';
import Notification from './notification';
import Request from './request';

const Query = `
  type Query {
    auth: User
    user(id: ID!): User
    book(id: ID!): Book
    books: [Book]
    booksByCategory(category: String): [Book]
    userBooks: [Book]
    bookmarks: [Book]
    categories: [Category]
    requestsToUser: [Request]
    requestsFromUser: [Request]
    searchBook(filter: String!): [Book]
  }
`;

export default () => [
  Query, 
  User,
  Book,
  Category,
  Notification,
  Request,
];
