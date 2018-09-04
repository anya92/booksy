import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import SearchIcon from '@material-ui/icons/Search';
import Hidden from '@material-ui/core/Hidden';

import { Consumer } from '../BookPanel/BookPanelContext';

import { Container, InputContainer, SearchResults, SearchResult } from './SearchBarStyled';

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

  handleInputChange = e => {
    const { value } = e.target;
    this.setState(() => ({
      search: value,
    }), () => this.searchBook());
  }

  handleInputKeyUp = (e, context) => {
    // ENTER_KEY_CODE = 13
    // ESC_KEY_CODE = 27
    // UP_ARROW_KEY_CODE = 38
    // DOWN_ARROW_KEY_CODE = 40
    
    if (![13, 27, 38, 40].includes(e.keyCode)) {
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
      this.setState(() => ({ displayResults: false }));
      return;
    } else if (e.keyCode == 27) {
      this.setState(() => ({ displayResults: false }));
    }

    if (currentActiveResult) {
      currentActiveResult.classList.remove('active');
    }
    nextActiveResult.classList.add('active');
  }

  searchBook = () => {
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

  handleResultClick = (context, bookId) => {
    context.showPanel(bookId);
    this.setState(() => ({ displayResults: false }));
  }

  render() {
    return (
      <Hidden xsDown>
        <Container>
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
                  <SearchResults>
                    {
                      this.state.results.map(book => (
                        <SearchResult 
                          key={book.id} 
                          className="search__result"
                          onClick={() => this.handleResultClick(context, book.id)}
                          id={book.id}>
                            <div><strong>{book.title}</strong></div>
                            <div>{book.author}</div>
                        </SearchResult>
                      ))
                    }
                  </SearchResults>
                }
              </React.Fragment>
            )}
          </Consumer>
        </Container>
      </Hidden>
    );
  }
}

export default withApollo(SearchBar);
