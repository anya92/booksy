import 'babel-polyfill';
import React from 'react';
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

import routes from './routes';

const GRAPHQL_ENDPOINT = 'http://localhost:7777/graphql';
const SUBSCRIPTIONS_ENDPOINT = 'ws://localhost:7777/subscriptions';

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: 'same-origin',
});

const wsLink = new WebSocketLink({
  uri: SUBSCRIPTIONS_ENDPOINT,
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
  }).restore(window.__APOLLO_STATE__),
}); 

hydrate(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <div>{ renderRoutes(routes) }</div>
    </BrowserRouter>
  </ApolloProvider>, 
  document.getElementById('root')
);
