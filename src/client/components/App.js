import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

export default ({ route }) => (
  <div>
    <h1>Fullstack React SSR</h1>
    <button onClick={() => console.log('clicked')}>Click me</button>
    <div>
      <Link to="/">Home</Link>
      <Link to="/books">Books</Link>
    </div>
    { renderRoutes(route.routes) }
  </div>
);
