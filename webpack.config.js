module.exports = {
  entry: {
    pricewidget: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    library: "pricewidget",
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  devtool: 'source-map',
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