import React from 'react';
import { graphql, compose } from 'react-apollo';

import { FETCH_BOOKMARKS_QUERY } from '../graphql/queries';
import loadingAndErrorHandler from '../HOC/loadingAndErrorHandler';

import BooksGrid from '../components/BooksGrid/BooksGrid';

const Bookmarks = ({ bookmarks, auth }) => (
  <React.Fragment>
    <h1>Bookmarks</h1>
    <BooksGrid 
      books={bookmarks.bookmarks} 
      auth={auth}
    />
  </React.Fragment>
);

export default compose(
  graphql(FETCH_BOOKMARKS_QUERY, { name: 'bookmarks' }),
  loadingAndErrorHandler('bookmarks')
)(Bookmarks);
