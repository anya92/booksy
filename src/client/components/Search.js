import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import { Consumer } from './SidePanelContext';

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
    this.setState(() => ({ search: value }), () => this.searchBook());
  }

  handleInputKeyUp(e, context) {
    // ENTER_KEY_CODE = 13
    // UP_ARROW_KEY_CODE = 38
    // DOWN_ARROW_KEY_CODE = 40

    if (![13, 38, 40].includes(e.keyCode)) {
      return;
    }
    const results = document.querySelectorAll('.search__result');
    const currentActiveResult = document.querySelector('.active');
    let nextActiveResult;

    if(e.keyCode == 40 && currentActiveResult) {
      nextActiveResult = currentActiveResult.nextElementSibling || results[0];
    } else if (e.keyCode == 40) {
      nextActiveResult = results[0];
    } else if (e.keyCode == 38 && currentActiveResult) {
      nextActiveResult = currentActiveResult.previousElementSibling || results[results.length - 1];
    } else if (e.keyCode == 38) {
      nextActiveResult = results[results.length - 1];
    } else if (e.keyCode == 13) {
      context.showPanel(currentActiveResult.id);
      return;
    }
    if (currentActiveResult) {
      currentActiveResult.classList.remove('active');
    }
    nextActiveResult.classList.add('active');
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
        <Consumer>
          {(context) => (
            <React.Fragment>
              <Navbar.SearchInput>
                <i className="fa fa-search" />
                <input 
                  type="text" 
                  placeholder="Search books"
                  value={this.state.search}
                  onChange={e => this.handleInputChange(e)}
                  onKeyUp={e => this.handleInputKeyUp(e, context)}
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
                    <Navbar.SearchResult 
                      key={book.id} 
                      onClick={() => context.showPanel(book.id)}
                      className="search__result"
                      id={book.id}>
                      <div>{book.title}</div>
                      <div>{book.author}</div>
                    </Navbar.SearchResult>
                  ))
                }
              </Navbar.SearchResults>
            </React.Fragment>
          )}
        </Consumer>
        
      </Navbar.SearchBar>
    )
  }
}

export default withApollo(Search);