import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const FETCH_USER_DATA_QUERY = gql`
  query {
    auth {
      id
      name
      email
      firstName
      lastName
      city
      country
    }
  }
`

class Account extends Component {
  state = {
    name: '',
    firstName: '',
    lastName: '',
    city: '',
    country: ''
  }

  handleChange = () => {

  }

  render() {
    // const { loading, error, auth } = this.props.data;

    // if (loading) return <div />;
    // if (error) return <div>Error</div>;
    
    return (
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" disabled />
        </div>
        <div>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" />
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" id="city" />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input type="text" id="country" />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}

export default graphql(FETCH_USER_DATA_QUERY)(Account);
