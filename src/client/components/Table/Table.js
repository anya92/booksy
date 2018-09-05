import React from 'react';
import Button from '@material-ui/core/Button';

import { Table, Thead, Tr } from './TableStyled';

export default ({ data, requestType, formatDate, acceptRequest }) => {
  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table>
        <Thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>author</th>
            <th>type</th>
            <th>{requestType == 'to_user' ? 'from' : 'to'}</th>
            <th>time</th>
            <th>status</th>
          </tr>
        </Thead>
        <tbody>
          {
            data.map((request, index) => (
              <Tr key={request.id}>
                <td><strong>{index + 1}</strong></td>
                <td><strong>{request.book.title}</strong></td>
                <td>{request.book.author}</td>
                <td>{request.requestType}</td>
                {
                  requestType == 'to_user'
                    ? <td>{request.sender.name}</td>
                    : <td>{request.receiver.name}</td>
                }
                <td>{ formatDate(request.date) } ago</td>
                {
                  requestType == 'to_user'
                  ? (
                      <td>
                        {
                          request.accepted
                            ? 'accepted' :
                            <Button
                              color="primary"
                              variant="outlined"
                              onClick={() => acceptRequest(request.id)}>
                              Accept
                            </Button>
                        }
                      </td>
                    ) : <td>{ request.accepted ? 'accepted' : 'not accepted' }</td>
                }
              </Tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}
