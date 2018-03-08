import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { graphql } from 'react-apollo';

import AUTH_QUERY from '../queries/authQuery';

const App = ({ data, route }) => {
  if (data.loading) return <div>Loading...</div>;
  if (data.error) return <div>Error</div>;
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        {
          data.auth
          ? <a href="/auth/logout">Logout</a>
          : <a href="/auth/google">Login with Google</a>
        }
      </div>
      { renderRoutes(route.routes) }
    </div>
  );  
};

export default graphql(AUTH_QUERY)(App);
