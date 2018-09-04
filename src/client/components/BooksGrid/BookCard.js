import React from 'react'

import * as Card from './BookCardStyled';

export default ({ book, handleClick }) => {
  return (
    <Card.Container key={book.id} onClick={handleClick}>
      <Card.Cover>
        <img src={book.image || 'https://via.placeholder.com/300x400?text=x'} alt={book.title} />
      </Card.Cover>
      <Card.Description>
        <Card.Title>{book.title}</Card.Title>
        <Card.Author>{book.author}</Card.Author>
      </Card.Description>
    </Card.Container>
  )
}
