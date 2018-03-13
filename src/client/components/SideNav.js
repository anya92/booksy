import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SideNav = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  bottom: 0;
  width: 200px;
  z-index: 3;
  padding: 10px;
  padding-top: 40px;
  font-family: 'Open Sans', sans-serif;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  overflow-y: scroll;
  &::-webkit-scrollbar { 
    display: none; 
  }
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  margin-bottom: 40px;
  a {
    color: #555;
    text-decoration: none;
    padding: 10px 15px;
    &.active {
      color: #FFF;
      background: #9AECDB;
      border-radius: 4px;
    }
  }
`;

const Categories = styled.div`
  padding: 10px;
  h4 {
    font-weight: 300;
    text-transform: uppercase;
  }
  div {
    margin: 5px 0;
  }
`;

export default ({ auth }) => (
  <SideNav>
    {
      auth && (
        <Links>
          <NavLink activeClassName="active" to="/my-shelf">My shelf</NavLink>
          <NavLink activeClassName="active" to="/add">Add a new book</NavLink>
          <NavLink activeClassName="active" to="/messages">Messages</NavLink>
        </Links>
      )
    }
    <Categories>
      <h4>Categories</h4>
      {
        ["Science fiction", "Drama", "Fiction", "Romance", "Horror", "Health", "Travel", "Children's", "Science", "History", "Poetry", "Comics", "Fantasy", "Biographies", "Other"].map((category, i) => (
          <div key={i}>{category}</div>
        ))
      }
    </Categories>
  </SideNav>
);
