import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SortIcon from "@material-ui/icons/Sort";

const styles = theme => ({
  icon: {
    fontSize: '20px',
    marginRight: theme.spacing.unit,
  },
});

const sortOptions = [
  'date added (newest)',
  'date added (oldest)',
  'title (A-Z)',
  'title (Z-A)',
];

const Sort = ({
  classes,
  anchorEl,
  sortBy,
  handleOpen,
  handleClick,
  handleClose,
}) => {
  return (
    <div>
      <Button
        aria-haspopup="true"
        aria-controls="sort-menu"
        aria-label="Sort by"
        onClick={handleOpen}
      >
        <SortIcon className={classes.icon} />Sort by
          </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          sortOptions.map(option => (
            <MenuItem
              key={option}
              selected={option === sortBy}
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

export default withStyles(styles)(Sort);
