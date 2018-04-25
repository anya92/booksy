import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { FETCH_ALL_BOOKS_QUERY } from '../graphql/queries';

import FilterAndSort from '../components/FilterAndSort';
import BooksGrid from '../components/BooksGrid';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: props.data.books || [],
    };
  }

  setBooks(books) {
    this.setState(() => ({ books }));
  }

  render() {
    const { data, auth } = this.props;

    if (data.loading) return <div>Loading...</div>;
    if (data.error) return <div>Error</div>;

    return (
      <React.Fragment>
        <h1>All books</h1>
        <FilterAndSort books={data.books} setBooks={this.setBooks.bind(this)} />
        <BooksGrid books={this.state.books} auth={auth} />
      </React.Fragment>
    );
  }
}

export default graphql(FETCH_ALL_BOOKS_QUERY)(Home);
