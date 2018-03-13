import React from 'react';
import { graphql } from 'react-apollo';

import { FETCH_USER_BOOKS_QUERY } from '../queries/bookQuery';

import BooksGrid from '../components/BooksGrid';

const MyShelf = ({ data }) => {
  if (data.loading) return <div>Loading...</div>;
  if (data.error) return <div>Error</div>;
  
  return <BooksGrid books={data.userBooks} />
};

export default graphql(FETCH_USER_BOOKS_QUERY)(MyShelf);
