var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'dist/bookingform.js',
    sourceMapFilename: '/dist/bookingform-bundle.map'
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: '/(node_modules)/',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  } 
}