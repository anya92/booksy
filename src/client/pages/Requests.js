import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { FETCH_REQUESTS_TO_USER_QUERY, FETCH_REQUESTS_FROM_USER_QUERY } from '../queries/requestQuery';

class Request extends Component {
  render() {
    const { 
      toUser: { loadingToUser, errorToUser, requestsToUser },
      fromUser: { loadingFromUser, errorFromUSer, requestsFromUser }
   } = this.props;
    // console.log(this.props)
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error</div>;

    return (
      <div>
        <h1>Requests to you</h1>
        {
          requestsToUser.map(({ id, sender, requestType, book, date, accepted }) => (
            <div key={id}>
              <div>{sender.name} wants to {requestType} "{book.title}" by {book.author}</div>
              <div>{date}</div>
              { !accepted ? <div><button>Accept</button><button>Cancel</button></div> : <div>Accepted</div> }
            </div> 
          ))
        }  
        <h1>Your requests</h1>
        {/* {JSON.stringify(requestsFromUser, null, ' ')} */}
      </div>
    );
  }
}

export default compose(
  graphql(FETCH_REQUESTS_TO_USER_QUERY, { name: 'toUser' }),
  graphql(FETCH_REQUESTS_FROM_USER_QUERY, { name: 'fromUser' }),
)(Request);
