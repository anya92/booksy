import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import styled from 'styled-components';

import { 
  FETCH_REQUESTS_TO_USER_QUERY,
  FETCH_REQUESTS_FROM_USER_QUERY,
} from '../graphql/queries';

import { ACCEPT_REQUEST_MUTATION } from '../graphql/mutations';

import { ButtonsContainer, Button } from '../styled/Buttons';

const Tr = styled.tr`
  margin: 20px 0;
  color: #333;
  font-size: 14px;
  line-height: 28px;
  &:nth-child(odd) {
    background: #EEE;
  }
  td {
    padding: 12px;
    white-space: nowrap;

  } 
`;

const Table = styled.table`
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
`;

const Thead = styled.thead`
  border-top: 1px solid #eee;
  color: #555;
  font-size: 16px;
  line-height: 28px;
  th {
    padding: 12px;
    text-align: left;

  }
`;

class Request extends Component {

  componentDidMount() {
    document.getElementById('requests-length').style.background = '#DDD';
  }

  acceptRequest(id) {
    this.props.acceptRequest({
      variables: {
        id
      },
      refetchQueries: [{
        query: FETCH_REQUESTS_TO_USER_QUERY,
      }],
    });
  }

  render() {
    const { 
      toUser: { loading: loadingToUser, error: errorToUser, requestsToUser },
      fromUser: { loading: loadingFromUser, error: errorFromUSer, requestsFromUser }
   } = this.props;
   
    if (loadingToUser || loadingFromUser) return <div>Loading...</div>

    return (
      <div>
        <h1>Requests to you</h1>
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <Table>
            <Thead>
              <tr>
                <th>#</th>
                <th>title</th>
                <th>author</th>
                <th>type</th>
                <th>sender</th>
                <th>time</th>
                <th>status</th>
              </tr>
            </Thead>
            <tbody>
              {
                requestsToUser.map(({ id, sender, requestType, book, date, accepted }, i) => (
                  <Tr key={id}>
                    <td>{i + 1}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{requestType}</td>
                    <td>{sender.name}</td>
                    <td>{ distanceInWordsToNow(new Date(date).toISOString()) } ago</td>
                    <td>
                      { 
                        accepted 
                        ? 'accepted' : 
                        <Button small onClick={() => this.acceptRequest(id)}>Accept</Button> 
                      }
                    </td>
                  </Tr> 
                ))
              }
            </tbody>
          </Table>
        </div>
        <h1>Your requests</h1>
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <Table>
            <Thead>
              <tr>
                <th>#</th>
                <th>title</th>
                <th>author</th>
                <th>type</th>
                <th>receiver</th>
                <th>time</th>
                <th>status</th>
              </tr>
            </Thead>
            <tbody>
              {
                requestsFromUser.map(({ id, receiver, requestType, book, date, accepted }, i) => (
                  <Tr key={id}>
                    <td>{i + 1}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{requestType}</td>
                    <td>{receiver.name}</td>
                    <td>{ distanceInWordsToNow(new Date(date).toISOString()) } ago</td>
                    <td>{ accepted ? 'accepted' : 'not accepted' }</td>
                  </Tr> 
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(FETCH_REQUESTS_TO_USER_QUERY, { name: 'toUser' }),
  graphql(FETCH_REQUESTS_FROM_USER_QUERY, { name: 'fromUser' }),
  graphql(ACCEPT_REQUEST_MUTATION, { name: 'acceptRequest' }),
)(Request);
