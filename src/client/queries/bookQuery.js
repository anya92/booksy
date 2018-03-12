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
    }
  }
`;

export const ADD_BOOK_MUTATION = gql `
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
      title
      author
    }
  }
`;
