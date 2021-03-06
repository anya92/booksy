import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const ButtonsContainer = styled.div`
  margin-top: 20px;
  max-width: 400px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
`;

export default ({ auth, book, isOwner, removeBook, closePanel, requestBook }) => {
  if (!auth) {
    return <div>You have to be logged in to borrow or buy this book.</div>
  }

  if (isOwner) {
    return (
      <ButtonsContainer>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          onClick={() => removeBook(book.id, book.title)}>
          Delete
        </Button>
        <Link to={`/edit/${book.id}`} style={{
          color: '#FFF',
          textDecoration: 'none',
        }}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={closePanel}>
            Edit
          </Button>
        </Link>
      </ButtonsContainer>
    );
  }

  return (
    <ButtonsContainer>
      { book.toBorrow &&
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={() => requestBook(book.id, 'borrow')}>
        Borrow
      </Button> }
      { book.toSell &&
      <Button
      color="primary"
      variant="contained"
      size="large"
      onClick={() => requestBook(book.id, 'buy')}>
      Buy</Button> }
    </ButtonsContainer>
  );
}
