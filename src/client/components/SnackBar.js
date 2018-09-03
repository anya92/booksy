import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  // info: InfoIcon,
  // warning: WarningIcon,
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

const SnackBar = ({ open, type, message, handleClose, classes }) => {
  const Icon = variantIcon[type];
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={4000}
    >
      <SnackbarContent
        className={classes[type]}
        aria-describedby="snackbar-message"
        message={
          <span id="snackbar-message" className={classes.message}>
            {type && <Icon className={classes.icon} />}
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon className={classes.close} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

export default withStyles(styles)(SnackBar);
