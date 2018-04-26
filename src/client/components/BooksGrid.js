import React, { Component } from 'react';

import SidePanel from './SidePanel';
import FilterAndSort from './FilterAndSort';
import * as Grid from '../styled/BooksGrid';

class BooksGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: props.books || [],
      showSidePanel: false,
      showBookId: '',
    };
  }

  componentWillReceiveProps({ books }) {
    this.setState({ books });
  }

  setBooks(books) {
    this.setState(() => ({ books }));
  }

  showPanel(id) {
    document.body.style.overflow = 'hidden';
    this.setState({ showSidePanel: true, showBookId: id });
  }

  hidePanel() {
    setTimeout(() => {
      this.setState({
        showSidePanel: false,
        showBookId: '',
      });
    }, 600);
  }

  addDefaultSrc(e){
    e.target.src = 'https://cor-cdn-static.bibliocommons.com/assets/default_covers/icon-book-93409e4decdf10c55296c91a97ac2653.png';
  }

  render() {
    const { books } = this.state;
    return (
      <React.Fragment>
        <FilterAndSort books={this.props.books} setBooks={this.setBooks.bind(this)} />
        <Grid.Container>
          {
            books.map(book => (
              <Grid.Book 
                key={book.id}
                onClick={() => this.showPanel(book.id)}
              >
                <Grid.BookCover>
                  <img onError={this.addDefaultSrc} src={book.image} alt={book.title} />
                </Grid.BookCover>
                <Grid.BookDescription>
                  <Grid.BookTitle>
                    {book.title}
                  </Grid.BookTitle>
                  <Grid.BookAuthor>
                    {book.author}
                  </Grid.BookAuthor>
                </Grid.BookDescription>
              </Grid.Book>
            ))
          }
          { 
            this.state.showSidePanel && (
              <SidePanel 
                bookId={this.state.showBookId} 
                close={this.hidePanel.bind(this)}
                auth={this.props.auth}
              />
            )
          }
        </Grid.Container>
      </React.Fragment>
    );
  }
}

export default BooksGrid;
