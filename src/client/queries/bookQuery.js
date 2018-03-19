import gql from 'graphql-tag';

export const FETCH_BOOKS_QUERY = gql`
  query {
    books {
      id
      title
      author
      image
    }
  }
`;

export const FETCH_USER_BOOKS_QUERY = gql`
  query {
    userBooks {
      id
      title
      author
      image
      description
      category
    }
  }
`;

export const FETCH_BOOK_BY_ID_QUERY = gql`
  query Book($id: ID!) {
    book(id: $id) {
      id
      title
      author
      image
      description
      category
      owner {
        id
        name
        email
      }
      toBorrow
      toSell
    }
  }
`;

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
