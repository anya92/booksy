import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { NavLink } from 'react-router-dom';

import { 
  FETCH_REQUESTS_TO_USER_QUERY,
  FETCH_REQUESTS_FROM_USER_QUERY,  
  REQUEST_SENT_SUBSCRIPTION,
  REQUEST_ACCEPTED_SUBSCRIPTION,
} from '../queries/requestQuery';

import * as SideNav from '../styled/SideNav';

const categories = ["Science fiction", "Drama", "Fiction", "Romance", "Horror", "Health", "Travel", "Children's", "Science", "History", "Poetry", "Comics", "Fantasy", "Biographies", "Other"];

class SideNavigation extends Component {

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

  render() {
    const { auth } = this.props;
    let requestsToUser;
    if (auth) {
      requestsToUser = this.props.toUser.requestsToUser;
    }
    return (
      <SideNav.Nav id="side-nav">
        {
          auth ? (
            <div>
              <SideNav.UserInfo>
                <SideNav.Username>{auth.name}</SideNav.Username>
                <SideNav.Email>{auth.email}</SideNav.Email>
              </SideNav.UserInfo>
              <SideNav.AuthLinks>
                <NavLink 
                  onClick={() => this.closeSideNav()} 
                  activeClassName="active" 
                  to="/my-shelf"
                >
                  My shelf
                </NavLink>
                <NavLink 
                  onClick={() => this.closeSideNav()} 
                  activeClassName="active" 
                  to="/add"
                >
                  Add a new book
                </NavLink>
                <NavLink 
                  onClick={() => this.closeSideNav()} 
                  activeClassName="active" 
                  to="/requests"
                >
                  Requests 
                  <span id="requests-length" style={{ background: '#DDD', padding: '8px' }}>
                    {requestsToUser.length}
                  </span>
                </NavLink>
                <NavLink 
                  onClick={() => this.closeSideNav()} 
                  activeClassName="active" 
                  to="/account"
                >
                  Settings
                </NavLink>
                <NavLink 
                  onClick={() => this.closeSideNav()} 
                  activeClassName="active" 
                  to="/bookmarks"
                >
                  Bookmarks
                </NavLink>
                <a href="/auth/logout">Logout</a>
              </SideNav.AuthLinks>
            </div>  
          ) : (
            <SideNav.AuthLinks>
              <a href="/auth/google">Login with Google</a>
            </SideNav.AuthLinks>
          )
        }
        <SideNav.Categories>
          <h4>Categories</h4>
          {
            categories.map((category, i) => (
              <div key={i}>{category}</div>
            ))
          }
        </SideNav.Categories>
      </SideNav.Nav>
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
)(SideNavigation);
