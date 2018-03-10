import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ToastContainer, toast } from 'react-toastify';

class Notifications extends Component {

  componentWillReceiveProps({ data: { notification: { type, message } } }) {
    toast[type](message);
  }

  render() {
    return <ToastContainer />;
  }
}

const notificationSubscription = gql`
  subscription Notification($userId: ID!) {
    notification(userId: $userId) {
      type
      message
    }
  }
`;

export default graphql(notificationSubscription, {
  options: ({ userId }) => { 
    return { variables: { userId } };
  }
})(Notifications);
