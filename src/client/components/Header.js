import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.nav`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default ({ auth }) => (
  <Navbar>
    <div><Link to="/">booksy</Link></div>
    <div style={{ flexGrow: '1' }}><input type="text" placeholder="🔎 Search..." /></div>
    {
      auth
      ? <div>{auth.name} | <a href="/auth/logout">Logout</a></div>
      : <div><a href="/auth/google">Login with Google</a></div>
    }
  </Navbar>
);
