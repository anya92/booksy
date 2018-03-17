import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import{ graphql, compose } from 'react-apollo';

import {
  FETCH_BOOK_BY_ID_QUERY, 
  FETCH_USER_BOOKS_QUERY,
  REMOVE_BOOK_BY_ID_MUTATION
} from '../queries/bookQuery';

import * as Panel from '../styled/SidePanel';
import { ButtonsContainer, Button, LinkButton } from '../styled/Buttons';

class SidePanel extends Component {

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  removeBook(id) {
    // todo add confirm
    this.props.mutate({
      variables: {
        id,
      },
      refetchQueries: [{
        query: FETCH_USER_BOOKS_QUERY,
      }],
    }).then(() => this.closePanel());
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

  renderContent() {
    const { loading, error, book } = this.props.data;
    const { auth } = this.props;

    if (loading) return <div />;
    if (error) return <div>Error</div>;
    
    return (
      <div>
        <Panel.Slide down>
          <Panel.BookAuthor>{book.author}</Panel.BookAuthor>
          <Panel.BookTitle>{book.title}</Panel.BookTitle>
          <Panel.BookCategory>{book.category && `#${book.category}`}</Panel.BookCategory>
        </Panel.Slide>
        <Panel.Slide up>
          <Panel.BookDescription>{book.description}</Panel.BookDescription>
          <Panel.BookOwner>Book owned by <strong>{book.owner.name}</strong></Panel.BookOwner>
          {
            auth && this.isOwner() 
            ? (
                <ButtonsContainer>
                  <LinkButton>
                    <Link to={`/edit/${book.id}`}>Edit</Link>
                  </LinkButton>
                  <Button 
                    danger 
                    onClick={() => this.removeBook(book.id)}
                  >
                    Delete
                  </Button>
                </ButtonsContainer>
              )
            : ( 
                <ButtonsContainer>
                  { book.toBorrow && <Button>Borrow</Button> }
                  { book.toSell && <Button>Buy</Button> } 
                </ButtonsContainer>
              )
          }
        </Panel.Slide>
      </div>  
    );
  }

  render() {
    return (
      <div>
        <Panel.Background innerRef={ref => (this.background = ref)} />
        <Panel.Container innerRef={ref => (this.panel = ref)}>
          <Panel.Close
            onClick={() => this.closePanel()}
          >&#x2715;</Panel.Close>
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
  graphql(REMOVE_BOOK_BY_ID_MUTATION),
)(SidePanel);
