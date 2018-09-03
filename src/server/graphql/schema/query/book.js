import User from './user';

const Book = `
  enum AllowedStates {
    available
    borrowed
    sold
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    owner: User!
    image: String,
    description: String
    added: String
    category: String
    toBorrow: Boolean
    toSell: Boolean
    state: AllowedStates
  }
`;

export default () => [Book, User];
