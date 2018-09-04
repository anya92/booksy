import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const Switches = ({ classes, toBorrow, toSell, handleChange }) => {
  return (
    <div>
      <Typography variant="body1">Set your book available to</Typography>
      <FormGroup row className={classes.textField}
        margin="normal">
        <FormControlLabel
          control={
            <Switch
              checked={toBorrow}
              onChange={e => handleChange(e, 'toBorrow')}
              value="toBorrow"
              color="primary"
            />
          }
          label="borrow"
        />
        <FormControlLabel
          control={
            <Switch
              checked={toSell}
              onChange={e => handleChange(e, 'toSell')}
              value="toSell"
              color="primary"
            />
          }
          label="sell"
        />
      </FormGroup>
    </div>
  );
}

export default withStyles(styles)(Switches);
