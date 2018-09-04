import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Filter from './Filter';
import Sort from './Sort';

const styles = () => ({
  container: {
    borderBottom: '1px solid #fff',
    margin: '10px 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '20px',
  },
});

class FilterAndSort extends Component {
  state = {
    sortAnchorEl: null,
    categoryAnchorEl: null,
    category: 'all',
    sortBy: 'date added (newest)',
  }

  filterBooks = books => {
    const { category } = this.state;
    const filteredBooks = books.filter(book => (
      category == 'all' ? book : book.category.toLowerCase() == category
    ));

    return filteredBooks;
  }

  sortBooks = books => {
    const { sortBy } = this.state;
 
    switch (sortBy) {
      case 'date added (newest)':
        return [...books].sort((a, b) => new Date(b.added) - new Date(a.added));
      case 'date added (oldest)':
        return [...books].sort((a, b) => new Date(a.added) - new Date(b.added));
      case 'title (A-Z)':
        return [...books].sort((a, b) => a.title > b.title);
      case 'title (Z-A)':
        return [...books].sort((a, b) => a.title < b.title);
      default:
        return books;
    }
  }

  filterAndSort = () => {
    const { books, setBooks } = this.props;
    // filter books
    const filteredBooks = this.filterBooks(books);
    // sort books
    const sortedBooks = this.sortBooks(filteredBooks);
    // set books
    setBooks(sortedBooks);
  }

  handleSortOpen = e => {
    this.setState({ sortAnchorEl: e.currentTarget });
  }

  handleCategoryOpen = e => {
    this.setState({ categoryAnchorEl: e.currentTarget });
  }

  handleSortClose = () => {
    this.setState({ sortAnchorEl: null });
  }

  handleCategoryClose = () => {
    this.setState({ categoryAnchorEl: null });
  }

  handleSortItemClick = option => {
    this.setState(() => ({
      sortAnchorEl: null,
      sortBy: option,
    }), () => this.filterAndSort());
  }

  handleCategoryItemClick = category => {
    this.setState(() => ({
      categoryAnchorEl: null,
      category,
    }), () => this.filterAndSort());
  }

  render() {
    let categories = new Set(['all']);
    this.props.books.forEach(book => 
      (book.category && categories.add(book.category.toLowerCase()))
    );

    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Filter
          anchorEl={this.state.categoryAnchorEl}
          category={this.state.category}
          categories={categories}
          handleOpen={this.handleCategoryOpen}
          handleClick={this.handleCategoryItemClick}
          handleClose={this.handleCategoryClose}
        />
        <Sort
          anchorEl={this.state.sortAnchorEl}
          sortBy={this.state.sortBy}
          handleOpen={this.handleSortOpen}
          handleClick={this.handleSortItemClick}
          handleClose={this.handleSortClose}
        />
      </div>
    );
  }
}

export default withStyles(styles)(FilterAndSort);
