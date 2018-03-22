import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { FETCH_ALL_BOOKS_QUERY } from '../graphql/queries';

import BooksGrid from '../components/BooksGrid';

class Home extends Component {
  render() {
    const { data, auth } = this.props;
    if (data.loading) return <div>Loading...</div>;
    if (data.error) return <div>Error</div>;
    return <BooksGrid books={data.books} auth={auth} />
  }
}

export default graphql(FETCH_ALL_BOOKS_QUERY)(Home);
