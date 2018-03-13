import React from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import { FETCH_USER_BOOKS_QUERY } from '../queries/bookQuery';

import BooksGrid from '../components/BooksGrid';

const Title = styled.h1`
  margin: 40px 0;
  font-weight: 700;
`;

const Filter = styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 20px;
  margin: 20px 0;
`;

const MyShelf = ({ data, auth }) => {
  if (data.loading) return <div>Loading...</div>;
  if (data.error) return <div>Error</div>;
  
  return (
    <div>
      <Title>My shelf</Title>
      <Filter>
        <span>All</span>
        <span>By date</span>
      </Filter>
      <BooksGrid books={data.userBooks} auth={auth} />
    </div>
  );
};

export default graphql(FETCH_USER_BOOKS_QUERY)(MyShelf);
