import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// import { ToastContainer, toast, style } from 'react-toastify';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const variantIcon = {
  success: CheckCircleIcon,
  // warning: WarningIcon,
  error: ErrorIcon,
  // info: InfoIcon,
};

const styles = theme => ({
  success: {
    background: 'green',
  },
  error: {
    background: 'red',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  close: {
    fontSize: 20,
  }
});

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
    if (notification && (prevNotification.message !== notification.message)) {
      return true;
    }
    return null;
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (snapshot !== null) {
      const { type, message } = this.props.data.notification;
      // toast[type](message, {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      // });
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
    const { classes } = this.props;
    const { open, type, message } = this.state;
    const Icon = variantIcon[type];
    return (
      //<ToastContainer />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        onClose={this.handleClose}
        autoHideDuration={4000}       
      >
        <SnackbarContent
          className={classes[type]}
          aria-describedby="snackbar-message"
          message={
            <span id="snackbar-message" className={classes.message}>
              { type && <Icon className={classes.icon} /> }
              { message }
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon className={classes.close} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
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
})(withStyles(styles)(Notifications));
