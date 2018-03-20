import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  margin-top: 20px;
  max-width: 400px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
`;

export const Button = styled.button`
  font-weight: 400;
  border: none;
  ${props => props.small ? `
    font-size: 16px;
    height: 30px;
  ` : `
    font-size: 18px;
    height: 50px;
    `} 
  cursor: pointer;
  color: #FFF;
  background: ${props => props.danger ? '#B33771' : '#9AECDB' };
  border-radius: 4px;
`;

export const LinkButton = styled.div`
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
