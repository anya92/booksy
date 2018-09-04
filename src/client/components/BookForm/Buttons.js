import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const Buttons = ({ onCancel, classes }) => {
  return (
    <div>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        className={classes.button}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        size="large"
        color="primary"
        className={classes.button}
        type="submit"
      >
        Save
      </Button>
    </div>
  );
}

export default withStyles(styles)(Buttons);
