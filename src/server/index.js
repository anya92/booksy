import 'babel-polyfill';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import Loadable from 'react-loadable';

const MongoStore = require('connect-mongo')(session);

require('dotenv').config({ path: 'variables.env' });

import createClient from './helpers/createClient';
import renderer from './helpers/renderer';

const app = express();
const PORT = process.env.PORT || 7777;

app.use('*', cors());
app.use('/assets', express.static('public'));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

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

// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     // req.session.bounceTo = req.header('Referer') || '/';
//     res.redirect('/auth/google');
//   }    
// }

/* GRAPHQL ENDPOINTS */

const schema = require('./graphql/schema');

const server = new ApolloServer({
  schema,
  context: ({ req, connection }) => {
    if (connection) {
      return {};
    } else {
      const { user } = req;
      return { user };
    }
  },
});

server.applyMiddleware({ app });

/* RENDERING REACT APP */

app.get('*', async (req, res) => {
  const client = createClient(req);
  const context = {};

  const content = await renderer(req, client, context);

  if (context.url) {
    return res.redirect(301, context.url);
  }

  res.send(content);
});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

Loadable.preloadAll().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`
      =============================================
      🚀 Server ready at http://localhost:${PORT}/
      ---------------------------------------------
      🚀 GraphQL ready at http://localhost:${PORT}/${server.graphqlPath}
      =============================================
    `);
  });
});
