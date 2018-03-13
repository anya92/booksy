import React from 'react';
import { renderRoutes } from 'react-router-config';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import AUTH_QUERY from '../queries/authQuery';

import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Notifications from '../components/Notifications';

const Container = styled.div`
  padding: 80px 40px 20px 240px;
  margin: 0 auto;
  font-family: 'Open Sans', sans-serif;
  color: #233;
`;

const App = ({ data, route }) => {
  if (data.loading) return <div>Loading...</div>;
  if (data.error) return <div>Error</div>;
  return (
    <div>
      <Header auth={data.auth} />
      <SideNav auth={data.auth} />
      <Container>
        { data.auth && <Notifications userId={data.auth.id} /> }
        { renderRoutes(route.routes, { auth: data.auth }) }
      </Container>
    </div>
  );  
};

export default graphql(AUTH_QUERY)(App);
