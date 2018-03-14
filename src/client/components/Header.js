import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background: #FFF;
  border-bottom: 1px solid #EEE;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-family: 'Open sans', sans-serif;
`;

const Brand = styled.div`
  font-family: 'Pacifico', cursive;
  font-size: 28px;
  margin-right: 20px;
  a {
    color: #F97F51;
    text-decoration: none;
  }
`;

const SearchBar = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  input {
    color: #E0DDD9;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: 300;
    width: 300px;
    padding: 10px 15px;
    border: 1px solid #E0DDD9;
    outline: none;
    border-radius: 6px;
  }
`;

const AuthLink = styled.div`
  a {
    background: #F97F51;
    color: #FFF;
    text-decoration: none;
    padding: 10px 15px;
  }
`;


export default ({ auth }) => (
  <Navbar>
    <Brand><Link to="/">booksy</Link></Brand>
    <SearchBar>
      <input type="text" placeholder="🔎 Search..." />
    </SearchBar>
    {
      auth
      ? ( 
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>{auth.name}</div>
            <AuthLink><a href="/auth/logout">Logout</a></AuthLink>
          </div>
        )
      : <AuthLink><a href="/auth/google">Login with Google</a></AuthLink>
    }
  </Navbar>
);
