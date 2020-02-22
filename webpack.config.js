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
  devServer: {
    inline: true,
    contentBase: "./dist",
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
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