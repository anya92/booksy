import styled from 'styled-components';

import media from './mediaQueries';

export const Nav = styled.div`
  position: fixed;
  top: 74px;
  bottom: 0;
  left: 0;
  padding: 20px 0;
  background: #eee;
  border-right: 1px solid #eee;
  width: 240px;
  z-index: 2;
  font-family: 'Nunito', 'Open Sans', sans-serif;
  color: #555;
  overflow-y: scroll;
  transition: all .5s ease-out;

  ${media.untilDesktop`
    transform: translateX(-100%);
    &.open {
      transform: translateX(0);
    }
  `}
`;

export const UserInfo = styled.div`
  padding-bottom: 10px;
  color: #555;
  border-bottom: 1px solid #ddd;
`;

export const Username = styled.div`
  padding: 10px 25px;
  font-weight: 700;
`;

export const Email = styled.div`
  padding: 10px 25px;
  font-size: 14px;
`;

export const AuthLinks = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: 1fr;
  border-bottom: 1px solid #ddd;
  a {
    color: #555;
    text-decoration: none;
    padding: 10px 25px;
    transition: background .3s ease-out;
    &:hover:not(.active) {
      background: #ddd;
    }
    &.active {
      color: #FFF;
      background: ${props => props.theme.green};
    }
  }
`;

export const Categories = styled.div`
  padding: 10px 0;
  h4 {
    text-transform: uppercase;
    padding-left: 25px;
  }
  div {
    padding: 10px 25px;
    cursor: pointer;
    transition: background .3s ease-out;
    &:hover {
      background: #ddd;
    }
  }
`;
