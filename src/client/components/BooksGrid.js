import React, { Component } from 'react';
import styled from 'styled-components';

import media from '../styled/mediaQueries';

import BookSide from './BookSide';

const Grid = styled.div`
  display: grid;
  ${media.phone`
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
  `}
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  justify-content: center;
  padding-top: 20px;
`;

const Book = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  &:hover {
  }
  cursor: pointer;
`;

const BookCover = styled.div`
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BookDescription = styled.div`
  padding: 10px 0;
`;

const BookTitle = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 16px;
`;

const BookAuthor = styled.div`
  color: #999;
  font-size: 14px;
`;

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
        { 
          this.state.showBookSide && (
            <BookSide 
              bookId={this.state.showBookId} 
              close={this.hideSide.bind(this)}
              auth={this.props.auth}
            />
          )
        }
      </Grid>
    );
  }
}

export default BooksGrid;
