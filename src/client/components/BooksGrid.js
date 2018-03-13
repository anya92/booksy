import React, { Component } from 'react';
import styled from 'styled-components';

import BookSide from './BookSide';

const Grid = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fit, 160px);
`;

const Book = styled.div`
  transition: all .2s ease-in-out;
  &:hover {
    transform: translateY(-2px);
  }
  cursor: pointer;
`;

const BookCover = styled.div`
  img {
    width: 100%;
    object-fit: cover;
  }
`;

const BookDescription = styled.div`
  padding: 10px 0;
`;
const BookTitle = styled.div``;
const BookAuthor = styled.div``;

class BooksGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBookSide: false,
      showBookId: '',
    };
  }

  hideSide() {
    setTimeout(() => {
      this.setState({
        showBookSide: false,
        showBookId: '',
      })
    }, 600);
  }

  render() {
    const { books } = this.props;
    return (
      <Grid>
        {
          books.map(book => (
            <Book 
              key={book.id}
              onClick={() => this.setState({ showBookSide: true, showBookId: book.id })}
            >
              <BookCover>
                <img src={book.image} alt={book.title} />
              </BookCover>
              <BookDescription>
                <BookTitle>
                  {book.title}
                </BookTitle>
                <BookAuthor>
                  {book.author}
                </BookAuthor>
              </BookDescription>
            </Book>
          ))
        }
        { this.state.showBookSide && <BookSide bookId={this.state.showBookId} close={this.hideSide.bind(this)} /> }
      </Grid>
    );
  }
}

export default BooksGrid;
