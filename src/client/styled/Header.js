import styled from 'styled-components';
import media from './mediaQueries';

export const Nav = styled.nav`
  position: fixed;
  overflow-y: visible;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background: #FFF;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .14);
  font-family: 'Nunito', 'Open sans', sans-serif;
  color: #555;
`;
  
export const Wrapper = styled.div`
  padding: 20px 0;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Brand = styled.div`
  font-family: 'Pacifico', cursive;
  font-size: 28px;
  margin: 0 20px;
  a {
    color: ${props => props.theme.mainColor};
    text-decoration: none;
  }
  ${media.untilDesktop`
    flex: 1;
  `}
`;

export const Icon = styled.i`
  font-size: 20px;
  margin: 0 20px;
  cursor: pointer;
  ${media.tablet`
    ${props => props.search && 'display: none;'}
  `}
  ${media.desktop`
    ${props => props.menu && 'display: none;'}
  `}
`;

export const SearchBar = styled.div`
  ${media.phone`
    display: none;

    &.display {
      visibility: visible;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      padding: 15px 0;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      background: #FFF;
      animation: slideFromRight .5s ease-out forwards;
    }

    &.hide {
      animation: slideToRight .5s ease-out forwards;
    }

    @keyframes slideFromRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    @keyframes slideToRight {
      from { transform: translateX(0); }
      to { transform: translateX(100%); }
    }
  `}

  input {
    width: 100%;
    min-width: 300px;
    height: 100%;
    font-size: 16px;
    font-weight: 300;
    padding: 5px 15px;
    border: 1px solid #E0DDD9;
    outline: none;
    border-radius: 6px;
    transition: all .3s ease-out;
    margin-left: 20px;

    &:focus {
      border-color: #9aecdb;
    }
  }

  ${media.tablet`
    display: block;
    margin-right: 20px;
    input {
      margin-right: 20px;
      margin-left: 0;
    }

    i {
      display: none;
    }
  `}
`;

export const Auth = styled.div`
    display: none;

    &.open {
      display: block;
      background: #FFF;
      box-shadow: 0 1px 1px rgba(0, 0, 0, .14);
      position: absolute;
      bottom: 20px;
      transform: translateY(100%);
      right: 20px;
    }
`;

export const Username = styled.div`
  padding: 10px;
  font-weight: 700;
  background: #EEE;
`;

export const Email = styled.div`
  padding: 10px;
  font-size: 14px;
  background: #EEE;
`;

export const Link = styled.div`
  padding: 10px;
  
  a {
    font-size: 18px;
    color: ${props => props.theme.mainColor};
    text-decoration: none;
  }
`;
