import React from 'react';

import App from './components/App';

const Home = () => (
  <h1>Home</h1>
);

export default [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: Home,
    },
  ]
}];
