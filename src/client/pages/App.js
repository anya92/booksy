import React from 'react';
import { renderRoutes } from 'react-router-config';
import { graphql } from 'react-apollo';

import AUTH_QUERY from '../queries/authQuery';

import Header from '../components/Header';
import Notifications from '../components/Notifications';

const App = ({ data, route }) => {
  if (data.loading) return <div>Loading...</div>;
  if (data.error) return <div>Error</div>;
  return (
    <div>
      <Header auth={data.auth} />
      { data.auth && <Notifications userId={data.auth.id} /> }
      { renderRoutes(route.routes) }
    </div>
  );  
};

export default graphql(AUTH_QUERY)(App);
