import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { FETCH_USER_BOOKS_QUERY } from '../graphql/queries';

import BooksGrid from '../components/BooksGrid';

class MyShelf extends Component {

  render() {
    const { data, auth } = this.props;

    if (data.loading) return <div>Loading...</div>; // todo -> loading component
    if (data.error) return <div>Error</div>; // todo -> error component

    return (
      <React.Fragment>
        <h1>My shelf</h1>
        <BooksGrid 
          books={data.userBooks} 
          auth={auth}
        />
      </React.Fragment>
    );
  }
};

export default graphql(FETCH_USER_BOOKS_QUERY)(MyShelf);
