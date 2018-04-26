export default `
  type Mutation {
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
  }
`;