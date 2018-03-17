import React from 'react';
import { Link } from 'react-router-dom';

import * as Navbar from '../styled/Header';

export default ({ auth }) => (
  <Navbar.Nav>
    <Navbar.Wrapper> {/* to fix the overflow issue */}
      <Navbar.Icon
        menu
        className="fa fa-bars"
        onClick={() => document.getElementById('side-nav').classList.toggle('open')}
      />
      <Navbar.Brand><Link to="/">booksy</Link></Navbar.Brand>
      <Navbar.Icon
        search
        className="fa fa-search"
        onClick={() => {
          document.getElementById('search-bar').classList.remove('hide');
          document.getElementById('search-bar').classList.add('display');
        }}
      />
      <Navbar.SearchBar id="search-bar">
        <input type="text" placeholder="Search..." />
        <Navbar.Icon 
          className="fa fa-times"
          onClick={() => {
            document.getElementById('search-bar').classList.add('hide');
            setTimeout(() => (
              document.getElementById('search-bar').classList.remove('display')
            ), 500);
          }}
        />
      </Navbar.SearchBar>
      {/* <Navbar.Icon
        ellipsis
        className="fa fa-ellipsis-v"
        onClick={() => document.getElementById('auth').classList.toggle('open')}
      />
      {
        auth
        ? ( 
            <Navbar.Auth id="auth">
              <Navbar.Username>
                {auth.name}
              </Navbar.Username>
              <Navbar.Email>
                {auth.email}
              </Navbar.Email>
              <Navbar.Link>
                <a href="/auth/logout">Logout</a>
              </Navbar.Link>
            </Navbar.Auth>
          )
        : (
            <Navbar.Auth id="auth">
              <Navbar.Link>
                <a href="/auth/google">Login with Google</a>
              </Navbar.Link>
            </Navbar.Auth>
          )
      } */}
    </Navbar.Wrapper>
  </Navbar.Nav>
);
