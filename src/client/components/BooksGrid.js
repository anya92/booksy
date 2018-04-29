import React, { Component } from 'react';

import FilterAndSort from './FilterAndSort';
import * as Grid from '../styled/BooksGrid';

import { Consumer } from './SidePanelContext';

class BooksGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: props.books || [],
    };
  }

  componentWillReceiveProps({ books }) {
    this.setState({ books });
  }

  setBooks(books) {
    this.setState(() => ({ books }));
  }

  addDefaultSrc(e){
    e.target.src = 'https://cor-cdn-static.bibliocommons.com/assets/default_covers/icon-book-93409e4decdf10c55296c91a97ac2653.png';
  }

  render() {
    const { books } = this.state;
    return (
      <div>
        <FilterAndSort books={this.props.books} setBooks={this.setBooks.bind(this)} />
        <Consumer>
          {(context) => (
            <Grid.Container>
              {
                books.map(book => (
                  <Grid.Book key={book.id} onClick={() => context.showPanel(book.id)}>
                    <Grid.BookCover>
                      <img onError={this.addDefaultSrc} src={book.image} alt={book.title} />
                    </Grid.BookCover>
                    <Grid.BookDescription>
                      <Grid.BookTitle>{book.title}</Grid.BookTitle>
                      <Grid.BookAuthor>{book.author}</Grid.BookAuthor>
                    </Grid.BookDescription>
                  </Grid.Book>
                ))
              }
            </Grid.Container>
          )}
        </Consumer>
      </div>
    );
  }
}

export default BooksGrid;
