import React from 'react';

import App from './pages/App';
import Home from './pages/Home';
import MyShelf from './pages/MyShelf';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

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
    {
      path: '/edit/:id',
      component: EditBook,
    },
  ]
}];
