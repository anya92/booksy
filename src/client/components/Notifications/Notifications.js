import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import SnackBar from './SnackBar';

class Notifications extends Component {
  state = {
    open: false,
    type: '',
    message: '',
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { notification } = this.props.data;
    const prevNotification = prevProps.data.notification;
    if (notification && !prevNotification) return true;
    if (notification && (prevNotification.id !== notification.id)) {
      return true;
    }
    return null;
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (snapshot !== null) {
      const { type, message } = this.props.data.notification;
      this.setState(() => ({
        open: true,
        type,
        message,
      }));
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState(() => ({ open: false, type: '', message: '' }));
  };
  
  render() {
    const { open, type, message } = this.state;
    return (
      <SnackBar
        open={open}
        type={type}
        message={message}
        handleClose={this.handleClose}
      />
    );
  }
}

const notificationSubscription = gql`
  subscription Notification($userId: ID!) {
    notification(userId: $userId) {
      type
      message
      id
    }
  }
`;

export default graphql(notificationSubscription, {
  options: ({ userId }) => { 
    return { variables: { userId } };
  }
})(Notifications);
