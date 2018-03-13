import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { FETCH_BOOKS_QUERY } from '../queries/bookQuery';

import BooksGrid from '../components/BooksGrid';

class Home extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) return <div>Loading...</div>;
    if (data.error) return <div>Error</div>;
    return <BooksGrid books={data.books} />
  }
}

export default graphql(FETCH_BOOKS_QUERY)(Home);
