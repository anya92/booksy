import styled from 'styled-components';

import media from './mediaQueries';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 800px;
  /* ${media.tablet`
    grid-gap: 40px;
    grid-template-columns: 2fr 1fr;
  `} */
`;

export const Element = styled.div`
  padding: 10px 0;
  label {
    display: block;
    font-size: 1.1rem;
    font-weight: 700;
    margin: 10px 0;
  }
  input, textarea, select {
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    padding: 10px 15px;
    border: 1px solid #E0DDD9;
    outline: none;
    border-radius: 6px;
    transition: all .3s ease-out;
    margin: 1px;
    &:focus {
      border-width: 2px;
      border-color: ${props => props.theme.mainColor};
      margin: 0;
    }
  }
  select {
    max-width: 300px;
    cursor: pointer;
  }
  textarea {
    line-height: 28px;
  }
`;

export const ElementWithAddon = styled.div`
  display: flex;
  input {
    flex: 1;
    border-radius: 0;
  }
`;

export const Addon = styled.div`
  background: #eee;
  padding: 5px 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:first-child {
    border-radius: 6px 0 0 6px;
    margin-right: -1px;    
  }
  &:last-child {
    border-radius: 0 6px 6px 0;    
    margin-left: -1px;
    cursor: pointer;
  }
`;

export const BookCoverModal = styled.div`
  position: fixed;
  top: 73px;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(85, 85, 85, .8);
  z-index: 5;
  visibility: hidden;
  opacity: 0;
  transition: all 0.4s ease-out;
  span {
    position: absolute;
    color: white;
    cursor: pointer;
    top: 20px;
    right: 20px;
    font-size: 30px;
    font-weight: 700;
  }
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 300px;
  }
  ${props => props.open && `
    visibility: visible;
    opacity: 1;
  `}
`;

export const Checkboxes = styled.div`
  margin-top: 10px;
  width: 400px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
`;

export const Checkbox = styled.div`
  text-align: center;
  input[type="checkbox"] {
    display: none;
    & + label {
      padding: 10px;
      font-size: 1.2rem;
      margin: 0;
      color: #EEE;
      border: 3px solid #EEE;
      width: 100%;
      cursor: pointer;
    }

    &:checked + label {
      border-color: #333;
      color: #333;
    }
  }
`;
