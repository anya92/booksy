import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const Input = ({
  name,
  required,
  multiline,
  value,
  handleChange,
  classes,
  ...props,
}) => {
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <TextField
      id={name}
      label={label}
      required={required}
      multiline={multiline}
      {...props}
      margin="normal"
      className={classes.textField}
      value={value}
      onChange={e => handleChange(e, name)}
    />
  );
}

export default withStyles(styles)(Input);
