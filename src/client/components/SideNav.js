import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';

import {
  FETCH_REQUESTS_TO_USER_QUERY,
  FETCH_REQUESTS_FROM_USER_QUERY, 
} from '../graphql/queries';

import {  
  REQUEST_SENT_SUBSCRIPTION,
  REQUEST_ACCEPTED_SUBSCRIPTION,
} from '../graphql/subscriptions';

// import * as SideNav from '../styled/SideNav';

const categories = ["Science fiction", "Drama", "Fiction", "Romance", "Horror", "Health", "Travel", "Children's", "Science", "History", "Poetry", "Comics", "Fantasy", "Biographies", "Other"];

const styles = theme => ({
  drawer: {
    background: '#eee',
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: 'none',
  },
});

class SideNavigation extends Component {

  state = {
    categoriesOpen: false,
    activeLink: '',
  }

  componentDidMount() {
    if (this.props.auth) {
      this.props.toUser.subscribeToMore({
        document: REQUEST_SENT_SUBSCRIPTION,
        variables: {
          userId: this.props.auth.id,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
          const newRequest = subscriptionData.data.requestSent;
          
          document.getElementById('requests-length').style.background = '#BADA55';
  
          return {
            ...prev,
            requestsToUser: [newRequest, ...prev.requestsToUser]
          };
        }
      });

      this.props.fromUser.subscribeToMore({
        document: REQUEST_ACCEPTED_SUBSCRIPTION,
        variables: {
          userId: this.props.auth.id,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
          const acceptedRequest = subscriptionData.data.requestAccepted;

          return {
            ...prev,
            requestsFromUser: prev.requestsFromUser.map(request => 
              (request.id == acceptedRequest.id ? acceptedRequest : request)
            ),
          };
        }
      });
    }
  }

  closeSideNav() {
    document.getElementById('side-nav').classList.remove('open');
  }

  toggleCategoriesList = () => {
    this.setState(prevState => ({ categoriesOpen: !prevState.categoriesOpen }));
  }

  render() {
    const { auth, classes, mobileOpen, toggleDrawer, theme, location: { pathname } } = this.props;

    let numberOfNotAcceptedRequests;
    if (auth) {
      const { requestsToUser } = this.props.toUser;
      numberOfNotAcceptedRequests = requestsToUser.filter(request => !request.accepted).length;
    }

    const drawer = (
      <div>
        {
          auth && (
            <React.Fragment>
              { !mobileOpen && <div className={classes.toolbar} /> }
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
                    <Badge color="primary" badgeContent={numberOfNotAcceptedRequests}><div /></Badge>
                  </ListItem>
                </NavLink>
                <NavLink to="/settings" className={classes.link}>
                  <ListItem button selected={pathname == '/settings'}>
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
        { (!auth && !mobileOpen) && <div className={classes.toolbar} />}
        <List>
          <ListItem button onClick={this.toggleCategoriesList}>
            <ListItemText primary="Book Categories" />
            {this.state.categoriesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.categoriesOpen} timeout="auto" unmountOnExit>
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
    )
    return (
      <React.Fragment>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={toggleDrawer}
            ModalProps={{
              keepMounted: true,
            }}
            classes={{ paper: classes.drawer }}
          >
            { drawer }
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer variant="permanent" open classes={{ paper: classes.drawer }}>
            { drawer }
          </Drawer>
        </Hidden>
      </React.Fragment>
    );
  }
};

export default compose(
  graphql(FETCH_REQUESTS_TO_USER_QUERY, {
    name: 'toUser', 
    skip: ({ auth }) => !auth,
  }),
  graphql(FETCH_REQUESTS_FROM_USER_QUERY, {
    name: 'fromUser', 
    skip: ({ auth }) => !auth,
  }),
)(withRouter(withStyles(styles, { withTheme: true })(SideNavigation)));
