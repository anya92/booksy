import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { FETCH_USER_BOOKS_QUERY } from '../graphql/queries';
import loadingAndErrorHandler from '../HOC/loadingAndErrorHandler';

import BooksGrid from '../components/BooksGrid';

const MyShelf = ({ userBooks, auth }) => (
  <React.Fragment>
    <h1>My shelf</h1>
    <BooksGrid 
      books={userBooks.userBooks} 
      auth={auth}
    />
  </React.Fragment>
);

export default compose(
  graphql(FETCH_USER_BOOKS_QUERY, { name: 'userBooks' }),
  loadingAndErrorHandler('userBooks')
)(MyShelf);
