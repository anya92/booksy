const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  entry: {
    main: './src/client/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[chunkhash].js'
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
    new CleanWebpackPlugin(['public']),
    new ReactLoadablePlugin({
      filename: './public/react-loadable.json',
    }),
    new ManifestPlugin(),
  ],
};

module.exports = merge(baseConfig, config);
