import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';

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
      displayResults: false,
    };
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
    const currentActiveResult = document.querySelector('.active');
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
      <div id="search-bar" style={{
        background: 'rgba(255, 255, 255, 0.15)',
        display: 'flex',
        borderRadius: '2px',
        margin: '0 10px',
      }}>
        <Consumer>
          {(context) => (
            <React.Fragment>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '2px 5px',
              }}>
                <SearchIcon style={{ margin: '0 20px' }} />
                <input
                  ref={ref => (this.input = ref)}
                  type="search"
                  placeholder="Search..."
                  value={this.state.search}
                  onChange={e => this.handleInputChange(e)}
                  onKeyUp={e => this.handleInputKeyUp(e, context)}
                  onFocus={() => this.setState(() => ({ displayResults: true }))}
                  style={{
                    color: '#FFF',
                    width: '120px',
                    border: 'none',
                    background: 'transparent',
                    padding: '2px 8px',
                  }}
                />
              </div>
              <Navbar.Icon 
                className="fa fa-times"
                onClick={() => {
                  document.getElementById('search-bar').classList.add('hide');
                  setTimeout(() => (
                    document.getElementById('search-bar').classList.remove('display')
                  ), 500);
                }}
              />
              {
                this.state.displayResults && 
                <Navbar.SearchResults innerRef={ref => (this.searchResults = ref)}>
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
              }
            </React.Fragment>
          )}
        </Consumer>
      </div>
    )
  }
}

export default withApollo(Search);
