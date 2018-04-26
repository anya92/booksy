import React from 'react';
import { renderRoutes } from 'react-router-config';
import { graphql } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import { AUTH_QUERY } from '../graphql/queries';

import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Notifications from '../components/Notifications';

import theme from '../styled/theme';
import Container from '../styled/Container';

const App = ({ data, route }) => {
  if (data.loading) return <div>Loading...</div>;
  if (data.error) return <div>Error</div>;
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Header auth={data.auth} />
        <SideNav auth={data.auth} />
        <Container>
          { data.auth && <Notifications userId={data.auth.id} /> }
          { renderRoutes(route.routes, { auth: data.auth }) }
        </Container>
      </React.Fragment>  
    </ThemeProvider>
  );  
};

export default graphql(AUTH_QUERY)(App);
