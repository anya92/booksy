import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { ADD_BOOK_MUTATION, FETCH_USER_BOOKS_QUERY } from '../queries/bookQuery';

import BookForm from '../components/BookForm';

class AddBook extends Component {
  handleSubmit(book) {
    this.props.mutate({
      variables: {
        ...book
      },
      refetchQueries: [{
        query: FETCH_USER_BOOKS_QUERY,
      }],
    }).then(() => this.props.history.push('/my-shelf'));
  }

  render() {
    return (
      <div>
        Add Book
        <BookForm
          onSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(ADD_BOOK_MUTATION)(AddBook);
