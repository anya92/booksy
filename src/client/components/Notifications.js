import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ToastContainer, toast, style } from 'react-toastify';

style({
  colorDefault: "#CAD3C8",
  colorInfo: "#25CCF7",
  colorSuccess: "#58B19F",
  colorWarning: "#EAB543",
  colorError: "#B33771",
});

class Notifications extends Component {

  // componentWillReceiveProps({ data: { notification: { type, message } } }) {
  //   toast[type](message, {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //   });
  //   // toast(message);
  // }

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
