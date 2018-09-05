import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import UserForm from '../components/UserForm/UserForm';

export const FETCH_USER_DATA_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      name
      email
      firstName
      lastName
      city
      country
    }
  }
`;

const Account = ({ auth: { id } }) => (
  <Query 
    query={FETCH_USER_DATA_QUERY}
    variables={{ id }}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>Loading</div>;
      if (error) return `Error!: ${error}`;

      return (
        <UserForm user={data.user} userId={id} />
      );
    }}
  </Query>
);

export default Account;
