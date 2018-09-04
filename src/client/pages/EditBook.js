import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import {
  FETCH_BOOK_BY_ID_QUERY,
  FETCH_ALL_BOOKS_QUERY,
  FETCH_USER_BOOKS_QUERY,
} from '../graphql/queries';

import { EDIT_BOOK_MUTATION } from '../graphql/mutations';

import BookForm from '../components/BookForm/BookForm';

class EditBook extends Component {
  handleSubmit = book => {
    const { id } = this.props.data.book;
    this.props.mutate({
      variables: {
        id,
        ...book
      },
      refetchQueries: [{
        query: FETCH_USER_BOOKS_QUERY,
      }, {
        query: FETCH_ALL_BOOKS_QUERY,
      }],
    }).then(() => this.props.history.push('/my-shelf'))
    .catch(console.log);
  }

  handleCancel = () => {
    this.props.history.goBack();
  }

  render() {
    const { loading, error, book } = this.props.data;

    if (loading) return <div />;
    if (error) return <div>Error</div>;

    return (
      <React.Fragment>
        <h1>Edit <em>{book.title}</em></h1>
        <BookForm
          book={book}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </React.Fragment>
    );
  }
}

export default compose(
  graphql(FETCH_BOOK_BY_ID_QUERY, {
    options: ({ match: { params: { bookId }} }) => {
      return { 
        variables: { id: bookId },
      };
    }
  }),
  graphql(EDIT_BOOK_MUTATION)
)(EditBook);
