import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import DrawerContent from './DrawerContent';

import {
  FETCH_REQUESTS_TO_USER_QUERY,
  FETCH_REQUESTS_FROM_USER_QUERY, 
} from '../../graphql/queries';

import {  
  REQUEST_SENT_SUBSCRIPTION,
  REQUEST_ACCEPTED_SUBSCRIPTION,
} from '../../graphql/subscriptions';

const styles = theme => ({
  drawer: {
    background: '#eee',
    width: 240,
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
          
          document.querySelector('#badge span').style.background = '#44bd32';
  
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
            <DrawerContent
              auth={auth}
              mobileOpen={mobileOpen}
              pathname={pathname}
              number={numberOfNotAcceptedRequests}
              categoriesOpen={this.state.categoriesOpen}
              toggleCategoriesList={this.toggleCategoriesList}
            />
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer variant="permanent" open classes={{ paper: classes.drawer }}>
            <DrawerContent
              auth={auth}
              mobileOpen={mobileOpen}
              pathname={pathname}
              number={numberOfNotAcceptedRequests}
              categoriesOpen={this.state.categoriesOpen}
              toggleCategoriesList={this.toggleCategoriesList}
            />
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
