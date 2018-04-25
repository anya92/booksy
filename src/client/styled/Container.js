import styled from 'styled-components';

import media from './mediaQueries';

export default styled.div`
  font-family: 'Nunito', 'Open Sans', sans-serif;
  color: #333;
  padding: 20px;
  padding-top: 80px;
  margin: 0 auto;
  max-width: 100%;
  ${media.desktop`
    padding-right: 40px;
    padding-left: 280px;
  `}
`;
