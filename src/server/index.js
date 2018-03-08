import 'babel-polyfill';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import createClient from './helpers/createClient';
import renderer from './helpers/renderer';
import schema from './graphql/schema';

const app = express();

app.use('*', cors());
app.use(express.static('public'));

app.get('/api', (req, res) => res.json({ ok: true }));

/* GraphQL Endpoints */

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

const PORT = process.env.PORT || 7777;

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
}));

/* Render React App */

app.get('*', async (req, res) => {
  const client = createClient(req);
  const context = {};
  const content = await renderer(req, client, context);

  res.send(content);
});

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}/`);
  new SubscriptionServer({
    execute,
    subscribe,
    schema,
  }, {
    server,
    path: '/subscriptions',
  });
});
