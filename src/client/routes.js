import React from 'react';

import App from './pages/App';
import Home from './pages/Home';
import MyShelf from './pages/MyShelf';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import Requests from './pages/Requests';

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
      component: MyShelf,
    },
    {
      path: '/add',
      component: AddBook,
    },
    {
      path: '/edit/:id',
      component: EditBook,
    },
    {
      path: '/requests',
      component: Requests,
    },
  ]
}];
