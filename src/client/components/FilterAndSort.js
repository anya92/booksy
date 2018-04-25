import React, { Component } from 'react';
import styled from 'styled-components';

const Filter = styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 20px 0;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  left: 0;
  top: 30px;
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
    }
  }


  setFilter(category) {
    const { books, setBooks } = this.props;
    const filteredBooks = books.filter(book => (
      category == 'all' ? book : book.category == category
    ));

    setBooks(filteredBooks);

    this.setState(() => ({ category }), () => this.toggleDropdown());
  }

  toggleDropdown() {
    this.categoryDropdown.classList.toggle('down');

    if (this.categoryDropdown.classList.contains('down')) {
      this.categoryChevron.classList.remove('fa-chevron-down');
      this.categoryChevron.classList.add('fa-chevron-up');
    } else {
      this.categoryChevron.classList.remove('fa-chevron-up');
      this.categoryChevron.classList.add('fa-chevron-down');
    }
  }

  render() {
    let categories = new Set();
    this.props.books.forEach(book => (book.category && categories.add(book.category)));
    return (
      <Filter>
        <Dropdown innerRef={ref => (this.categoryDropdown = ref)}>
            <DropdownButton onClick={this.toggleDropdown.bind(this)}>
              {this.state.category.toLowerCase()} 
              <i ref={ref => (this.categoryChevron = ref)} className="fa fa-chevron-down" />
            </DropdownButton>
            <DropdownContent>
              <DropdownLink onClick={() => this.setFilter('all')}>all</DropdownLink>
              {
                [...categories].map((category, i) => (
                  <DropdownLink key={i} onClick={() => this.setFilter(category)}>
                    {category.toLowerCase()}
                  </DropdownLink>
                ))
              }
            </DropdownContent>
          </Dropdown>
          <div>Sort by: date</div>
      </Filter>
    );
  }
}

export default FilterAndSort;