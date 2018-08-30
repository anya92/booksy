import 'babel-polyfill';
import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import Loadable from 'react-loadable';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import routes from './routes';

const httpLink = new HttpLink({
  uri: 'http://localhost:7777/graphql',
  // uri: 'https://booksy.now.sh/graphql',
  credentials: 'same-origin',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:7777/graphql',
  // uri: 'wss://booksy.now.sh/subscriptions',
  options: {
    reconnect: true
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    dataIdFromObject: o => o.id,
    connectToDevtools: true,
  }).restore(window.__APOLLO_STATE__),
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0097e6'
    },
    type: 'light',
  },
});

class Main extends Component {
  componentDidMount = () => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <div>{renderRoutes(routes)}</div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}


Loadable.preloadReady().then(() => {
  hydrate(
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>, 
    document.getElementById('root')
  );
});
