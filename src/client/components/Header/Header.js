import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

import SearchBar from './SearchBar';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
})

const Header = ({ auth, classes, toggleDrawer }) => {
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton 
          color="inherit" 
          aria-label="Menu"
          onClick={toggleDrawer}
          className={classes.navIconHide}>
          <MenuIcon />
        </IconButton>
        <Typography
          variant="headline"
          style={{ flexGrow: 1, fontFamily: 'Pacifico' }}>
          <Link to="/"
            style={{
              color: '#FFF',
              textDecoration: 'none',
            }}>
            Booksy
          </Link>
        </Typography>
        <SearchBar />
        {
          !auth
          ? (
            <a href="/auth/google"
              style={{
                color: '#FFF',
                textDecoration: 'none',
              }}>
              <Button color="inherit">
                Login with Google
              </Button>
            </a>
          ) : (
            <a href="/auth/logout"
              style={{
                color: '#FFF',
                textDecoration: 'none',
              }}>
              <Button color="inherit">
                logout
              </Button>
            </a>
          )
        }
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
