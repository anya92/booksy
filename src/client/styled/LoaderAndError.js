import styled from 'styled-components';

import media from './mediaQueries';

export const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: pacifico;
  font-size: 3rem;
  display: grid;
  justify-content: center;
  align-content: center;
  color: ${props => props.theme.mainColor};
  animation: blink 1.5s infinite;

  ${media.desktop`
    left: calc(50% + 120px);
  `}

  @keyframes blink {
    from { opacity: 0; }
    60% { opacity: 1; }
    to { opacity: 0; }
  }
`;

export const Error = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.2rem;
  ${media.desktop`
    left: calc(50% + 120px);
  `}
`;

export const ErrorButton = styled.span`
  margin-left: 10px;
  border-bottom: 4px solid ${props => props.theme.mainColor};
  cursor: pointer;
`;