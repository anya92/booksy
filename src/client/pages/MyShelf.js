import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import { FETCH_USER_BOOKS_QUERY } from '../graphql/queries';

import BooksGrid from '../components/BooksGrid';

export const Title = styled.h1`
  margin: 40px 0;
  font-weight: 700;
`;

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

class MyShelf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'all',
      filteredBooks: props.data.userBooks || [],
    };
  }

  componentWillReceiveProps({ data: { userBooks } }) {
    this.setState(() => ({
      category: 'all',
      filteredBooks: userBooks, 
    }));
  }

  setFilter(category) {
    const { data: { userBooks } } = this.props;
    const filteredBooks = userBooks.filter(book => (
      category == 'all' ? book : book.category == category
    ));

    this.setState(() => ({
      category,
      filteredBooks
    }), () => this.toggleDropdown());
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
    const { data, auth } = this.props;

    if (data.loading) return <div>Loading...</div>; // todo -> loading component
    if (data.error) return <div>Error</div>; // todo -> error component
    
    let categories = new Set();
    data.userBooks.forEach(book => (book.category && categories.add(book.category)));

    return (
      <div>
        <Title>My shelf</Title>
        <Filter>
          <Dropdown innerRef={ref => (this.categoryDropdown = ref)}>
            <DropdownButton onClick={this.toggleDropdown.bind(this)}>
              {this.state.category} 
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
        <BooksGrid 
          books={this.state.filteredBooks} 
          auth={auth}
        />
      </div>
    );
  }
};

export default graphql(FETCH_USER_BOOKS_QUERY)(MyShelf);
