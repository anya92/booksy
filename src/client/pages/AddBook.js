import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Typography from "@material-ui/core/Typography";

import {
  FETCH_USER_BOOKS_QUERY, 
  FETCH_ALL_BOOKS_QUERY,
} from '../graphql/queries';

import { ADD_BOOK_MUTATION } from '../graphql/mutations';

import BookForm from '../components/BookForm';

class AddBook extends Component {
  handleSubmit(book) {
    this.props.mutate({
      variables: {
        ...book
      },
      refetchQueries: [{
        query: FETCH_USER_BOOKS_QUERY,
      }, {
        query: FETCH_ALL_BOOKS_QUERY,
      }],
    }).then(() => this.props.history.push('/my-shelf'));
  }

  handleCancel() {
    this.props.history.goBack();
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="display1">Add a new book</Typography>
        <BookForm
          onSubmit={this.handleSubmit.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        />
      </React.Fragment>
    );
  }
}

export default graphql(ADD_BOOK_MUTATION)(AddBook);
