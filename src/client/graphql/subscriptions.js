import gql from 'graphql-tag';

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

export const REQUEST_ACCEPTED_SUBSCRIPTION = gql`
  subscription RequestSent($userId: ID!) {
    requestAccepted(userId: $userId) {
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
