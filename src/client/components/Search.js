import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import * as Navbar from '../styled/Header';

const FETCH_BOOK = gql`
  query SearchBook($filter: String!) {
    searchBook(filter: $filter) {
      id
      title
      author
    }
  }
`;

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      results: [],
    };
  }

  handleInputChange(e) {
    const { value } = e.target;
    this.setState(() => ({ search: value }), () => {
      this.searchBook();
    });
  }

  searchBook() {
    const { search } = this.state;
    this.props.client.query({
      query: FETCH_BOOK,
      variables: {
        filter: search,
      }
    }).then(({ data: { searchBook } }) => {
      this.setState(() => ({ results: searchBook }));
    });
  }

  render() {
    return (
      <Navbar.SearchBar id="search-bar">
        <Navbar.SearchInput>
          <i className="fa fa-search" />
          <input 
            type="text" 
            placeholder="Search books"
            value={this.state.search}
            onChange={e => this.handleInputChange(e)}
          />
        </Navbar.SearchInput>
        <Navbar.Icon 
          className="fa fa-times"
          onClick={() => {
            document.getElementById('search-bar').classList.add('hide');
            setTimeout(() => (
              document.getElementById('search-bar').classList.remove('display')
            ), 500);
          }}
        />
        <Navbar.SearchResults>
          {
            this.state.results.map(book => (
              <Navbar.SearchResult key={book.id}>
                <div>{book.title}</div>
                <div>{book.author}</div>
              </Navbar.SearchResult>
            ))
          }
        </Navbar.SearchResults>
      </Navbar.SearchBar>
    )
  }
}

export default withApollo(Search);