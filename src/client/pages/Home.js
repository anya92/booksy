import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { FETCH_ALL_BOOKS_QUERY } from '../graphql/queries';
import loadingAndErrorHandler from '../HOC/loadingAndErrorHandler';

import BooksGrid from '../components/BooksGrid/BooksGrid';

const Home = ({ allBooks, auth }) => (
  <React.Fragment>
    <h1>All books</h1>
    <BooksGrid 
      books={allBooks.books} 
      auth={auth}
    />
  </React.Fragment>
);

export default compose(
  graphql(FETCH_ALL_BOOKS_QUERY, { name: 'allBooks' }),
  loadingAndErrorHandler('allBooks')
)(Home);

