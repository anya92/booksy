import React, { Component } from 'react';

import SidePanel from './SidePanel';

import * as Grid from '../styled/BooksGrid';

class BooksGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSidePanel: false,
      showBookId: '',
    };
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
    const { books } = this.props;
    return (
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
    );
  }
}

export default BooksGrid;
