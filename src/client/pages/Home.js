import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { FETCH_BOOKS_QUERY } from '../queries/bookQuery';

class Home extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) return <div>Loading...</div>;
    if (data.error) return <div>Error</div>;
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gridGap: '20px'
      }}>
        {
          data.books.map(book => (
            <div key={book.id}>
              <img src={book.image} alt={book.title} />              
              <div>{book.title}</div>
              <div>{book.author}</div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default graphql(FETCH_BOOKS_QUERY)(Home);
