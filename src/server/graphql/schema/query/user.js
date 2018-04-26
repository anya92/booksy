import Book from './book';

const User = `
  type User {
    id: ID!
    googleId: ID!
    email: String
    name: String
    books: [Book]
  }
`;

export default () => [User, Book];