import 'babel-polyfill';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { execute, subscribe } from 'graphql';
import { createExpressContext } from 'apollo-resolvers';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const MongoStore = require('connect-mongo')(session);

require('dotenv').config({ path: 'variables.env' });

import createClient from './helpers/createClient';
import renderer from './helpers/renderer';

const app = express();
const PORT = process.env.PORT || 7777;

app.use('*', cors());
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('error', console.log);
mongoose.Promise = global.Promise;

require('./models');
require('./helpers/passport.js');

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
}));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

/* GOOGLE AUTH ENDPOINTS */

app.get('/auth/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', 
  passport.authenticate('google'), (req, res) => {
    res.redirect('/');
  }
);

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/api/current_user', (req, res) => {
  res.json({user : req.user });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    // req.session.bounceTo = req.header('Referer') || '/';
    res.redirect('/auth/google');
  }    
}

/* GRAPHQL ENDPOINTS */

const schema = require('./graphql/schema');

app.use(
  '/graphql',
  // isAuthenticated,
  bodyParser.json(),
  graphqlExpress((req, res) => {
    const user = req.user;

    const context = createExpressContext({
      user
    }, res);

    return {
      schema,
      context,
    };
  }),
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
}));

/* RENDERING REACT APP */

app.get('*', async (req, res) => {
  const client = createClient(req);
  const context = {};
  const content = await renderer(req, client, context);

  res.send(content);
});

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`
    ============================================
    Running on http://localhost:${PORT}/
    ---------------------------------------------
    GraphiQL on http://localhost:${PORT}/graphiql
    =============================================
  `);
  new SubscriptionServer({
    execute,
    subscribe,
    schema,
  }, {
    server,
    path: '/subscriptions',
  });
});
