import User from './user';
import Book from './book';

const Request = `
  type Request {
    id: ID
    requestType: String
    book: Book
    receiver: User
    sender: User
    message: String
    date: String
    accepted: Boolean
  }
`;

export default () => [Request, Book, User];