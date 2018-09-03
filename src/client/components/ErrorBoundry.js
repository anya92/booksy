import React, { Component } from 'react'

import SnackBar from './SnackBar';

export default class ErrorBoundry extends Component {
  state = {
    hasError: false,
    error: '',
  }

  componentDidCatch = (error, info) => {
    console.log(error)
    this.setState(() => ({ hasError: true, error }));
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState(() => ({ hasError: false, message: '' }));
  };

  render() {
    return (
      <div>
        { this.props.children }
        <SnackBar
          open={this.state.hasError}
          type="error"
          message={this.state.message}
          handleClose={this.handleClose}
        />
      </div>
    )
  }
}
