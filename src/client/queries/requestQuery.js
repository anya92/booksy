import gql from 'graphql-tag';

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


export const REQUEST_SENT_SUBSCRIPTION = gql`
  subscription RequestSent($userId: ID!) {
    requestSent(userId: $userId) {
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
