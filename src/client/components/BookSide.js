import React, { Component } from 'react';
import{ graphql } from 'react-apollo';
import styled from 'styled-components';

import { FETCH_BOOK_BY_ID_QUERY } from '../queries/bookQuery';

const Side = styled.div`
  width: 400px;
  position: fixed;
  top: 80px;
  bottom: 0;
  right: 0px;
  background: #FFF;
  z-index: 2;
  animation: show .6s ease-out forwards;
  &.hide {
    animation: hide .6s ease-out forwards;
  }
  @keyframes show {
    from { right: -450px; }
    to { right: 0px; }
  }
  @keyframes hide {
    from { right: 0px; }
    to { right: -450px; }
  }
`;

class BookSide extends Component {

  renderContent() {
    const { loading, error, book } = this.props.data;
    
    if (loading) return <div />;
    if (error) return <div>Error</div>;
    return (
      <div>
        <div>{book.author}</div>
        <div>{book.title}</div>
        <div>{book.description}</div>
        <div>{book.owner.name}</div>
      </div>  
    );
  }

  render() {
    return (
      <Side innerRef={ref => (this.container = ref)}>
        <div onClick={() => {
          this.container.classList.add('hide');
          this.props.close();
        }}>&times;</div>
        { this.renderContent() }
      </Side>
    )
  }
}

export default graphql(FETCH_BOOK_BY_ID_QUERY, {
  options: ({ bookId }) => { 
    return { variables: { id: bookId } };
  }
})(BookSide);
