import React from 'react';

import App from './pages/App';
import Home from './pages/Home';
import MyShelf from './pages/MyShelf';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import Requests from './pages/Requests';
import Bookmarks from './pages/Bookmarks';

import requireAuth from './HOC/requireAuth';
import requireBookOwner from './HOC/requireBookOwner';

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
      component: requireBookOwner(EditBook),
    },
    {
      path: '/requests',
      component: requireAuth(Requests),
    },
    {
      path: '/bookmarks',
      component: requireAuth(Bookmarks),
    },
  ]
}];
