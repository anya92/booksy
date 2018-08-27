const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const dotenv = require('dotenv');
const baseConfig = require('./webpack.base');
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

// console.log(dotenv.config(), process.env);

// const env = dotenv.config({ path: 'variables.env' }).parsed;

// const envKeys = Object.keys(env).reduce((prev, next) => {
//   prev[`process.env.${next}`] = JSON.stringify(env[next]);
//   return prev;
// }, {});

const config = {
  entry: {
    main: './src/client/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  plugins: [
    new ReactLoadablePlugin({
      filename: './public/react-loadable.json',
    }),
  ],
  // plugins: [
  //   new webpack.DefinePlugin(envKeys)
  // ]
};

module.exports = merge(baseConfig, config);
