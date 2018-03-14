import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { ADD_BOOK_MUTATION, FETCH_USER_BOOKS_QUERY } from '../queries/bookQuery';

import BookForm from '../components/BookForm';
import { Title } from './MyShelf';

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

  handleCancel() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <Title>Add a new book</Title>
        <BookForm
          onSubmit={this.handleSubmit.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(ADD_BOOK_MUTATION)(AddBook);
