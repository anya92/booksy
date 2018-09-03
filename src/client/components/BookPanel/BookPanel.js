import React, { Component } from 'react';
import{ graphql, compose } from 'react-apollo';

import BookPanelContent from './BookPanelContent';

import {
  AUTH_QUERY,
  FETCH_BOOKMARKS_QUERY,
  FETCH_BOOK_BY_ID_QUERY, 
  FETCH_USER_BOOKS_QUERY,
  FETCH_ALL_BOOKS_QUERY,
  FETCH_REQUESTS_FROM_USER_QUERY,
} from '../../graphql/queries';

import {
  REMOVE_BOOK_BY_ID_MUTATION,
  REQUEST_BOOK_MUTATION,
  BOOKMARK_BOOK_MUTATION,
} from '../../graphql/mutations';

class SidePanel extends Component {
  state = {
    isHiding: false,
  }

  confirmRemove = title => {
    return window.confirm(`Are you sure you want to delete ${title}`);
  }

  removeBook = (id, title) => {
    if (this.confirmRemove(title)) {
      this.props.removeBook({
        variables: {
          id,
        },
        refetchQueries: [{
          query: FETCH_USER_BOOKS_QUERY,
        }, {
          query: FETCH_ALL_BOOKS_QUERY,
        }],
      }).then(() => this.closePanel());
    }
  }

  requestBook = (bookId, requestType) => {
    this.props.requestBook({
      variables: {
        bookId,
        requestType,
      },
      refetchQueries: [{
        query: FETCH_REQUESTS_FROM_USER_QUERY,       
      }],
    }).then(() => console.log('requested'));
  }

  bookmarkBook = id => {
    this.props.bookmarkBook({
      variables: {
        id,
      },
      refetchQueries: [{
        query: FETCH_BOOKMARKS_QUERY,       
      }],
      optimisticResponse: {
        __typename: 'Mutation',
        bookmarkBook: {
          __typename: 'Book',
          id,
        },
      },
      update: (proxy, { data: { bookmarkBook } }) => {

        const data = proxy.readQuery({ query: AUTH_QUERY });
        const bookmarksIds = data.auth.bookmarks.map(bookmark => bookmark.id);

        if (!bookmarksIds.includes(bookmarkBook.id)) {
          data.auth.bookmarks.push(bookmarkBook);
        } else {
          data.auth.bookmarks = [...data.auth.bookmarks].filter(bookmark => bookmark.id !== bookmarkBook.id);
        }

        proxy.writeQuery({ query: AUTH_QUERY, data });
      },
    });
  }

  closePanel = () => {
    this.setState(() => ({ isHiding: true }));
    this.props.close();
  }

  isOwner = () => {
    const { auth, data: { book } } = this.props;
    if (!auth) return false;
    return auth.id === book.owner.id;
  }

  render() {
    const { loading, error, book } = this.props.data;
    const { auth } = this.props;

    if (loading) return <div />;

    return (
      <BookPanelContent
        error={error}
        hide={this.state.isHiding}
        auth={auth}
        book={book}
        isOwner={this.isOwner()}
        bookmarkBook={this.bookmarkBook}
        removeBook={this.removeBook}
        requestBook={this.requestBook}
        closePanel={this.closePanel}
      />
    );
  }
}

export default compose(
  graphql(FETCH_BOOK_BY_ID_QUERY, {
    options: ({ bookId }) => { 
      return { variables: { id: bookId } };
    }
  }),
  graphql(REMOVE_BOOK_BY_ID_MUTATION, { name: 'removeBook' }),
  graphql(REQUEST_BOOK_MUTATION, { name: 'requestBook' }),
  graphql(BOOKMARK_BOOK_MUTATION, { name: 'bookmarkBook' }),
)(SidePanel);
