import React from 'react';
import { branch, renderComponent, withProps } from 'recompose';

const renderWhileLoading = (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].loading,
    renderComponent(component),
  );

const LoadingPlaceholder = () => <h1>Loading...</h1>;

const renderForError = (component, propName = "data") =>
  branch(
    props => props[propName] && props[propName].error,
    renderComponent(component),
  );

const ErrorComponent = props => (
  <span>
    Something went wrong, you can try to
    <button onClick={props.refetch}>refetch</button>
  </span>
);

const setRefetchProp = (propName = "data") =>
  withProps(props => ({ refetch: props[propName] && props[propName].data }));

export default (propName) => [
  renderWhileLoading(LoadingPlaceholder, propName),
  setRefetchProp(propName),
  renderForError(ErrorComponent, propName),
];