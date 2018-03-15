import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SideNav = styled.div`
  position: fixed;
  top: 73px;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  transition: all .5s ease-out;
  border-right: 1px solid #eee;
  background: #eee;
  @media all and (min-width: 768px) {
    left: 0;
  }
  &.open {
    transform: translateX(0);
  }
  width: 240px;
  z-index: 2;
  padding: 20px 0;
  font-family: 'Open Sans', sans-serif;
  overflow-y: scroll;
  /* &::-webkit-scrollbar { 
    display: none; 
  } */
`;

const Links = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: 1fr;
  border-bottom: 1px solid #ddd;
  a {
    color: #555;
    text-decoration: none;
    padding: 10px 25px;
    transition: background .3s ease-out;
    &:hover:not(.active) {
      background: #ddd;
    }
    &.active {
      color: #FFF;
      background: #9AECDB;
    }
  }
`;

const Categories = styled.div`
  padding: 10px 0;
  h4 {
    text-transform: uppercase;
    padding-left: 25px;
  }
  div {
    padding: 10px 25px;
    &:hover:not(.active) {
      background: #ddd;
    }
  }
`;

export default ({ auth }) => (
  <SideNav id="side-nav">
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
