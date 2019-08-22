module.exports = {
  entry: {
    daytour: './src/index.js'
  },
  output: {
    filename: '[name]-booking.js',
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