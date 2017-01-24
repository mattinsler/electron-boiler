const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    path.join(__dirname, 'client', 'bootstrap')
  ],
  output: {
    path: path.join(__dirname, 'build', 'client'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.s?css$/, loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'] },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.(svg|png|jpg|gif)$/, loader: 'url-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    electron: "require('electron')"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
