import gql from 'graphql-tag';

export const ADD_BOOK_MUTATION = gql`
  mutation AddBook(
    $title: String! 
    $author: String! 
    $image: String 
    $description: String 
    $category: String 
    $toBorrow: Boolean 
    $toSell: Boolean
  ) {
    addBook(
      title: $title
      author: $author
      image: $image
      description: $description
      category: $category
      toBorrow: $toBorrow
      toSell: $toSell
    ) {
      id
    }
  }
`;

export const EDIT_BOOK_MUTATION = gql`
  mutation UpdateBook(
    $id: ID!
    $title: String! 
    $author: String! 
    $image: String 
    $description: String 
    $category: String 
    $toBorrow: Boolean 
    $toSell: Boolean
  ) {
    updateBook(
      id: $id
      title: $title
      author: $author
      image: $image
      description: $description
      category: $category
      toBorrow: $toBorrow
      toSell: $toSell
    ) {
      id
    }
  }
`;

export const REMOVE_BOOK_BY_ID_MUTATION = gql`
  mutation RemoveBook($id: ID!) {
    removeBook(id: $id) {
      id
    }
  }
`;

export const REQUEST_BOOK_MUTATION = gql`
  mutation RequestBook(
    $bookId: ID! 
    $requestType: String!
    $message: String
  ) {
    requestBook(
      bookId: $bookId 
      requestType: $requestType
      message: $message
    ) {
      id
    }
  }
`;

export const ACCEPT_REQUEST_MUTATION = gql`
  mutation AcceptRequest($id: ID!) {
    acceptRequest(id: $id) {
      id
    }
  }
`;

export const BOOKMARK_BOOK_MUTATION = gql`
  mutation BookmarkBook($id: ID!) {
    bookmarkBook(id: $id) {
      id
    }
  }
`;