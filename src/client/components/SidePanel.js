import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import{ graphql, compose } from 'react-apollo';

import {
  AUTH_QUERY,
  FETCH_BOOKMARKS_QUERY,
  FETCH_BOOK_BY_ID_QUERY, 
  FETCH_USER_BOOKS_QUERY,
  FETCH_ALL_BOOKS_QUERY,
  FETCH_REQUESTS_FROM_USER_QUERY,
} from '../graphql/queries';

import {
  REMOVE_BOOK_BY_ID_MUTATION,
  REQUEST_BOOK_MUTATION,
  BOOKMARK_BOOK_MUTATION,
} from '../graphql/mutations';

import * as Panel from '../styled/SidePanel';
import { ButtonsContainer, Button, LinkButton } from '../styled/Buttons';

class SidePanel extends Component {

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  confirmRemove(title) {
    return window.confirm(`Are you sure you want to delete ${title}`);
  }

  removeBook(id, title) {
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

  requestBook(bookId, requestType) {
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

  bookmarkBook(id) {
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

  closePanel() {
    this.panel.classList.add('hide');
    this.background.classList.add('hide');
    this.props.close();
  }

  isOwner() {
    const { auth, data: { book } } = this.props;
    return auth.id === book.owner.id;
  }

  renderButtons() {
    const { auth, data : { book } } = this.props;
    if (!auth) {
      return <div>You have to be logged in to borrow or buy this book.</div>
    } 
    if (this.isOwner()) {
      return (
        <ButtonsContainer>
          <LinkButton onClick={() => this.closePanel()}>
            <Link to={`/edit/${book.id}`}>Edit</Link>
          </LinkButton>
          <Button 
            danger 
            onClick={() => this.removeBook(book.id, book.title)}
          >
            Delete
          </Button>
        </ButtonsContainer>
      );
    }
    return (
      <ButtonsContainer>
        { book.toBorrow && <Button onClick={() => this.requestBook(book.id, 'borrow')}>Borrow</Button> }
        { book.toSell && <Button onClick={() => this.requestBook(book.id, 'buy')}>Buy</Button> } 
      </ButtonsContainer>
    );
  }

  renderBookmark() {
    const { auth, data: { book } } = this.props;
    if (auth) {
      const bookmarksIds = auth.bookmarks.map(bookmark => bookmark.id);
      return bookmarksIds.includes(book.id) 
        ? <i className="fa fa-bookmark" onClick={() => this.bookmarkBook(book.id)} />
        : <i className="fa fa-bookmark-o" onClick={() => this.bookmarkBook(book.id)} />;
    }
  }

  renderContent() {
    const { loading, error, book } = this.props.data;
    const { auth } = this.props;

    if (loading) return <div />;
    if (error) return <div>Error</div>;

    return (
      <div>
        <Panel.Slide down>
          <Panel.Bookmark>
            { this.renderBookmark() }
          </Panel.Bookmark>
          <Panel.BookAuthor>{book.author}</Panel.BookAuthor>
          <Panel.BookTitle>{book.title}</Panel.BookTitle>
          <Panel.BookCategory>{book.category && `#${book.category}`}</Panel.BookCategory>
        </Panel.Slide>
        <Panel.Slide up>
          <Panel.BookDescription>{book.description}</Panel.BookDescription>
          <Panel.BookOwner>
            Book owned by <strong>{book.owner.name}</strong>,
          </Panel.BookOwner>
          { this.renderButtons() }
        </Panel.Slide>
      </div>  
    );
  }

  render() {
    return (
      <div>
        <Panel.Background innerRef={ref => (this.background = ref)} onClick={() => this.closePanel()} />
        <Panel.Container innerRef={ref => (this.panel = ref)}>
          <Panel.Close onClick={() => this.closePanel()}>
            &times;
          </Panel.Close>
          { this.renderContent() }
        </Panel.Container>
      </div>
    )
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
