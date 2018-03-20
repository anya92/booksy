import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import styled from 'styled-components';

import { 
  FETCH_REQUESTS_TO_USER_QUERY,
  FETCH_REQUESTS_FROM_USER_QUERY,
} from '../queries/requestQuery';

import { ButtonsContainer, Button } from '../styled/Buttons';

const Item = styled.div`
  margin: 20px 0;
  padding: 10px 15px;
  background: #eee;
  border-radius: 4px;
  color: #333;
  font-size: 16px;
  line-height: 28px;
`;

const Date = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 300;
`;

const RequestInfo = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
`;

class Request extends Component {

  componentDidMount() {
    document.getElementById('requests-length').style.background = '#DDD';
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
        {
          requestsToUser.map(({ id, sender, requestType, book, date, accepted }) => (
            <Item key={id}>
              <div><strong>{sender.name}</strong> has requested to {requestType} <strong><em>{book.title}</em></strong> by <strong>{book.author}</strong>.</div>
              { <Date>{moment(new Date(date)).fromNow()}</Date> }
              { !accepted ? <ButtonsContainer><Button small>Accept</Button><Button small danger>Cancel</Button></ButtonsContainer> : <div>Accepted</div> }
            </Item> 
          ))
        }  
        <h1>Your requests</h1>
        {
          requestsFromUser.map(({ id, receiver, requestType, book, date, accepted }) => (
            <Item key={id}>
              <div>You have requested to {requestType} <strong><em>{book.title}</em></strong> by <strong>{book.author}</strong> from <strong>{receiver.name}</strong>.</div>
              { <Date>{moment(new Date(date)).fromNow()}</Date> }
              { !accepted ? <RequestInfo>Your request is yet to be accepted.</RequestInfo> : <RequestInfo>{receiver.name} has accepted your request.</RequestInfo> }
            </Item>
          ))
        }
      </div>
    );
  }
}

export default compose(
  graphql(FETCH_REQUESTS_TO_USER_QUERY, { name: 'toUser' }),
  graphql(FETCH_REQUESTS_FROM_USER_QUERY, { name: 'fromUser' }),
)(Request);
