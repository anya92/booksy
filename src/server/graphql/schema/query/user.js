import Book from './book';

const User = `
  type User {
    id: ID!
    googleId: ID!
    email: String
    name: String
    firstName: String
    lastName: String
    city: String
    country: String
    books: [Book]
    bookmarks: [Book]
  }
`;

export default () => [User, Book];
