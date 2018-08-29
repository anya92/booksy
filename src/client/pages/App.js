import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { graphql } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { AUTH_QUERY } from '../graphql/queries';

import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Notifications from '../components/Notifications';
import { SidePanelProvider } from '../components/SidePanelContext';

import theme from '../styled/theme';
import Container from '../styled/Container';

const muiTheme = createMuiTheme({
  palette: {
    // primary: green,
    // accent: red,
    type: 'light',
  },
});

class App extends Component {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { data, route } = this.props;

    if (data.loading) return <div>Loading...</div>;
    if (data.error) return <div>Error</div>;
  
    return (

        <ThemeProvider theme={theme}>
          <SidePanelProvider auth={data.auth}>
            <Header auth={data.auth} />
            <SideNav auth={data.auth} />
            <Container>
              { data.auth && <Notifications userId={data.auth.id} /> }
              { renderRoutes(route.routes, { auth: data.auth }) }
            </Container>
          </SidePanelProvider>
        </ThemeProvider>
    );
  }
}

export default graphql(AUTH_QUERY)(App);
