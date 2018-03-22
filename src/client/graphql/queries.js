import gql from 'graphql-tag';

export const AUTH_QUERY = gql`
  query {
    auth {
      id
      googleId
      email
      name
    }
  }
`;

export const FETCH_ALL_BOOKS_QUERY = gql`
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

export const FETCH_REQUESTS_TO_USER_QUERY = gql`
  query {
    requestsToUser {
      id
      requestType
      receiver {
        name
      }
      book {
        id
        title
        author
      }
      sender {
        name
      }
      date
      accepted
      message
    }
  }
`;

export const FETCH_REQUESTS_FROM_USER_QUERY = gql`
  query {
    requestsFromUser {
      id
      requestType
      receiver {
        name
      }
      book {
        id
        title
        author
      }
      sender {
        name
      }
      date
      accepted
      message
    }
  }
`;
