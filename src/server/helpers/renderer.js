import React from 'react';
import { renderToString } from 'react-dom/server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import serialize from 'serialize-javascript';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';

import routes from '../../client/routes';
import manifest from '../../../public/manifest.json';
import stats from '../../../public/react-loadable.json';

export default (req, client, context) => {
  const sheet = new ServerStyleSheet();
  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();

  let modules = [];

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#34ace0'
      },
      type: 'light'
    },
  });

  const generateClassName = createGenerateClassName();

  let App = (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager} disableStylesGeneration={true}>
          <ApolloProvider client={client}>
            <StyleSheetManager sheet={sheet.instance}>
              <StaticRouter location={req.path} context={context}>
                <div>{renderRoutes(routes)}</div>
              </StaticRouter>
            </StyleSheetManager>
          </ApolloProvider>
        </MuiThemeProvider>
      </JssProvider>
    </Loadable.Capture>
  );

  return getDataFromTree(App).then(() => {
    App = (
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <ApolloProvider client={client}>
              <StyleSheetManager sheet={sheet.instance}>
                <StaticRouter location={req.path} context={context}>
                  <div>{renderRoutes(routes)}</div>
                </StaticRouter>
              </StyleSheetManager>
            </ApolloProvider>
          </MuiThemeProvider>
        </JssProvider>
      </Loadable.Capture>
    );
    const content = renderToString(App);
    let bundles = getBundles(stats, modules);
    const initialState = client.extract();
    const styleTags = sheet.getStyleTags();
    const css = sheetsRegistry.toString()

    return Promise.resolve(`
      <!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>booksy</title>
          <link rel="stylesheet" href="https://unpkg.com/modern-normalize@0.4.0/modern-normalize.css">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500|Pacifico|Nunito:300,400:700">
          ${styleTags}
        </head>
        <body>
          <div id="root">${content}</div>
          <style id="jss-server-side">${css}</style>
          <script>
            window.__APOLLO_STATE__ = ${serialize(initialState)}
          </script>
          ${
            bundles.map(bundle => {
              return `<script src="/${bundle.file}"></script>`
            }).join('\n')
          }
          <script src="/${manifest["main.js"]}" defer></script>
          <script src="/${manifest["vendor.js"]}"></script>
        </body>
      </html>
    `);
  }).catch(error => Promise.reject(error))
}
