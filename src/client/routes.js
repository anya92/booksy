import Loadable from 'react-loadable';

import App from './pages/App';

import requireAuth from './HOC/requireAuth';
import requireBookOwner from './HOC/requireBookOwner';

import EditBook from './pages/EditBook';

const loading = () => null;

const AsyncHome = Loadable({
  loader: () => import('./pages/Home'),
  loading,
});

const AsyncMyShelf = Loadable({
  loader: () => import('./pages/MyShelf'),
  loading, 
});

const AsyncAddBook = Loadable({
  loader: () => import('./pages/AddBook'),
  loading,
});

// const AsyncEditBook = Loadable({
//   loader: () => import('./pages/EditBook'),
//   loading,
// });

const AsyncRequests = Loadable({
  loader: () => import('./pages/Requests'),
  loading,
});

const AsyncBookmarks = Loadable({
  loader: () => import('./pages/Bookmarks'),
  loading,
});

const AsyncAccount = Loadable({
  loader: () => import('./pages/Account'),
  loading,
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
      path: '/edit/:bookId',
      component: requireBookOwner(EditBook),
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
    }
  ]
}];
