import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function requireAuth(WrappedComponent) {

  return class extends Component {
    render() {
      if (!this.props.auth) {
        return <Redirect to="/" />;
      }
      return <WrappedComponent {...this.props} />
    }
  };
}
