import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import BooksGrid from '../components/BooksGrid/BooksGrid';
import { NotFound404 } from '../routes';

const FETCH_BOOKS_BY_CATEGORY_QUERY = gql`
  query BooksByCategory($category: String) {
    booksByCategory(category: $category) {
      id
      title
      author
      image
      added
      category
    }
  }
`;

export default ({ match: { params: { category } }, auth }) => {
  return (
    <Query
      query={FETCH_BOOKS_BY_CATEGORY_QUERY}
      variables={{ category }}
    >
      {({ loading, error, data: { booksByCategory } }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;

        if (!booksByCategory.length) return <NotFound404 />;

        const upperCaseCategory = category.charAt(0).toUpperCase() + category.substr(1).toLowerCase();

        return (
          <React.Fragment>
            <h1>{upperCaseCategory} books</h1>
            <BooksGrid
              books={booksByCategory}
              auth={auth}
              skipFilter={true}
            />
          </React.Fragment>
        )
      }}
    </Query>
  );
}

