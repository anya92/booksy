import React from 'react';
import Loadable from 'react-loadable';

import App from './pages/App';

import requireAuth from './HOC/requireAuth';
import requireBookOwner from './HOC/requireBookOwner';

const loading = () => null;

const AsyncHome = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ './pages/Home'),
  loading,
});

const AsyncMyShelf = Loadable({
  loader: () => import(/* webpackChunkName: "my_shelf" */ './pages/MyShelf'),
  loading, 
});

const AsyncAddBook = Loadable({
  loader: () => import(/* webpackChunkName: "add_book" */ './pages/AddBook'),
  loading,
});

const AsyncBooksByCategory = Loadable({
  loader: () => import(/* webpackChunkName: "books_by_category" */ './pages/BooksByCategory'),
  loading,
});

const AsyncEditBook = Loadable({
  loader: () => import(/* webpackChunkName: "edit_book" */ './pages/EditBook'),
  loading,
});

const AsyncRequests = Loadable({
  loader: () => import(/* webpackChunkName: "requests" */ './pages/Requests'),
  loading,
});

const AsyncBookmarks = Loadable({
  loader: () => import(/* webpackChunkName: "bookmarks" */ './pages/Bookmarks'),
  loading,
});

const AsyncAccount = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ './pages/Account'),
  loading,
});

export const NotFound404 = () => (
  <div><h1>Not Found 404</h1></div>
);

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
      path: '/books',
      exact: true,
      component: AsyncHome,
    },
    {
      path: '/books/:category',
      component: AsyncBooksByCategory,
    },
    {
      path: '/edit/:bookId',
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
    {
      path: '/account',
      component: requireAuth(AsyncAccount),
    },
    {
      path: '*',
      component: NotFound404,
    }
  ]
}];
