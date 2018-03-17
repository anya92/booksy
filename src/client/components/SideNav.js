import React from 'react';
import { NavLink } from 'react-router-dom';

import * as SideNav from '../styled/SideNav';

const categories = ["Science fiction", "Drama", "Fiction", "Romance", "Horror", "Health", "Travel", "Children's", "Science", "History", "Poetry", "Comics", "Fantasy", "Biographies", "Other"];

export default ({ auth }) => {
  const closeSideNav = () => document.getElementById('side-nav').classList.remove('open');
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
              <NavLink onClick={() => closeSideNav()} activeClassName="active" to="/my-shelf">My shelf</NavLink>
              <NavLink onClick={() => closeSideNav()} activeClassName="active" to="/add">Add a new book</NavLink>
              <NavLink onClick={() => closeSideNav()} activeClassName="active" to="/messages">Messages</NavLink>
              <NavLink onClick={() => closeSideNav()} activeClassName="active" to="/account">Settings</NavLink>
              <NavLink onClick={() => closeSideNav()} activeClassName="active" to="/bookmarks">Bookmarks</NavLink>
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
};
