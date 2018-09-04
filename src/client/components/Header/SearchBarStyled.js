import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  borderRadius: 2px;
  margin: 0 10px;
  position: relative;
`;

export const InputContainer = styled.div`
  display: flex;
  alignItems: center;
  padding: 6px 5px;
  input {
    color: #FFF;
    width: 160px;
    height: 100%;
    border: 0;
    background: transparent;
    padding: 2px 8px;
    transition: width .3s ease-out;
    font-family: Roboto;
    &:focus {
      outline: none;
      width: 200px;
    }
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

export const SearchResults = styled.div`
  position: absolute;
  font-family: 'Roboto';
  background: #FFF;
  min-width: 280px;
  max-width: 340px;
  top: 120%;
  right: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  z-index: 5;
  border-radius: 2px;
  color: #333;
`;

export const SearchResult = styled.div`
  padding: 10px;
  cursor: pointer;
  line-height: 22px;
  
  &.active {
    background: #F0F0F0;
  }
`;
