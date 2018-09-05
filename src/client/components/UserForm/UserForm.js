import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { FETCH_USER_DATA_QUERY } from '../../pages/Account';

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String
    $firstName: String
    $lastName: String
    $city: String
    $country: String
  ) {
    updateUser(
      id: $id
      name: $name
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
    name: this.props.user.name,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    city: this.props.user.city,
    country: this.props.user.country,
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
    const { name, firstName, lastName, city, country } = this.state;

    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={e => this.handleChange(e, 'name')} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" disabled value={this.props.user.email} />
        </div>
        <div>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" value={firstName} onChange={e => this.handleChange(e, 'firstName')} />
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" value={lastName} onChange={e => this.handleChange(e, 'lastName')} />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" id="city" value={city} onChange={e => this.handleChange(e, 'city')} />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input type="text" id="country" value={country} onChange={e => this.handleChange(e, 'country')} />
        </div>
        <div>
          {this.state.loading ? <button>Loading...</button> : <button type="submit">Save</button> }
        </div>
      </form>
    );
  }
}

export default graphql(UPDATE_USER_MUTATION)(UserForm);
