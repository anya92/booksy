import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { graphql } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import { AUTH_QUERY } from '../graphql/queries';

import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Notifications from '../components/Notifications';
import { BookPanelProvider } from '../components/BookPanel/BookPanelContext';
import ErrorBoundry from '../components/ErrorBoundry';

import theme from '../styled/theme';
import Container from '../styled/Container';

class App extends Component {
  state = {
    mobileOpen: false,
  }

  handleDrawerToggle = () => {
    this.setState(prevState => ({ mobileOpen: !prevState.mobileOpen }));
  };

  render() {
    const { data, route } = this.props;

    if (data.loading) return <div>Loading...</div>;
    if (data.error) return <div>Error</div>;
  
    return (
      <ThemeProvider theme={theme}>
        <ErrorBoundry>
          <BookPanelProvider auth={data.auth}>
            <Header auth={data.auth} toggleDrawer={this.handleDrawerToggle} />
            <SideNav auth={data.auth} mobileOpen={this.state.mobileOpen} toggleDrawer={this.handleDrawerToggle} />
            <Container>
              { data.auth && <Notifications userId={data.auth.id} /> }
              { renderRoutes(route.routes, { auth: data.auth }) }
            </Container>
          </BookPanelProvider>
        </ErrorBoundry>
      </ThemeProvider>
    );
  }
}

export default graphql(AUTH_QUERY)(App);
