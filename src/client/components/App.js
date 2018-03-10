import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { graphql } from 'react-apollo';

import AUTH_QUERY from '../queries/authQuery';

import Notifications from './Notifications';

const App = ({ data, route }) => {
  if (data.loading) return <div>Loading...</div>;
  if (data.error) return <div>Error</div>;
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        {
          data.auth
          ? <div><a href="/auth/logout">Logout</a></div>
          : <div><a href="/auth/google">Login with Google</a></div>
        }
      </div>
      { data.auth && <Notifications userId={data.auth.id} /> }
      { renderRoutes(route.routes) }
    </div>
  );  
};

export default graphql(AUTH_QUERY)(App);
