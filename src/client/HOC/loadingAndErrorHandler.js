import React from 'react';
import { branch, renderComponent, withProps } from 'recompose';
import styled from 'styled-components';

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
  color: '#333';
  animation: blink 1.5s infinite;

  @media all and (min-width: 960px) {
    left: calc(50% + 120px);
  }

  @keyframes blink {
    from { opacity: 0; }
    60% { opacity: 1; }
    to { opacity: 0; }
  }
`;

export const ErrorWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.2rem;
  @media all and (min-width: 960px) {
    left: calc(50% + 120px);
  }
`;

export const ErrorButton = styled.span`
  margin-left: 10px;
  border-bottom: 4px solid #333;
  cursor: pointer;
`;

const renderWhileLoading = (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].loading,
    renderComponent(component),
  );

const LoadingPlaceholder = () => <Loader>booksy</Loader>;

const renderForError = (component, propName = "data") =>
  branch(
    props => props[propName] && props[propName].error,
    renderComponent(component),
  );

const ErrorComponent = props => (
  <ErrorWrapper>
    Something went wrong :( <br/>
    You can try to 
    <ErrorButton onClick={props.refetch}>refetch</ErrorButton>.
  </ErrorWrapper>
);

const setRefetchProp = (propName = "data") =>
  withProps(props => ({ refetch: props[propName] && props[propName].data }));

export default (propName) => [
  renderWhileLoading(LoadingPlaceholder, propName),
  setRefetchProp(propName),
  renderForError(ErrorComponent, propName),
];
