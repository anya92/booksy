import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import FilterAndSort from '../FilterAndSort/FilterAndSort';
import BookCard from './BookCard';

import { Consumer } from '../BookPanel/BookPanelContext';

const styles = theme => ({
  container: {
    paddingTop: '20px',
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    },
  }
});

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

  setBooks = books => {
    this.setState(() => ({ books }));
  }

  render() {
    const { books } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <FilterAndSort
          books={this.props.books}
          setBooks={this.setBooks}
        />
        <Consumer>
          {(context) => (
            <div className={classes.container}>
              {
                books.map(book => (
                  <BookCard
                    key={book.id}
                    book={book}
                    handleClick={() => context.showPanel(book.id)}
                  />
                ))
              }
            </div>
          )}
        </Consumer>
      </div>
    );
  }
}

export default withStyles(styles)(BooksGrid);
