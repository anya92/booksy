import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { FETCH_USER_DATA_QUERY } from '../../pages/Account';

import Form from './Form';

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $id: ID!
    $username: String
    $firstName: String
    $lastName: String
    $city: String
    $country: String
  ) {
    updateUser(
      id: $id
      username: $username
      firstName: $firstName
      lastName: $lastName
      city: $city
      country: $country
    ) {
      id
    }
  }
`;

class UserForm extends Component {
  state = {
    username: this.props.user.username || '',
    firstName: this.props.user.firstName || '',
    lastName: this.props.user.lastName || '',
    city: this.props.user.city || '',
    country: this.props.user.country || '',
  }

  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();

    const { userId } = this.props;

    this.props.mutate({
      variables: {
        id: userId,
        ...this.state,
      },
      refetchQueries: [{
        query: FETCH_USER_DATA_QUERY,
        variables: { id: userId },
      }]
    }).catch(console.log);
  }

  render() {
    return (
      <Form 
        {...this.state}
        email={this.props.user.email}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    );
  }
}

export default graphql(UPDATE_USER_MUTATION)(UserForm);
