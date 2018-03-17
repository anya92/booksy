import React from 'react';
import { NavLink } from 'react-router-dom';

import * as SideNav from '../styled/SideNav';

const categories = ["Science fiction", "Drama", "Fiction", "Romance", "Horror", "Health", "Travel", "Children's", "Science", "History", "Poetry", "Comics", "Fantasy", "Biographies", "Other"];

export default ({ auth }) => (
  <SideNav.Nav id="side-nav">
    {
      auth ? (
        <SideNav.AuthLinks>
          <NavLink activeClassName="active" to="/account">My account</NavLink>
          <NavLink activeClassName="active" to="/my-shelf">My shelf</NavLink>
          <NavLink activeClassName="active" to="/add">Add a new book</NavLink>
          <NavLink activeClassName="active" to="/messages">Messages</NavLink>
          <NavLink activeClassName="active" to="/bookmarks">Bookmarks</NavLink>
          <a href="/auth/logout">Logout</a>
        </SideNav.AuthLinks>
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
