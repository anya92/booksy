import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
`;

export const Button = styled.button`
  font-weight: 700;
  border: none;
  height: 50px;
  cursor: pointer;
  color: #FFF;
  background: ${props => props.danger ? '#B33771' : '#9AECDB' };
  border-radius: 4px;
`;

export const LinkButton = styled.div`
  height: 50px;
  background: #9AECDB;
  border-radius: 4px;
  font-weight: 700;
  display: inline-flex;
  justify-content: center;
  a {
    height: 100%;
    width: 100%;
    color: #FFF;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;
