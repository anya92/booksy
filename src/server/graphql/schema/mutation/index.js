export default `
  type Mutation {
    updateUser(
      id: ID!
      name: String
      firstName: String
      lastName: String
      city: String
      country: String
    ): User

    addBook(
      title: String!
      author: String!
      image: String
      description: String
      added: String
      category: String
      toBorrow: Boolean
      toSell: Boolean
      state: AllowedStates
    ): Book
    
    updateBook(
      id: ID!
      title: String!
      author: String!
      image: String
      description: String
      category: String
      toBorrow: Boolean
      toSell: Boolean
      state: AllowedStates
    ): Book

    removeBook(
      id: ID!
    ) : Book

    requestBook(
      bookId: ID!
      requestType: String!
      message: String
    ): Request

    acceptRequest(id: ID!): Request

    bookmarkBook(id: ID!): Book
  
  }
`;
