import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default function requireBookOwner(WrappedComponent) {

  return graphql(gql`
    query Book($id: ID!) {
      book(id: $id) {
        owner {
          id
        }
      }
    }
  `, {
    options: ({ match: { params: { bookId }} }) => { 
      return { 
        variables: { id: bookId },
      };
    }
  })(class extends Component {
    render() {
      if (!this.props.auth || (this.props.auth.id !== this.props.data.book.owner.id)) {
        return <Redirect to="/" />;
      }
      return <WrappedComponent {...this.props} />
    }
  });
}
