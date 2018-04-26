import React from 'react';
import { branch, renderComponent, withProps } from 'recompose';

import { Loader, Error, ErrorButton } from '../styled/LoaderAndError';

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
  <Error>
    Something went wrong :( <br/>
    You can try to 
    <ErrorButton onClick={props.refetch}>refetch</ErrorButton>.
  </Error>
);

const setRefetchProp = (propName = "data") =>
  withProps(props => ({ refetch: props[propName] && props[propName].data }));

export default (propName) => [
  renderWhileLoading(LoadingPlaceholder, propName),
  setRefetchProp(propName),
  renderForError(ErrorComponent, propName),
];