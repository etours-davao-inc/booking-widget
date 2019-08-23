module.exports = {
  entry: {
    bookingForm: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    library: "bookingForm",
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};