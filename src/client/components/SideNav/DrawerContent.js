import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: 'none',
  },
  badge: {
    color: '#333',
    fontWeight: 600,
  }
});

const categories = ["Science fiction", "Drama", "Fiction", "Romance", "Horror", "Health", "Travel", "Children's", "Science", "History", "Poetry", "Comics", "Fantasy", "Biographies", "Other"];

const DrawerContent = ({
  auth,
  mobileOpen,
  pathname,
  number,
  categoriesOpen,
  toggleCategoriesList,
  classes,
}) => {
  return (
    <div>
      {
        auth && (
          <React.Fragment>
            {!mobileOpen && <div className={classes.toolbar} />}
            <List className={classes.list}>
              <NavLink to="/my-shelf" className={classes.link}>
                <ListItem button selected={pathname == '/my-shelf'}>
                  <ListItemText primary="My shelf" />
                </ListItem>
              </NavLink>
              <NavLink to="/add" className={classes.link}>
                <ListItem button selected={pathname == '/add'}>
                  <ListItemText primary="Add a new book" />
                </ListItem>
              </NavLink>
              <NavLink to="/requests" className={classes.link}>
                <ListItem button selected={pathname == '/requests'}>
                  <ListItemText primary="Book requests" />
                  <Badge className={classes.badge} color="primary" id="badge" badgeContent={number}><div /></Badge>
                </ListItem>
              </NavLink>
              <NavLink to="/account" className={classes.link}>
                <ListItem button selected={pathname == '/account'}>
                  <ListItemText primary="Account" />
                </ListItem>
              </NavLink>
              <NavLink to="/bookmarks" className={classes.link}>
                <ListItem button selected={pathname == '/bookmarks'}>
                  <ListItemText primary="Bookmarks" />
                </ListItem>
              </NavLink>
            </List>
            <Divider />
          </React.Fragment>
        )
      }
      {(!auth && !mobileOpen) && <div className={classes.toolbar} />}
      <List>
        <ListItem button onClick={toggleCategoriesList}>
          <ListItemText primary="Book Categories" />
          {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
          <List component="div">
            {
              categories.map((category, i) => (
                <ListItem button key={i}>
                  <ListItemText secondary={category} />
                </ListItem>
              ))
            }
          </List>
        </Collapse>
      </List>
    </div>
  );
}

export default withStyles(styles)(DrawerContent);
