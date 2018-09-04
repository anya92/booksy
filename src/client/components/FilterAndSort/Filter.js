import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FilterListIcon from "@material-ui/icons/FilterList";

const styles = theme => ({
  icon: {
    fontSize: '20px',
    marginRight: theme.spacing.unit,
  },
});

const Filter = ({
  classes,
  anchorEl,
  category,
  categories,
  handleOpen,
  handleClick,
  handleClose,
}) => {
  return (
    <div>
      <Button
        aria-haspopup="true"
        aria-controls="category-menu"
        aria-label="Category"
        onClick={handleOpen}
      >
        <FilterListIcon className={classes.icon} />Category
      </Button>
      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          [...categories].map(option => (
            <MenuItem
              key={option}
              selected={option === category}
              onClick={() => handleClick(option)}
            >
              {option}
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  );
}

export default withStyles(styles)(Filter);
