import Loadable from 'react-loadable';
import React from 'react';

import App from './pages/App';

import requireAuth from './HOC/requireAuth';
import requireBookOwner from './HOC/requireBookOwner';

const AsyncHome = Loadable({
  loader: () => import('./pages/Home'),
  loading: () => <div />,
});

const AsyncMyShelf = Loadable({
  loader: () => import('./pages/MyShelf'),
  loading: () => <div />, 
});

const AsyncAddBook = Loadable({
  loader: () => import('./pages/AddBook'),
  loading: () => <div />,
});

const AsyncEditBook = Loadable({
  loader: () => import('./pages/EditBook'),
  loading: () => <div />,
});

const AsyncRequests = Loadable({
  loader: () => import('./pages/Requests'),
  loading: () => <div />,
});

const AsyncBookmarks = Loadable({
  loader: () => import('./pages/Bookmarks'),
  loading: () => <div />,
});

export default [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: AsyncHome,
    },
    {
      path: '/my-shelf',
      component: requireAuth(AsyncMyShelf),
    },
    {
      path: '/add',
      component: requireAuth(AsyncAddBook),
    },
    {
      path: '/edit/:id',
      component: requireBookOwner(AsyncEditBook),
    },
    {
      path: '/requests',
      component: requireAuth(AsyncRequests),
    },
    {
      path: '/bookmarks',
      component: requireAuth(AsyncBookmarks),
    },
  ]
}];
