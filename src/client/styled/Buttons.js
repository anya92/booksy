import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto auto;
  max-width: 420px;
`;

export const Button = styled.button`
  font-weight: 400;
  font-size: 18px;
  border: none;
  height: 50px;
  cursor: pointer;
  color: #FFF;
  max-width: 200px;  
  background: ${props => props.danger ? '#B33771' : '#9AECDB' };
  border-radius: 4px;
`;

export const LinkButton = styled.div`
  max-width: 200px;
  height: 50px;
  background: #9AECDB;
  border-radius: 4px;
  font-weight: 400;
  font-size: 18px;  
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
