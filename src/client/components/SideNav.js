import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { NavLink } from 'react-router-dom';

import { 
  FETCH_REQUESTS_TO_USER_QUERY,
  REQUEST_SENT_SUBSCRIPTION,
} from '../queries/requestQuery';

import * as SideNav from '../styled/SideNav';

const categories = ["Science fiction", "Drama", "Fiction", "Romance", "Horror", "Health", "Travel", "Children's", "Science", "History", "Poetry", "Comics", "Fantasy", "Biographies", "Other"];

class SideNavigation extends Component {

  componentDidMount() {
    if (this.props.auth) {
      this.props.data.subscribeToMore({
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
    }
  }

  closeSideNav() {
    document.getElementById('side-nav').classList.remove('open');
  }

  render() {
    const { auth } = this.props;
    let requests;
    if (auth) {
      requests = this.props.data.requestsToUser;
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
                    {requests.length}
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

export default graphql(FETCH_REQUESTS_TO_USER_QUERY, {
  skip: ({ auth }) => !auth,
})(SideNavigation);
