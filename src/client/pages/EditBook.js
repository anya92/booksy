import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import {
  FETCH_BOOK_BY_ID_QUERY,
  EDIT_BOOK_MUTATION,
  FETCH_USER_BOOKS_QUERY,
} from '../queries/bookQuery';

import BookForm from '../components/BookForm';
import { Title } from './MyShelf';

class EditBook extends Component {
  handleSubmit(book) {
    const { id } = this.props.data.book;
    this.props.mutate({
      variables: {
        id,
        ...book
      },
      refetchQueries: [{
        query: FETCH_USER_BOOKS_QUERY,
      }],
    }).then(() => this.props.history.push('/my-shelf'))
    .catch(console.log);
  }

  handleCancel() {
    this.props.history.goBack();
  }

  render() {
    const { loading, error, book } = this.props.data;

    if (loading) return <div />;
    if (error) return <div>Error</div>;

    return (
      <div>
        <Title>Edit <em>{book.title}</em></Title>
        <BookForm
          book={book}
          onSubmit={this.handleSubmit.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        />
      </div>
    );
  }
}

export default compose(
  graphql(FETCH_BOOK_BY_ID_QUERY, {
    options: ({ match: { params: { id }} }) => { 
      return { variables: { id } };
    }
  }),
  graphql(EDIT_BOOK_MUTATION)
)(EditBook);
