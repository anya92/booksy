import React from 'react';

import App from './pages/App';
import Home from './pages/Home';
import MyShelf from './pages/MyShelf';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import Requests from './pages/Requests';

import requireAuth from './HOC/requireAuth';

export default [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: Home,
    },
    {
      path: '/my-shelf',
      component: requireAuth(MyShelf),
    },
    {
      path: '/add',
      component: requireAuth(AddBook),
    },
    {
      path: '/edit/:id',
      component: EditBook,
    },
    {
      path: '/requests',
      component: requireAuth(Requests),
    },
  ]
}];
