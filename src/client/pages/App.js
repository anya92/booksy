import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { graphql } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import { AUTH_QUERY } from '../graphql/queries';

import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import Notifications from '../components/Notifications/Notifications';
import { BookPanelProvider } from '../components/BookPanel/BookPanelContext';
import ErrorBoundry from '../components/ErrorBoundry';

const styles = theme => ({
  container: {
    fontFamily: "'Nunito', 'Open Sans', sans-serif",
    color: '#333',
    padding: '20px',
    paddingTop: '80px',
    margin: '0 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      paddingRight: '40px',
      paddingLeft: '280px',
    }
  }
});

class App extends Component {
  state = {
    mobileOpen: false,
  }

  handleDrawerToggle = () => {
    this.setState(prevState => ({ mobileOpen: !prevState.mobileOpen }));
  };

  render() {
    const { data, route, classes } = this.props;

    if (data.loading) return <div>Loading...</div>;
    if (data.error) return <div>Error</div>;
  
    return (
      <ErrorBoundry>
        <BookPanelProvider auth={data.auth}>
          <Header auth={data.auth} toggleDrawer={this.handleDrawerToggle} />
          <SideNav auth={data.auth} mobileOpen={this.state.mobileOpen} toggleDrawer={this.handleDrawerToggle} />
          <div className={classes.container}>
            { data.auth && <Notifications userId={data.auth.id} /> }
            { renderRoutes(route.routes, { auth: data.auth }) }
          </div>
        </BookPanelProvider>
      </ErrorBoundry>
    );
  }
}

export default graphql(AUTH_QUERY)(withStyles(styles)(App));
