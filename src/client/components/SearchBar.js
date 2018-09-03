import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import SearchIcon from '@material-ui/icons/Search';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';

import { Consumer } from './BookPanel/BookPanelContext';

import * as Navbar from '../styled/Header';

const InputContainer = styled.div`
  display: flex;
  alignItems: center;
  padding: 6px 5px;
  input {
    color: #FFF;
    width: 160px;
    height: 100%;
    border: 0;
    background: transparent;
    padding: 2px 8px;
    transition: width .3s ease-out;
    font-family: Roboto;
    &:focus {
      outline: none;
      width: 200px;
    }
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const FETCH_BOOK = gql`
  query SearchBook($filter: String!) {
    searchBook(filter: $filter) {
      id
      title
      author
    }
  }
`;

class SearchBar extends Component {
  state = {
    search: '',
    results: [],
    displayResults: false,
  }

  onClickEvent = e => {
    if (e.target.classList.contains('search__result') || e.target.parentElement.classList.contains('search__result')) {
      return;
    }
    if (e.target == this.input) {
      return;
    }
    this.setState(() => ({ displayResults: false }));
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onClickEvent);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onClickEvent);
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
    const currentActiveResult = document.querySelector('.search__result.active');
    let nextActiveResult;
    
    if (e.keyCode == 40 && currentActiveResult) {
      nextActiveResult = currentActiveResult.nextElementSibling || results[0];
    } else if (e.keyCode == 40) {
      nextActiveResult = results[0];
    } else if (e.keyCode == 38 && currentActiveResult) {
      nextActiveResult = currentActiveResult.previousElementSibling || results[results.length - 1];
    } else if (e.keyCode == 38) {
      nextActiveResult = results[results.length - 1];
    } else if (e.keyCode == 13) {
      context.showPanel(currentActiveResult.id);
      this.setState(() => ({ displayResults: false }))
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
      <Hidden xsDown>
        <div id="search-bar" style={{
          background: 'rgba(255, 255, 255, 0.15)',
          display: 'flex',
          borderRadius: '2px',
          margin: '0 10px',
        }}>
          <Consumer>
            {(context) => (
              <React.Fragment>
                <InputContainer>
                  <SearchIcon style={{ margin: '0 10px' }} />
                  <input
                    ref={ref => (this.input = ref)}
                    type="text"
                    placeholder="Search..."
                    value={this.state.search}
                    onChange={e => this.handleInputChange(e)}
                    onKeyUp={e => this.handleInputKeyUp(e, context)}
                    onFocus={() => this.setState(() => ({ displayResults: true }))}
                  />
                </InputContainer>
                {
                  this.state.displayResults && 
                  <Navbar.SearchResults innerRef={ref => (this.searchResults = ref)}>
                    {
                      this.state.results.map(book => (
                        <Navbar.SearchResult 
                          key={book.id} 
                          className="search__result"
                          onClick={() => context.showPanel(book.id)}
                          id={book.id}>
                            <div>{book.title}</div>
                            <div>{book.author}</div>
                        </Navbar.SearchResult>
                      ))
                    }
                  </Navbar.SearchResults>
                }
              </React.Fragment>
            )}
          </Consumer>
        </div>
      </Hidden>
    )
  }
}

export default withApollo(SearchBar);
