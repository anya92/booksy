import React from 'react';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import serialize from 'serialize-javascript';

import routes from '../../client/routes';

export default (req, client, context) => {

  const sheet = new ServerStyleSheet();

  const App = (
    <ApolloProvider client={client}>
      <StyleSheetManager sheet={sheet.instance}>
        <StaticRouter location={req.path} context={context}>
          <div>{renderRoutes(routes)}</div>
        </StaticRouter>
      </StyleSheetManager>  
    </ApolloProvider>
  );

  return new Promise((resolve, reject) => {
    renderToStringWithData(App).then(content => {
      const initialState = client.extract();
      const styleTags = sheet.getStyleTags();
      
      resolve(`
        <!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>booksy</title>
            <link rel="stylesheet" href="https://unpkg.com/modern-normalize@0.4.0/modern-normalize.css">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            <link href="https://fonts.googleapis.com/css?family=Pacifico|Open+Sans:300,400,700" rel="stylesheet">
            <!--<link rel="stylesheet" href="modern-normalize.css"/>-->
            ${styleTags}
          </head>
          <body>
            <div id="root">${content}</div>
            <script>
              window.__APOLLO_STATE__ = ${serialize(initialState)}
            </script>
            <script src="vendor.js"></script>            
            <script src="main.js"></script>
          </body>
        </html>
      `);
    }).catch(error => reject(error))
  });
}
