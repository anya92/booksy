import React, { Component } from 'react';
import styled from 'styled-components';

const Filter = styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 30px;
  left: 0;
  background-color: #f9f9f9;
  min-width: 140px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;

const Dropdown = styled.div`
  position: relative;
  &.down {
    ${DropdownContent} {
      display: block;
    }
  }
`;

const DropdownButton = styled.button`
  font-weight: 700;
  cursor: pointer;
  background: transparent;
  border: none;
  color: #333;
  &:active, &:focus {
    outline: none;
  }
  i {
    margin-left: 5px;
  }
`;

const DropdownLink = styled.div`
  cursor: pointer;
  padding: 12px 16px;
  &:hover {
    background: rgba(0,0,0,0.2);
  }
`;

class FilterAndSort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'all',
      sortBy: 'date added',
      descending: true,
    };
  }

  setFilter(category) {
    this.setState(() => ({ category }), () => {
      this.toggleFilter();
      this.filterAndSort();
    });
  }

  filterBooks(books) {
    const { category } = this.state;
    const filteredBooks = books.filter(book => (
      category == 'all' ? book : book.category == category
    ));

    return filteredBooks;
  }

  setSortBy(sortBy) {
    this.setState(prevState => ({
      descending: sortBy == prevState.sortBy ? !prevState.descending : true,
      sortBy,
    }), () => {
      this.toggleSort();
      this.filterAndSort();
    });
  }  

  sortBooks(books) {
    const { descending, sortBy } = this.state;
    // sort books
    let sortedBooks;

    if (sortBy == 'date added') {
      sortedBooks = descending
      ? [...books].sort((a, b) => new Date(b.added) - new Date(a.added))
      : [...books].sort((a, b) => new Date(a.added) - new Date(b.added));
    } else {
      sortedBooks = descending
      ? [...books].sort((a, b) => a.title > b.title)
      : [...books].sort((a, b) => a.title < b.title);
    }
    return sortedBooks;
  }

  toggleFilter() {
    this.filterDropdown.classList.toggle('down');
    if (this.filterDropdown.classList.contains('down')) {
      this.categoryChevron.classList.remove('fa-chevron-down');
      this.categoryChevron.classList.add('fa-chevron-up');
    } else {
      this.categoryChevron.classList.remove('fa-chevron-up');
      this.categoryChevron.classList.add('fa-chevron-down');
    }
  }

  toggleSort() {
    this.sortDropdown.classList.toggle('down');
  }

  filterAndSort() {
    const { books, setBooks } = this.props;
    // filter books
    const filteredBooks = this.filterBooks(books);
    // sort books
    const sortedBooks = this.sortBooks(filteredBooks);
    // set books
    setBooks(sortedBooks);
  }

  render() {
    let categories = new Set();
    this.props.books.forEach(book => (book.category && categories.add(book.category)));

    return (
      <Filter>
        <Dropdown innerRef={ref => (this.filterDropdown = ref)}>
          Category:
          <DropdownButton onClick={this.toggleFilter.bind(this)}>
            { this.state.category.toLowerCase() } 
            <i ref={ref => (this.categoryChevron = ref)} className="fa fa-chevron-down" />
          </DropdownButton>
          <DropdownContent>
            <DropdownLink onClick={() => this.setFilter('all')}>all</DropdownLink>
            {
              [...categories].map((category, i) => (
                <DropdownLink key={i} onClick={() => this.setFilter(category)}>
                  { category.toLowerCase() }
                </DropdownLink>
              ))
            }
          </DropdownContent>
        </Dropdown>
        <Dropdown innerRef={ref => (this.sortDropdown = ref)}>
          Sort by:
          <DropdownButton onClick={this.toggleSort.bind(this)}>
            {this.state.sortBy} 
            {
              this.state.descending 
              ? <i className="fa fa-angle-double-down" />
              : <i className="fa fa-angle-double-up" />
            }
          </DropdownButton>
          <DropdownContent>
            <DropdownLink onClick={() => this.setSortBy('date added')}>
              date
            </DropdownLink>
            <DropdownLink onClick={() => this.setSortBy('title')}>
              title
            </DropdownLink>
          </DropdownContent>
        </Dropdown>
      </Filter>
    );
  }
}

export default FilterAndSort;