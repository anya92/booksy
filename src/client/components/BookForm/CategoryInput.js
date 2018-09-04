import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const categoryOptions = ["Biography", "Children's", "Comic", "Drama", "Fantasy", "Fiction", "Horror", "Mistery", "Poetry", "Romance", "Science fiction", "Other"];

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const CategoryInput = ({ classes, theme, category, handleChange }) => {
  return (
    <FormControl className={classes.textField}>
      <InputLabel htmlFor="select-category">Category</InputLabel>
      <Select
        value={category}
        onChange={e => handleChange(e, 'category')}
        input={<Input id="select-category" />}
      >
        {
          categoryOptions.map(option => (
            <MenuItem
              key={option}
              value={option}
              style={{
                fontWeight:
                  category === option
                    ? theme.typography.fontWeightMedium
                    : theme.typography.fontWeightRegular
              }}>
              {option}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

export default withStyles(styles, { withTheme: true })(CategoryInput);
