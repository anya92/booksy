import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import Table from '../components/Table/Table';

import { 
  FETCH_REQUESTS_TO_USER_QUERY,
  FETCH_REQUESTS_FROM_USER_QUERY,
} from '../graphql/queries';

import { ACCEPT_REQUEST_MUTATION } from '../graphql/mutations';

class Request extends Component {

  componentDidMount() {
    const badge = document.querySelector('#badge span');
    if (badge) {
      badge.style.background = '#34ace0';
    }
  }

  acceptRequest = id => {
    this.props.acceptRequest({
      variables: {
        id
      },
      refetchQueries: [{
        query: FETCH_REQUESTS_TO_USER_QUERY,
      }],
    });
  }

  formatDate = date => {
    return distanceInWordsToNow(new Date(date).toISOString());
  }

  render() {
    const { 
      toUser: { loading: loadingToUser, error: errorToUser, requestsToUser },
      fromUser: { loading: loadingFromUser, error: errorFromUser, requestsFromUser }
   } = this.props;
   
    if (loadingToUser || loadingFromUser) return <div>Loading...</div>

    return (
      <div>
        <h1>Requests to you</h1>
        <Table
          data={requestsToUser}
          requestType="to_user"
          formatDate={this.formatDate}
          acceptRequest={this.acceptRequest}
        />
        <h1>Your requests</h1>
        <Table
          data={requestsFromUser}
          requestType="from_user"
          formatDate={this.formatDate}
        />
      </div>
    );
  }
}

export default compose(
  graphql(FETCH_REQUESTS_TO_USER_QUERY, { name: 'toUser' }),
  graphql(FETCH_REQUESTS_FROM_USER_QUERY, { name: 'fromUser' }),
  graphql(ACCEPT_REQUEST_MUTATION, { name: 'acceptRequest' }),
)(Request);
