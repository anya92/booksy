import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import { FETCH_USER_BOOKS_QUERY } from '../graphql/queries';

import BooksGrid from '../components/BooksGrid';
import FilterAndSort from '../components/FilterAndSort';

export const Title = styled.h1`
  margin: 40px 0;
  font-weight: 700;
`;

class MyShelf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'all',
      books: props.data.userBooks || [],
    };
  }

  // componentWillReceiveProps({ data: { userBooks } }) {
  //   this.setState(() => ({
  //     category: 'all',
  //     filteredBooks: userBooks, 
  //   }));
  // }

  setBooks(books) {
    this.setState(() => ({ books }));
  }

  render() {
    const { data, auth } = this.props;

    if (data.loading) return <div>Loading...</div>; // todo -> loading component
    if (data.error) return <div>Error</div>; // todo -> error component

    return (
      <div>
        <Title>My shelf</Title>
        <FilterAndSort books={data.userBooks} setBooks={this.setBooks.bind(this)} />
        <BooksGrid 
          books={this.state.books} 
          auth={auth}
        />
      </div>
    );
  }
};

export default graphql(FETCH_USER_BOOKS_QUERY)(MyShelf);
