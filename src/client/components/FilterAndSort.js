import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SortIcon from "@material-ui/icons/Sort";
import FilterListIcon from "@material-ui/icons/FilterList";

const sortOptions = [
  'date added (newest)',
  'date added (oldest)',
  'title (A-Z)',
  'title (Z-A)',
];

const styles = theme => ({
  container: {
    borderBottom: '1px solid #fff',
    margin: '10px 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '20px',
  },
  icon: {
    fontSize: '20px',
    marginRight: theme.spacing.unit,
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
    this.props.books.forEach(book => (book.category && categories.add(book.category.toLowerCase())));

    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div>
          <Button
            aria-haspopup="true"
            aria-controls="category-menu"
            aria-label="Category"
            onClick={this.handleCategoryOpen}
          >
            <FilterListIcon className={classes.icon} /> Category
          </Button>
          <Menu
            id="category-menu"
            anchorEl={this.state.categoryAnchorEl}
            open={Boolean(this.state.categoryAnchorEl)}
            onClose={this.handleCategoryClose}
          >
            {
              [...categories].map(category => (
                <MenuItem
                  key={category}
                  selected={category === this.state.category}
                  onClick={() => this.handleCategoryItemClick(category)}
                >
                  {category}
                </MenuItem>
              ))
            }
          </Menu>
        </div>
        <div>
          <Button
            
            aria-haspopup="true"
            aria-controls="sort-menu"
            aria-label="Sort by"
            onClick={this.handleSortOpen}
          >
            <SortIcon className={classes.icon} /> Sort by
          </Button>
          <Menu
            id="sort-menu"
            anchorEl={this.state.sortAnchorEl}
            open={Boolean(this.state.sortAnchorEl)}
            onClose={this.handleSortClose}
          >
            {
              sortOptions.map(option => (
                <MenuItem
                  key={option}
                  selected={option === this.state.sortBy}
                  onClick={() => this.handleSortItemClick(option)}
                >
                  { option }
                </MenuItem>
              ))
            }
          </Menu>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FilterAndSort);
