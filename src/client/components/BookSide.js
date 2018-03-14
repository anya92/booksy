import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import{ graphql, compose } from 'react-apollo';
import styled from 'styled-components';

import {
  FETCH_BOOK_BY_ID_QUERY, 
  FETCH_USER_BOOKS_QUERY,
  REMOVE_BOOK_BY_ID_MUTATION
} from '../queries/bookQuery';

const Side = styled.div`
  width: 400px;
  max-width: 100%;
  position: fixed;
  top: 81px;
  bottom: 0;
  right: 0;
  background: #FFF;
  z-index: 4;
  animation: slideIn .6s ease-out forwards;
  &.hide {
    animation: slideOut .6s ease-out forwards;
  }
  @keyframes slideIn {
    from { right: -450px; }
    to { right: 0px; }
  }
  @keyframes slideOut {
    from { right: 0px; }
    to { right: -450px; }
  }
  padding: 20px 25px;
  overflow-y: scroll;
  &::-webkit-scrollbar { 
    display: none; 
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
  font-size: 36px;
  font-weight: 300;
  color: #999;
  cursor: pointer;
`;

const Slide = styled.div`
  opacity: 0;
  transform: ${props => props.down ? 'translateY(-50px)' : 'translateY(50px)'};
  animation: ${props => props.down ? 'slideDown' : 'slideUp'} .4s .2s ease-out forwards;
  @keyframes slideDown {
    from { opacity: 0; transform: 'translateY(-50px)'; }
    to { opacity: 1; transform: translateY(0); }    
  }
  @keyframes slideUp {
    from { opacity: 0; transform: 'translateY(50px)'; }
    to { opacity: 1; transform: translateY(0); }    
  }
`;

const BookAuthor = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const BookTitle = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
`;

const BookCategory = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #777;
  text-align: center;
`;

const BookDescription = styled.div`
  margin-top: 40px;
  font-size: 16px;
  color: #555;
  font-weight: 400;
  line-height: 1.5;
`;
const BookOwner = styled.div`
  font-size: 14px;
  margin: 20px 0;
  padding: 20px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;
const Buttons = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
`;
const Button = styled.button`
  font-weight: 700;
  border: none;
  height: 50px;
  cursor: pointer;
  color: #FFF;
  background: ${props => props.danger ? '#B33771' : '#9AECDB' };
  border-radius: 4px;
  a {
    color: #FFF;
    text-decoration: none;
  }
`;

const Background = styled.div`
  position: fixed;
  top: 81px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  background: #555;
  opacity: 0;
  animation: show .4s ease-out forwards;
  &.hide {
    animation: hide .4s ease-out forwards;
  }
  @keyframes show {
    from { opacity: 0; }
    to { opacity: 0.8; }
  }
  @keyframes hide {
    from { opacity: 0.8; }
    to { opacity: 0; }
  }
`; 

class BookSide extends Component {

  removeBook(id) {
    // todo add confirm
    this.props.mutate({
      variables: {
        id,
      },
      refetchQueries: [{
        query: FETCH_USER_BOOKS_QUERY,
      }],
    }).then(() => this.closeSide());
  }

  closeSide() {
    this.container.classList.add('hide');
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
        <Slide down>
          <BookAuthor>{book.author}</BookAuthor>
          <BookTitle>{book.title}</BookTitle>
          <BookCategory># {book.category}</BookCategory>
        </Slide>
        <Slide up>
          <BookDescription>{book.description}</BookDescription>
          <BookOwner>Book owned by <strong>{book.owner.name}</strong></BookOwner>
          {
            auth && this.isOwner() 
            ? (
                <Buttons>
                  <Button><Link to={`/edit/${book.id}`}>Edit</Link></Button>
                  <Button danger onClick={() => this.removeBook(book.id)}>Delete</Button>
                </Buttons>
              )
            : ( 
                <Buttons>
                  { book.toBorrow && <Button>Borrow</Button> }
                  { book.toSell && <Button>Buy</Button> }                
                </Buttons>
              )
          }
        </Slide>
      </div>  
    );
  }

  render() {
    return (
      <div>
        <Background innerRef={ref => (this.background = ref)} />
        <Side innerRef={ref => (this.container = ref)}>
          <CloseButton onClick={() => this.closeSide()}>&times;</CloseButton>
          { this.renderContent() }
        </Side>
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
)(BookSide);
