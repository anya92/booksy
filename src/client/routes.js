import React from 'react';

import App from './components/App';
import Home from './components/Home';
import MyShelf from './components/MyShelf';
import AddBook from './components/AddBook';

export default [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: Home,
    },
    {
      path: '/add',
      component: AddBook,
    },
    {
      path: '/my-shelf',
      component: MyShelf,
    },
  ]
}];
