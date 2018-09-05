import styled from 'styled-components';

export const Table = styled.table`
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
`;

export const Thead = styled.thead`
  color: #555;
  font-size: 16px;
  line-height: 28px;
  th {
    padding: 12px;
    text-align: left;
  }
`;

export const Tr = styled.tr`
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
